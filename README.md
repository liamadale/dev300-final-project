# The Entry-Level Cybersecurity Paradox

DEV300 final project at Bellevue College by Liam Dale and Michelle Stonecastle. The site is built
with [Quarto](https://quarto.org) and published to GitHub Pages.

## Where things go

| File | Page |
|---|---|
| `index.qmd` | Home |
| `paper.qmd` | Written section (fishbone, 5 Whys, decision matrix, bias check) |
| `slides.qmd` | Presentation (reveal.js; `##` starts a slide, `::: notes` holds speaker notes) |
| `video.qmd` | Recorded section (embed an unlisted YouTube link; don't commit video files) |
| `pathways.qmd` | Practical pathways list for classmates |
| `sources.qmd` | Every entry in `references.bib` |
| `references.bib` | All sources. Cite with `[@key]` on any page. |

## Editing

- **In the browser:** edit any `.qmd` file on GitHub and commit. The site rebuilds when changes land on `main`.
- **Locally:** install Quarto, then run `quarto preview` for a live preview or `quarto render` to build into `_site/`.

## Publishing (one-time setup)

In the repo on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**. After that, every push to `main` runs `.github/workflows/publish.yml` and deploys.
