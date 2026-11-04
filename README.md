# The Entry-Level Cybersecurity Paradox

DEV300 final project at Bellevue College by Liam Dale and Michelle Stonecastle. The site is built
with [Astro](https://astro.build) and published to GitHub Pages at
https://liamadale.github.io/dev300-final-project/.

## Where things go

All content is Markdown. You shouldn't need to touch anything outside these files.

| File | Page |
|---|---|
| `src/pages/index.md` | Home |
| `src/pages/paper.md` | Written section (fishbone, 5 Whys, decision matrix, bias check) |
| `src/slides.md` | Presentation (reveal.js; a line with `---` starts a new slide, `Note:` starts speaker notes) |
| `src/pages/video.md` | Recorded section (embed an unlisted YouTube link; don't commit video files) |
| `src/pages/pathways.md` | Practical pathways list for classmates |
| `src/pages/sources.md` | Every source; add new keys to its `noCite` list |
| `references.bib` | All sources. Cite with `[@key]` on any page except the slides. |

### Markdown tips

- **Citations:** `[@isc2_workforce_2024]` becomes "(ISC2, 2024)" in APA style. The reference list appears wherever `[^ref]` is on the page.
- **Links between pages:** write them from the site root, e.g. `[Paper](/paper/)`.
- **Diagrams:** a ` ```mermaid ` code block is drawn as a diagram (see the fishbone in `paper.md`).
- **Placeholders:** `_[like this]_` shows in grey italics so unfinished parts are easy to spot.

## Editing

- **In the browser:** edit any Markdown file on GitHub and commit. The site rebuilds when changes land on `main`.
- **Locally:** install [Node.js](https://nodejs.org), run `npm install` once, then `npm run dev` and open http://localhost:4321/dev300-final-project/.

## Publishing (one-time setup)

In the repo on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**. After that, every push to `main` runs `.github/workflows/publish.yml` and deploys.
