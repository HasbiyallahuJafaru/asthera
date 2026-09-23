# Photography provenance

| File | Source | Rights status |
|---|---|---|
| `fauziyya-portrait.jpg` | Daily Trust, "Meet Nigeria's Budding Astronaut" (`dailytrust.com/wp-content/uploads/2025/12/Fauziya-Muhammad-Auwal.jpg`) | **Unconfirmed.** A studio headshot in Titans Space flight suit, almost certainly supplied to the outlet by Fauziyya, so the client likely holds it. Confirm before launch and replace with the original file if available, which will also be higher resolution. |
| `press-headshot-1.jpg` | Same file as above | Same. |
| `video-daybreak.jpg` | Still from the TrustTV interview it posters (`IbRS5zhoNu0`) | Poster frame for a video we link rather than rehost. Served locally so no request reaches YouTube until the visitor presses play. |
| `video-papshow.jpg` | Frame from the PAPShow short it posters (`vZ9n6T7bnKk`), `i.ytimg.com/vi/vZ9n6T7bnKk/oardefault.jpg`, 1080x1920 | Same basis as above. Carries the channel's own PAP bug in the corner, which is the attribution. |

| `video-papshow-interview.jpg` | Thumbnail of the full PAPShow interview (`zA9b3mfNlSw`), 1280x720 | Same session as the short above. Carries the channel's own title card reading "Nigeria's first astronaut candidate, Fauziyya Muhammad Auwal". |
| `video-boomer.jpg` | Thumbnail of The Booming Boomer episode (`53IDwWM2JO8`), 1280x720 | Split frame showing the host alongside Fauziyya. |
| `video-drtv.jpg` | Thumbnail of the DRTV Nigeria interview (`wXNCsSbYwBU`), 1280x720 | Split frame showing the interviewer alongside Fauziyya. |

Video posters are the video's own thumbnail, used to link to that video on the
channel that published it. Nothing is rehosted: the poster is served locally only
so no request reaches YouTube until the visitor presses play.

Two of these, `video-boomer.jpg` and `video-drtv.jpg`, are split frames that show
the interviewer as prominently as Fauziyya, and `video-papshow-interview.jpg`
carries a channel title card. They are the thumbnails those channels published.
If the client would rather the landing page carried only frames of Fauziyya, each
can be replaced with a still pulled from the video itself, with no code change.

Every video ID here was confirmed against the YouTube oEmbed endpoint before it
was added, which is the check `lib/site.ts` records for this list.

## Founder portrait

- `fauziyya-founder-hero.jpg`: studio portrait of Fauziyya Auwal Muhammad, supplied by the client
  (`fauziyya.png`), re-encoded as JPEG. Used on /founder.
- `fauziyya-working.jpg`: Fauziyya in conversation, supplied by the client (`fauzziyya.png`),
  stretched 15% horizontally at the client's request and re-encoded as JPEG. Used in the home page
  founder section.

## Planet textures (`public/textures/planets/`)

- `2k_mercury.jpg`, `2k_mars.jpg`: Solar System Scope (solarsystemscope.com/textures), built from
  NASA mission imagery (MESSENGER for Mercury, Viking/MGS for Mars). Licence CC BY 4.0: credit
  "Textures: Solar System Scope" somewhere on the site (credits or colophon).

## Rejected

- Legit.ng article image (`cdn.legit.ng/images/1120/02c16f0bc3201d9c.jpeg`) is a composite: the
  same portrait, Legit.ng's own green branding, and a stock NASA spacewalk photograph of a
  different astronaut. Using it would imply Fauziyya has performed an EVA. Not used.

## Still needed from the client

Nothing on this site should show other people's outreach sessions presented as ASTHERA's work,
so these slots stay empty until the client supplies real photography:

- `education-session` - students at an ASTHERA workshop or observation night
- `about-fieldwork` - the team at work: imagery on screen, fieldwork, or a session
- `work-space-intelligence`
- `work-flood-climate-intelligence`
- `work-agricultural-intelligence`
- `work-environmental-intelligence`
- `work-stem-space-education`
- `work-youth-innovation`
- `press-headshot-2`
