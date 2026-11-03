import { getCollection } from "astro:content";

export async function getSiteSettings() {
  const entries = (await getCollection("siteSettings")).filter(
    (entry) => entry.data.visibility === "public",
  );

  if (entries.length !== 1) {
    throw new Error(`Expected exactly one site settings record, found ${entries.length}.`);
  }

  return entries[0].data;
}

export async function getPublications() {
  const entries = await getCollection("publications");

  const identifiers = new Map<string, string>();
  for (const entry of entries) {
    const key = entry.data.doi
      ? `doi:${entry.data.doi.toLowerCase()}`
      : `title:${entry.data.title.toLowerCase()}|year:${entry.data.year}`;
    const existing = identifiers.get(key);

    if (existing) {
      throw new Error(`Duplicate publication records: ${existing} and ${entry.id}.`);
    }

    identifiers.set(key, entry.id);
  }

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPeople() {
  const entries = await getCollection("people");

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjects() {
  const entries = await getCollection("projects");

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getNewsItems() {
  const entries = await getCollection("news");

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getResearchAreas() {
  const entries = await getCollection("researchAreas");

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getJoinPaths() {
  const entries = await getCollection("joinPaths");

  return entries
    .filter((entry) => entry.data.visibility === "public")
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function formatAuthors(authors: string[]) {
  if (authors.length <= 1) return authors[0] ?? "";
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  return `${authors.slice(0, -1).join(", ")}, and ${authors.at(-1)}`;
}

export function getPublicationUrl(publication: {
  doi: string | null;
  externalUrl: string | null;
  pdfUrl: string | null;
}) {
  if (publication.doi) return `https://doi.org/${publication.doi}`;
  return publication.externalUrl ?? publication.pdfUrl;
}

export function getNewsSourceLinks(item: {
  sourceUrl: string | null;
  sourceLabel: string | null;
  additionalSources: Array<{ label: string; url: string }>;
}) {
  const primary = item.sourceUrl
    ? [{ label: item.sourceLabel ?? "Source", url: item.sourceUrl }]
    : [];

  return [...primary, ...item.additionalSources];
}
