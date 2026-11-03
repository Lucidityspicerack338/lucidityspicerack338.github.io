# Health and Play Lab website

Source for **https://healthandplaylab.github.io**, the website of the Health and Play Lab at Penn State's College of Information Sciences and Technology, co-directed by Xinning Gui and Yubo Kou.

The site is built with [Astro](https://astro.build) as static pages. Every push to `main` is checked, built, and published to GitHub Pages by `.github/workflows/deploy.yml`.

## Updating content

All content lives in small JSON files under `src/content/`, one file per record. Page templates read them automatically, so routine updates never require editing HTML.

| To change… | Edit |
| --- | --- |
| Publications | `src/content/publications/` |
| People and alumni | `src/content/people/` (photos in `public/images/people/`) |
| Projects | `src/content/projects/` |
| News | `src/content/news/` |
| Research areas | `src/content/research-areas/` |
| Join Us paths | `src/content/join-paths/` |
| Lab name, address, contacts, "Last saved" date | `src/content/site-settings/site.json` |

See `CONTENT_GUIDE.md` for step-by-step instructions and `AGENTS.md` for the rules every editor (human or AI) follows: never invent facts, keep the approved design, and verify every change with a build.

## Development

Requires Node.js 22 and pnpm (`corepack enable`).

```sh
pnpm install --frozen-lockfile
pnpm dev       # local preview at http://localhost:4321/
pnpm build     # content and type checks, then the production build in dist/
```

## Routes

`/` home · `/research/` · `/publications/` · `/people/` · `/news/` · `/join-us/` · `/404.html` (GAME OVER)
