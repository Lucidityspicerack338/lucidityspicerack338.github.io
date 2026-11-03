# Health and Play Lab website guidelines

These instructions apply to the entire repository. The current Astro migration and the approved editorial V10 prototype are the design baseline. `CODEX_HANDOFF.md` and the V10 prototype are reference material; the lab's current, explicit request takes priority when requirements change.

## Design baseline

- Preserve the existing light editorial design: ivory/off-white backgrounds, dark charcoal text, teal accents, restrained muted coral, generous spacing, and legible typography.
- Preserve the original Health and Play Lab logo as supplied. Do not redraw, reinterpret, recolor, or replace it.
- Keep the approved homepage emphasis: **Health** is solid teal and **play** is teal outlined. Both must remain readable HTML text.
- Do not redesign the site or introduce a new visual system without explicit approval.
- Use ordinary academic language for navigation, headings, research descriptions, and other substantive content. Retro-game language belongs only in the approved interactions and decorative labels.
- Keep layouts responsive and usable on desktop and mobile. Avoid motion-heavy effects and respect `prefers-reduced-motion`.

## Required interactions and pages

- Preserve the homepage `PRESS START` research interaction.
- Preserve the `GAME OVER` 404 page and its accessible recovery links.
- Preserve the accessible `New Player Guide` interface on the Join Us page.
- Preserve the Konami Code Easter egg as a subtle, optional enhancement.
- Keep all core information available without discovering an Easter egg or relying on animation, hover, or audio.

## Academic and editorial integrity

- Never invent, infer, or embellish publications, authors, dates, DOIs, venues, awards, funding, academic achievements, project results, student profiles, alumni destinations, recruitment information, or lab news.
- Treat acceptance status, awards, funding, affiliations, student status, biographies, and recruitment statements as requiring explicit verification and human review.
- Use user-supplied or authoritative sources and favor persistent publication links such as DOI and publisher records. Record uncertainty for review instead of guessing.
- Do not use AI-generated illustrations or placeholder images that pretend to show real people, studies, projects, prototypes, field sites, or research results.
- Use real photographs only when the lab has supplied or approved them and permission to publish is confirmed. Until then, use honest text-only treatments or clearly neutral decorative elements already present in V10.
- Keep the existing Penn State site available as a reference until the lab approves launch of the replacement.

## Content architecture

- Keep structured research content separate from page templates. Publications, people, research areas, projects, news, and site settings must live in typed data files or Astro content collections rather than being duplicated in page markup.
- Maintain one canonical record per publication and reuse it for the publications page, homepage selections, and project associations.
- Use reusable Astro components for repeated layout and interaction patterns.
- Separate content, presentation, and any future update automation so lab members can edit records without redesigning templates.
- A footer “Last saved” date must represent the last substantive content update, not a build or deployment timestamp.

## Verification requirements

- After every modification, run `pnpm build`. It must complete successfully, including Astro checks, before work is considered finished.
- When a user interface, stylesheet, responsive layout, navigation element, or interaction changes, also test the affected pages at desktop and mobile widths.
- For UI changes, perform accessibility checks appropriate to the change: keyboard navigation, visible focus, semantic headings and landmarks, form labels and accessible names, color contrast, reduced motion, and screen-reader-compatible state where relevant. Target WCAG 2.2 AA.
- Test interactive changes without a mouse and confirm that essential content remains available when JavaScript is unavailable or the enhancement is not triggered.
- Report any unverified content, broken link, accessibility issue, or visual difference from V10 instead of concealing it.

## Git and release safety

- Pushing to `main` publishes the site. When Xinning Gui or Yubo Kou asks for a specific content change, that counts as approval to make and publish that change. Anything beyond it, such as new pages or design changes, still needs explicit approval first (approved by Xinning Gui on November 3, 2026).
- Never create or change a remote, change GitHub Pages settings, or change the deployment workflow without explicit approval.
- This repository is public. Keep internal notes, open questions, unpublished work, and reference material in the lab's private `website-notes` repository (`OPEN_ITEMS.md`), not here.
- Do not commit unrelated files or local scratch artifacts. Review `git status` before staging and again before committing.
- Do not rewrite history or discard existing work unless the user explicitly asks for that exact operation.
- A successful local build or local commit is not approval to publish.

