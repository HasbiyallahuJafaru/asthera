# astheraspace.com

Next.js 16 site for ASTHERA, the Nigerian space-tech and astronomy initiative founded by
Fauziyya Auwal Muhammad.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

The site builds and runs with no environment variables at all. Every page falls back to
the sourced content in `lib/site.ts`, so nothing is broken before Sanity or email is
connected.

## The content rule

`content/facts.md` is the single source of truth for every factual claim on the site.
It records what was published, by whom, and where. Two rules follow from it:

1. If a claim is not in `facts.md` with a source, it does not go on the site.
2. Every superlative ("first", "Nigeria's first") renders with an inline citation link
   to the outlet that reported it. The `<Cite>` component exists for this.

Her name appears in the press three different ways. All three are declared as
`alternateName` in the Person structured data so every spelling resolves here. The
company is **Titans Space Industries**, not "Titan Space Industries".

## Assets to drop in

Files are picked up automatically by filename. Until they exist, the page shows a
labelled frame stating what is needed, so nothing looks broken.

**`public/brand/`** (already in place)
| File | Notes |
|---|---|
| `asthera-logo.png` | Supplied lockup, background keyed out so it sits on any ground. |
| `asthera-logo-white.png` | White knockout, used on the navy footer band. |
| `asthera-mark.png` | Mark only. |

Drop in `asthera-logo.svg` and `asthera-logo-white.svg` and they are preferred
automatically, with no code change. A vector lockup is worth getting from the designer:
the current files are traced from a JPEG.

**`public/media/`** (`.jpg`, `.png`, `.webp` or `.avif` all work)
| File | Where it appears | Size |
|---|---|---|
| `fauziyya-portrait` | Homepage hero. The most important image on the site. | 880 x 1100 |
| `fauziyya-working` | Homepage founder section | 1000 x 800 |
| `fauziyya-founder-hero` | Founder page header | 900 x 760 |
| `outreach-session` | About page | 800 x 1000 |
| `programme-astronomy-education` | Homepage bento, programme pages | 1200 x 700 |
| `programme-stem-outreach` | Programme pages | 1000 x 750 |
| `programme-applied-space-technology` | Programme pages | 1000 x 750 |
| `press-headshot-1` | Press page. **In place**, same file as the hero portrait. | 800 x 1000 |
| `press-headshot-2` | Press page | 800 x 1000 |

## Video

The founder page embeds the TrustTV interview *Women in Science: One-on-One with Fauziyya
Muhammed Auwal*. It is registered in `lib/site.ts` and verified through YouTube's oEmbed
endpoint.

`VideoEmbed` is click to play: it renders a locally hosted still and loads the player only
when asked, from `youtube-nocookie.com`. Nothing reaches YouTube on page load, so the
embed costs no third-party script and sets no cookies on visitors who never press play.
The interview also emits `VideoObject` structured data, making it eligible for video rich
results.

To add another: append to `videos` in `lib/site.ts`, then save its still to
`public/media/`. Get the still with
`curl -o public/media/<name>.jpg https://i.ytimg.com/vi/<id>/maxresdefault.jpg`.

## Connecting Sanity

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Put the project id in `.env.local` (see `.env.example`).
3. Add `http://localhost:3000` and `https://astheraspace.com` to the project's CORS origins.
4. Visit `/studio` and publish content.

Schemas: `post`, `programme`, `pressItem`, `milestone`, `subscriber`, `siteSettings`.
Published documents override the fallbacks in `lib/site.ts`. The Studio is `noindex` and
excluded from the sitemap.

For newsletter signups to store, add a write token as `SANITY_API_WRITE_TOKEN`. Without it
the form tells people to email instead rather than silently dropping the address.

## Connecting email

Enquiry forms use [Resend](https://resend.com). Verify the sending domain, then set
`RESEND_API_KEY` and `CONTACT_FROM_EMAIL`. Messages route by topic to the partnerships,
press or general address. Without a key the form says so and offers the direct address.

## SEO

- Metadata is built through one helper, `pageMeta()` in `lib/seo.ts`, so canonical, OG and
  Twitter tags cannot drift apart between routes.
- `Organization`, `NGO`, `WebSite` and `Person` are emitted once in the root layout as a
  single `@graph` with stable `@id` values. Pages add `BreadcrumbList`, `NewsArticle` and
  `FAQPage` on top.
- `sitemap.xml` is generated from Sanity plus the static routes. `robots.txt` blocks
  `/studio` and `/api`.
- OG images are generated at request time by `next/og`, including per post.
- The journal is syndicated at `/feed.xml`.

### Before launch

- [ ] Point `NEXT_PUBLIC_SITE_URL` at the real domain.
- [ ] Confirm the real contact addresses and replace the placeholders.
- [ ] Drop in the logo and photography.
- [ ] Verify the domain in Google Search Console and submit the sitemap.
- [ ] Run the JSON-LD through the Rich Results Test.
- [ ] Confirm founding year, reach figures and any partners before publishing them. The
      unverified list at the end of `facts.md` is deliberately not on the site.

## Design

White is the base. Sections are distinguished by pale washes drawn from the logo, by
asymmetric corner radii, and by orbit arcs, not by boxes on a grey field. Nothing is
centred by default: columns are unequal, elements sit on their own baselines, and the
hero portrait runs past the rail.

**Palette, taken from the logo** (`asthera.jpg`). Each brand colour has one job:

| Colour | Token | Role |
|---|---|---|
| Navy `#133458` | `--navy` | Structure: headings, the one deep band per page, the wordmark |
| Green `#3a7230` | `--accent` | Action: CTAs, links, active state, the accent word |
| Gold `#c0b26e` | `--gold` | Highlight: orbit arcs, small marks, and text on navy only |

Green is deepened from the logo leaf (`#67944c`) so it clears WCAG AA everywhere the
interface uses it. Gold measures 2.1:1 on white so it is **never** text on a light
ground; on the navy band it measures 5.9:1 and becomes usable. Every token pair on every
ground is verified against WCAG AA, including the 3:1 non-text minimum for control
borders.

**The orbit arc** (`components/ui/OrbitArc.tsx`) is the connective device between
sections, echoing the ring in the logo. It draws itself once on scroll and is purely
decorative: `aria-hidden`, `pointer-events-none`, and already complete under
`prefers-reduced-motion`.

**Shape:** band corners curve on one diagonal at `--radius-band`, alternating direction
down the page so no two adjacent sections share a silhouette. Cards 20px, media 16px,
every control fully rounded.

**Motion:** scroll reveal only, with direction varying by where an element sits in the
composition, so an off-centre layout resolves the way it was drawn. All of it collapses
under `prefers-reduced-motion`.

`Section` and `Rail` in `components/ui/Section.tsx` own page structure; nothing else sets
gutters or band tones. All tokens live at the top of `app/globals.css`.
