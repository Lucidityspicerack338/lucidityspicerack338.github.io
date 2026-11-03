# Content guide

The website stores editable records in `src/content/`. Each publication, person, project, and news item has its own JSON file. Page layouts read those records automatically, so routine content updates should not require editing `.astro` files.

## Before adding anything

Use only information approved by the lab or confirmed by an authoritative source. Never guess a biography, acceptance, award, funding detail, project result, student status, or recruitment status. Use `null` or an empty list when a field is not verified, and record the open question in `OPEN_ITEMS.md` in the lab's private `website-notes` repository. This repository is public, so internal notes do not belong in the content files.

Keep `visibility` set to `draft` while a record is being checked. Draft records are validated but not displayed. Change it to `public` only after the lab approves the information.

Choose a short lowercase filename with hyphens, such as `new-paper-title.json`. That filename becomes the permanent record ID used when projects and publications refer to one another.

## Add a publication

1. Copy an existing file in `src/content/publications/`.
2. Give the copy a unique descriptive filename.
3. Replace the title, complete author list, year, venue, DOI, and other verified fields.
4. Put each author in a separate quoted item. Write a DOI as `10.xxxx/...`, not as a web address.
5. Use `null` for an unknown DOI or PDF URL and note it in the private `OPEN_ITEMS.md`.
6. Increase `displayOrder` to place the paper after existing records.
7. Set `featured` to `true` only after approval to show the paper on the homepage. This is separate from `visibility`, which controls whether it appears anywhere.

## Add a student or other person

1. Copy an existing file in `src/content/people/`.
2. Enter the approved name, role, and student status.
3. `startYear` means the year the person joined the lab. Do not substitute a degree cohort year; use `cohortYear` for that.
4. Leave the photo, website, interests, or alumni destination empty until the person approves them. Never use a generated or stand-in portrait.
5. Increase `displayOrder` to place the person after existing records.

## Add a project

1. Copy a file in `src/content/projects/`.
2. Keep the description factual and approved. List research themes as separate quoted items.
3. In `relatedPublications` and `people`, use the filenames of existing records without `.json`.
4. Add funding only when the funder and details are verified. Use `null` for missing information and note it in the private `OPEN_ITEMS.md`.
5. Use one of the existing status values: `planned`, `current`, `completed`, or `on-hold`.

## Add a news item

1. Copy a file in `src/content/news/` and start its filename with the date.
2. Use `YYYY`, `YYYY-MM`, or `YYYY-MM-DD` for `date`; use `displayDate` for the human-readable version.
3. Add an approved source URL whenever one exists. If it does not, use `null` and note it in the private `OPEN_ITEMS.md`.
4. Choose one of the category values already used in the collection.
5. Set `featured` to `true` only when the item should appear on the homepage.

## Check the update

From the project folder, run:

```sh
pnpm build
```

The build validates every record and reports the filename and field when something is missing or formatted incorrectly. Do not publish or push the update without explicit approval.
