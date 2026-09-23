"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";

/**
 * The hero backdrop: a live 3D Earth rising out of the bottom of the frame with
 * West Africa turned toward the viewer, Mercury and Mars half cropped at the
 * left and right edges, each named in the hero's display face, and a
 * starfield behind.
 *
 * The Earth is one shader: day and night textures blended across a soft
 * terminator, city lights only on the night side, a sun glint on the oceans,
 * clouds that cast their own shadow, and a scattering rim that is bright on
 * the lit limb and falls away on the dark one. Mercury and Mars wear real
 * surface maps from NASA mission data.
 *
 * Three.js is imported after hydration so it never blocks the first paint;
 * until the first frame lands the layer is a CSS deep-space gradient. Motion
 * respects prefers-reduced-motion (a single settled frame), and the loop
 * pauses when the hero is offscreen or the tab is hidden.
 */
export function EarthHero({
  className = "",
  labelClassName = "",
}: {
  className?: string;
  labelClassName?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mercuryLabelRef = useRef<HTMLSpanElement>(null);
  const marsLabelRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let disposeScene: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      // --- Textures first, self-hosted, each optional so a miss degrades to
      // colour. No GL context exists yet, so unmounting mid-download (React's
      // dev double mount, a fast navigation) has nothing to leak.
      const loader = new THREE.TextureLoader();
      const withTimeout = <T,>(promise: Promise<T>, ms: number) =>
        Promise.race([
          promise,
          new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
        ]);
      const load = (url: string, srgb = false) =>
        withTimeout(
          loader
            .loadAsync(url)
            .then((texture) => {
              if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
              return texture;
            })
            .catch(() => null),
          4000,
        );

      const textures = await Promise.all([
        load("/textures/planets/earth_atmos_2048.jpg", true),
        load("/textures/planets/earth_lights_2048.png", true),
        load("/textures/planets/earth_specular_2048.jpg"),
        load("/textures/planets/earth_clouds_1024.png"),
        load("/textures/planets/2k_mercury.jpg", true),
        load("/textures/planets/2k_mars.jpg", true),
      ]);
      const [dayMap, nightMap, specMap, cloudsMap, mercuryMap, marsMap] = textures;
      if (disposed) {
        textures.forEach((texture) => texture?.dispose());
        return;
      }

      // Ask for the context directly: when the browser refuses (no GPU, or
      // WebGL blocked after earlier context losses) this returns null quietly,
      // where the renderer constructor would log an error and throw.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      if (!context) {
        textures.forEach((texture) => texture?.dispose());
        return; // No WebGL: the hero keeps the CSS gradient.
      }
      const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true });

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      mount.appendChild(renderer.domElement);

      const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textures.forEach((texture) => {
        if (texture) texture.anisotropy = anisotropy;
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 120);
      camera.position.set(0, 0, 3.4);
      const LOOK_AT = new THREE.Vector3(0, -0.1, 0);

      if (cloudsMap) cloudsMap.wrapS = THREE.RepeatWrapping;

      // A 1x1 stand-in keeps every sampler bound when a texture misses.
      const blank = (value: number) => {
        const texture = new THREE.DataTexture(new Uint8Array([value, value, value, 255]), 1, 1);
        texture.needsUpdate = true;
        return texture;
      };
      const fallbackDay = new THREE.DataTexture(new Uint8Array([28, 58, 102, 255]), 1, 1);
      fallbackDay.colorSpace = THREE.SRGBColorSpace;
      fallbackDay.needsUpdate = true;
      const clear = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
      clear.needsUpdate = true;
      const fallbacks = [fallbackDay, blank(0), blank(0), clear];

      // --- Earth, sunk below the frame so its upper arc breaks the surface
      // like a horizon. The pivot tilts it forward so the tropics, not the
      // pole, face the camera.
      const EARTH_R = 1.5;
      const EARTH_Y = -1.85;
      const sunDir = new THREE.Vector3(-0.55, 0.62, 0.56).normalize();

      const earthPivot = new THREE.Group();
      earthPivot.position.set(0, EARTH_Y, 0);
      earthPivot.rotation.x = -0.78;
      earthPivot.rotation.z = THREE.MathUtils.degToRad(-9);
      scene.add(earthPivot);

      // Longitude 8°E (Nigeria) faces the camera at rest; the globe starts a
      // few degrees west of that and turns it into view.
      const AFRICA_FACING = -1.71;
      const earthUniforms = {
        uDay: { value: dayMap ?? fallbacks[0] },
        uNight: { value: nightMap ?? fallbacks[1] },
        uSpec: { value: specMap ?? fallbacks[2] },
        uClouds: { value: cloudsMap ?? fallbacks[3] },
        uSunDir: { value: sunDir },
        uCloudOffset: { value: 0 },
      };
      const earth = new THREE.Mesh(
        new THREE.SphereGeometry(EARTH_R, 128, 128),
        new THREE.ShaderMaterial({
          uniforms: earthUniforms,
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
              vUv = uv;
              vNormal = normalize(mat3(modelMatrix) * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vWorldPos = world.xyz;
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `,
          fragmentShader: /* glsl */ `
            uniform sampler2D uDay;
            uniform sampler2D uNight;
            uniform sampler2D uSpec;
            uniform sampler2D uClouds;
            uniform vec3 uSunDir;
            uniform float uCloudOffset;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;

            void main() {
              vec3 n = normalize(vNormal);
              vec3 v = normalize(cameraPosition - vWorldPos);
              vec3 l = normalize(uSunDir);
              float ndl = dot(n, l);
              float dayMix = smoothstep(-0.2, 0.3, ndl);

              vec3 albedo = texture2D(uDay, vUv).rgb;
              float ocean = texture2D(uSpec, vUv).r;
              vec2 cloudUv = vUv + vec2(uCloudOffset, 0.0);
              float cloud = texture2D(uClouds, cloudUv).a;
              // The same clouds, nudged toward the sun, darken the ground.
              float cloudShadow = texture2D(uClouds, cloudUv + vec2(0.0035, -0.002)).a;

              // Ground: a soft wrap so the terminator reads as dusk, not a cut.
              float diffuse = clamp((ndl + 0.08) / 1.08, 0.0, 1.0);
              vec3 ground = albedo * 1.35 * diffuse * (1.0 - cloudShadow * 0.5);

              // Ocean glint, broad and faint, then a tight core.
              vec3 h = normalize(l + v);
              float nh = max(dot(n, h), 0.0);
              float glint = (pow(nh, 18.0) * 0.12 + pow(nh, 160.0) * 0.9) * ocean * (1.0 - cloud);
              ground += vec3(1.0, 0.93, 0.8) * glint * dayMix;

              // Clouds catch the light a little warmer near the terminator.
              vec3 cloudLight = mix(vec3(1.0, 0.78, 0.6), vec3(1.0), smoothstep(0.0, 0.35, ndl));
              vec3 color = mix(ground, cloudLight * diffuse * 1.05, cloud * 0.92);

              // City lights live only on the night side, dimmed under cloud.
              vec3 city = texture2D(uNight, vUv).rgb * vec3(1.0, 0.74, 0.44);
              color += city * (1.0 - dayMix) * (1.0 - cloud * 0.85) * 1.6;

              // A warm band along the terminator, where the air scatters red.
              float dusk = smoothstep(-0.18, 0.0, ndl) * (1.0 - smoothstep(0.0, 0.22, ndl));
              color += vec3(0.9, 0.38, 0.14) * dusk * 0.09;

              // Atmosphere seen through the disc: bluer and denser at the limb,
              // bright on the day side and gone on the night side.
              float facing = max(dot(n, v), 0.0);
              float rim = pow(1.0 - facing, 2.6);
              float lit = smoothstep(-0.25, 0.5, ndl);
              color = mix(color, vec3(0.38, 0.62, 1.0) * (0.35 + lit), rim * 0.7 * lit);
              color += vec3(0.1, 0.2, 0.42) * (1.0 - facing) * 0.25 * lit;

              gl_FragColor = vec4(color, 1.0);
              #include <tonemapping_fragment>
              #include <colorspace_fragment>
            }
          `,
        }),
      );
      earth.rotation.y = AFRICA_FACING - 0.35;
      earthPivot.add(earth);

      // Outer halo: a back-facing shell whose glow hugs the limb and follows
      // the sun, so the lit edge burns and the night edge fades to nothing.
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(EARTH_R * 1.085, 96, 96),
        new THREE.ShaderMaterial({
          uniforms: { uSunDir: { value: sunDir } },
          vertexShader: /* glsl */ `
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
              vNormal = normalize(mat3(modelMatrix) * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vWorldPos = world.xyz;
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `,
          fragmentShader: /* glsl */ `
            uniform vec3 uSunDir;
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
              vec3 n = normalize(vNormal);
              vec3 v = normalize(cameraPosition - vWorldPos);
              // Outside the globe, -dot(n, v) on the far face runs from about
              // 0.38 at the Earth's limb to 0 at the shell's own edge.
              float depth = clamp(-dot(n, v) / 0.38, 0.0, 1.0);
              float glow = pow(depth, 3.2);
              float lit = smoothstep(-0.45, 0.55, dot(n, normalize(uSunDir)));
              vec3 tint = mix(vec3(0.2, 0.38, 0.95), vec3(0.5, 0.78, 1.0), lit);
              // The canvas is transparent over the CSS sky, so coverage has to
              // follow the glow; alpha 1 here would paint the shell black.
              vec3 color = tint * glow * (0.12 + lit * 1.25);
              float coverage = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0);
              gl_FragColor = vec4(color / max(coverage, 0.001), coverage);
            }
          `,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
        }),
      );
      earthPivot.add(halo);

      // --- Mercury and Mars, from real surface maps (MESSENGER and Viking
      // mosaics), lit from the centre of the frame so both turn their bright
      // face toward the Earth, as in the reference composition. The maps
      // already carry their relief, so they are lit without a bump pass.
      const rockyMaterial = (options: {
        map: ThreeNS.Texture | null;
        color: number;
        haze: number;
        hazeColor: number;
        sun: ThreeNS.Vector3;
      }) =>
        new THREE.ShaderMaterial({
          uniforms: {
            uMap: { value: options.map ?? fallbacks[1] },
            uHasMap: { value: options.map ? 1 : 0 },
            uColor: { value: new THREE.Color(options.color) },
            uHazeColor: { value: new THREE.Color(options.hazeColor) },
            uHaze: { value: options.haze },
            uSunDir: { value: options.sun.clone().normalize() },
          },
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
              vUv = uv;
              vNormal = normalize(mat3(modelMatrix) * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vWorldPos = world.xyz;
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `,
          fragmentShader: /* glsl */ `
            uniform sampler2D uMap;
            uniform float uHasMap;
            uniform vec3 uColor;
            uniform vec3 uHazeColor;
            uniform float uHaze;
            uniform vec3 uSunDir;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;

            void main() {
              vec3 albedo = mix(uColor, texture2D(uMap, vUv).rgb, uHasMap);
              vec3 n = normalize(vNormal);

              vec3 l = normalize(uSunDir);
              // Airless bodies stay bright toward the limb; soften the falloff.
              float diffuse = pow(max(dot(n, l), 0.0), 0.85);
              vec3 color = albedo * diffuse * 1.55 + albedo * 0.012;

              vec3 v = normalize(cameraPosition - vWorldPos);
              float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
              color += uHazeColor * rim * uHaze * smoothstep(-0.2, 0.6, dot(n, l));

              gl_FragColor = vec4(color, 1.0);
              #include <tonemapping_fragment>
              #include <colorspace_fragment>
            }
          `,
        });

      const PLANET_Z = -0.8;
      const mercury = new THREE.Mesh(
        new THREE.SphereGeometry(1, 96, 96),
        rockyMaterial({
          map: mercuryMap,
          color: 0x8f8a84,
          haze: 0,
          hazeColor: 0x000000,
          sun: new THREE.Vector3(1, 0.25, 0.55),
        }),
      );
      const mars = new THREE.Mesh(
        new THREE.SphereGeometry(1, 96, 96),
        rockyMaterial({
          map: marsMap,
          color: 0xb4532a,
          haze: 0.5,
          hazeColor: 0xe0875a,
          sun: new THREE.Vector3(-1, 0.25, 0.55),
        }),
      );
      mars.rotation.set(0.35, 0, -0.2);
      scene.add(mercury, mars);

      // --- Starfield: round soft points in a few sizes, a share in brand
      // gold, each twinkling on its own slow phase.
      const starCount = 2600;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const phases = new Float32Array(starCount);
      const gold = new THREE.Color(0xd6c68a);
      const white = new THREE.Color(0xf2f5fb);
      const blue = new THREE.Color(0xbcd0ff);
      for (let i = 0; i < starCount; i += 1) {
        const radius = 14 + Math.random() * 16;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi) - 6;
        const pick = Math.random();
        const base = pick < 0.12 ? gold : pick < 0.3 ? blue : white;
        colors[i * 3] = base.r;
        colors[i * 3 + 1] = base.g;
        colors[i * 3 + 2] = base.b;
        // Most stars are dust; a few are bright enough to anchor the sky.
        const roll = Math.random();
        sizes[i] = roll > 0.985 ? 3.4 + Math.random() * 1.6 : roll > 0.9 ? 2 + Math.random() : 0.9 + Math.random() * 0.8;
        phases[i] = Math.random() * Math.PI * 2;
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      starGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      starGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
      const starUniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      };
      const stars = new THREE.Points(
        starGeometry,
        new THREE.ShaderMaterial({
          uniforms: starUniforms,
          vertexShader: /* glsl */ `
            attribute float aSize;
            attribute float aPhase;
            uniform float uTime;
            uniform float uPixelRatio;
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
              vColor = color;
              float twinkle = 0.72 + 0.28 * sin(uTime * (0.6 + fract(aPhase) * 1.4) + aPhase * 7.0);
              vAlpha = twinkle * mix(0.55, 1.0, smoothstep(1.0, 3.0, aSize));
              gl_PointSize = aSize * uPixelRatio * 1.6;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
              float d = length(gl_PointCoord - 0.5) * 2.0;
              float core = smoothstep(1.0, 0.0, d);
              float alpha = pow(core, 2.4) * vAlpha;
              if (alpha < 0.01) discard;
              gl_FragColor = vec4(vColor, alpha);
            }
          `,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      scene.add(stars);

      // --- Layout: planets sit against the frustum edge for the current
      // aspect, so the half crop survives any viewport; the DOM labels are
      // placed from their projected inner edges.
      const projected = new THREE.Vector3();
      const halfWidthAt = (z: number) =>
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - z) * camera.aspect;
      const toScreen = (x: number, y: number, z: number) => {
        projected.set(x, y, z).project(camera);
        return {
          x: (projected.x * 0.5 + 0.5) * mount.clientWidth,
          y: (-projected.y * 0.5 + 0.5) * mount.clientHeight,
        };
      };
      const labels = [
        { mesh: mercury, el: mercuryLabelRef.current, side: -1 },
        { mesh: mars, el: marsLabelRef.current, side: 1 },
      ];
      const layoutPlanets = () => {
        const halfWidth = halfWidthAt(PLANET_Z);
        const wide = camera.aspect > 0.9;
        const radius = Math.min(0.52, halfWidth * 0.2);
        for (const { mesh, el, side } of labels) {
          mesh.visible = wide;
          // Mercury is 2,440 km in radius to Mars's 3,390 km: 0.72 of the size.
          mesh.scale.setScalar(side < 0 ? radius * 0.72 : radius);
          mesh.position.set(side * (halfWidth - radius * 0.02), 0.2, PLANET_Z);
          if (!el) continue;
          if (!wide) {
            el.style.opacity = "0";
            continue;
          }
          const r = mesh.scale.x;
          const edge = toScreen(mesh.position.x - side * r, mesh.position.y + radius * 0.6, PLANET_Z);
          const gap = 28;
          const x = side < 0 ? edge.x + gap : edge.x - gap;
          el.style.opacity = "";
          el.style.transform = `translate(${x}px, ${edge.y}px) translate(${side < 0 ? "0" : "-100%"}, -50%)`;
        }
      };

      // --- Sizing.
      const setSize = () => {
        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        camera.position.set(0, 0, 3.4);
        camera.lookAt(LOOK_AT);
        layoutPlanets();
      };
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const resizeObserver = new ResizeObserver(() => {
        setSize();
        if (reducedMotion || !running) renderer.render(scene, camera);
      });
      resizeObserver.observe(mount);

      // --- Motion. The Earth rises into place once on arrival; after that the
      // globe turns, the clouds drift slightly faster, and the camera answers
      // the pointer with a small parallax.
      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = mount.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      };

      const RISE = 0.42;
      const RISE_SECONDS = 2.6;
      const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
      let elapsed = 0;
      let raf = 0;
      let running = false;

      const clock = new THREE.Clock();
      const tick = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        elapsed += dt;
        const rise = easeOutExpo(elapsed / RISE_SECONDS);
        earthPivot.position.y = EARTH_Y - RISE * (1 - rise);
        earth.rotation.y += dt * 0.012;
        earthUniforms.uCloudOffset.value = (earthUniforms.uCloudOffset.value + dt * 0.0012) % 1;
        mercury.rotation.y += dt * 0.01;
        mars.rotation.y -= dt * 0.014;
        starUniforms.uTime.value = elapsed;

        camera.position.x += (pointer.x * 0.08 - camera.position.x) * 0.035;
        camera.position.y += (-pointer.y * 0.05 - camera.position.y) * 0.035;
        camera.lookAt(LOOK_AT);
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(tick);
      };
      const start = () => {
        if (running || reducedMotion || contextLost) return;
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      // If the GPU drops the context mid-visit, stop drawing and let the CSS
      // gradient show through rather than freezing on a dead canvas.
      let contextLost = false;
      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        stop();
        setReady(false);
      };
      canvas.addEventListener("webglcontextlost", onContextLost);

      setSize();
      const extraTextures = fallbacks;

      if (reducedMotion) {
        earth.rotation.y = AFRICA_FACING;
        renderer.render(scene, camera);
        disposeScene = () => {
          resizeObserver.disconnect();
          canvas.removeEventListener("webglcontextlost", onContextLost);
          teardown(scene, [...textures, ...extraTextures], renderer);
        };
        setReady(true);
        return;
      }

      earthPivot.position.y = EARTH_Y - RISE;
      if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && !document.hidden) start();
          else stop();
        },
        { threshold: 0.05 },
      );
      intersectionObserver.observe(mount);
      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };
      document.addEventListener("visibilitychange", onVisibility);

      disposeScene = () => {
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        teardown(scene, [...textures, ...extraTextures], renderer);
      };

      renderer.render(scene, camera);
      setReady(true);
      start();
    })();

    return () => {
      disposed = true;
      disposeScene?.();
    };
  }, []);

  const label = `pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap text-[clamp(0.95rem,1.35vw,1.35rem)] uppercase tracking-[0.34em] text-white/80 transition-opacity duration-1000 md:block ${labelClassName} ${
    ready ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div
      className={`bg-[radial-gradient(90%_60%_at_50%_100%,#0f2440_0%,#070e1a_55%,#04070d_100%)] ${className}`}
    >
      <div
        ref={mountRef}
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      <span ref={mercuryLabelRef} aria-hidden className={label}>
        Mercury
      </span>
      <span ref={marsLabelRef} aria-hidden className={label}>
        Mars
      </span>
    </div>
  );
}

function teardown(
  scene: ThreeNS.Scene,
  textures: (ThreeNS.Texture | null)[],
  renderer: ThreeNS.WebGLRenderer,
) {
  scene.traverse((object) => {
    const mesh = object as ThreeNS.Mesh;
    mesh.geometry?.dispose();
    const material = mesh.material as ThreeNS.Material | ThreeNS.Material[] | undefined;
    if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
    else material?.dispose();
  });
  textures.forEach((texture) => texture?.dispose());
  renderer.dispose();
  // dispose() frees three's resources but leaves the context to the garbage
  // collector; release it now so remounts never stack live contexts.
  renderer.forceContextLoss();
  renderer.domElement.remove();
}
