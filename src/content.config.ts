import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const webUrl = z.string().url().refine((value) => value.startsWith("https://"), {
  message: "Use an https:// URL.",
});

const partialIsoDate = z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/, {
  message: "Use YYYY, YYYY-MM, or YYYY-MM-DD.",
});

const todoList = z.array(z.string().startsWith("TODO:"));

const publications = defineCollection({
  loader: glob({ base: "./src/content/publications", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    year: z.number().int().min(1900).max(2100),
    month: z.string().min(1).nullable(),
    venue: z.string().min(1),
    doi: z.string().regex(/^10\.\d{4,9}\/.+$/).nullable(),
    pdfUrl: webUrl.nullable(),
    externalUrl: webUrl.nullable(),
    projectAssociations: z.array(reference("projects")),
    researchThemes: z.array(z.string().min(1)),
    featured: z.boolean(),
    award: z.string().min(1).nullable(),
    displayOrder: z.number().int().nonnegative(),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

const people = defineCollection({
  loader: glob({ base: "./src/content/people", pattern: "**/*.json" }),
  schema: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    studentStatus: z.enum(["not-applicable", "current", "alumni"]),
    startYear: z.number().int().min(1900).max(2100).nullable(),
    cohortYear: z.number().int().min(1900).max(2100).nullable(),
    researchInterests: z.array(z.string().min(1)),
    photo: z.string().min(1).nullable(),
    personalWebsite: webUrl.nullable(),
    alumniDestination: z.string().min(1).nullable(),
    initials: z.string().min(1).max(4),
    displayOrder: z.number().int().nonnegative(),
    featured: z.boolean(),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

const fundingSchema = z.object({
  funder: z.string().min(1),
  program: z.string().min(1).nullable(),
  awardNumber: z.string().min(1).nullable(),
  amountUsd: z.number().nonnegative().nullable(),
  sourceUrl: webUrl.nullable(),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    researchThemes: z.array(z.string().min(1)).min(1),
    relatedPublications: z.array(reference("publications")),
    people: z.array(reference("people")),
    funding: fundingSchema.nullable(),
    status: z.enum(["planned", "current", "completed", "on-hold"]),
    label: z.string().min(1),
    displayNumber: z.string().regex(/^\d{2}$/),
    displayOrder: z.number().int().nonnegative(),
    featured: z.boolean(),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

const sourceSchema = z.object({
  label: z.string().min(1),
  url: webUrl,
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.json" }),
  schema: z.object({
    date: partialIsoDate,
    displayDate: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    sourceUrl: webUrl.nullable(),
    sourceLabel: z.string().min(1).nullable(),
    additionalSources: z.array(sourceSchema),
    category: z.enum([
      "acceptance",
      "grant",
      "milestone",
      "publication",
      "recognition",
      "report",
      "research",
      "talk",
    ]),
    details: z.array(z.string().min(1)),
    featured: z.boolean(),
    displayOrder: z.number().int().nonnegative(),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

const siteSettings = defineCollection({
  loader: glob({ base: "./src/content/site-settings", pattern: "**/*.json" }),
  schema: z.object({
    labName: z.string().min(1),
    description: z.string().min(1),
    institutionalAffiliation: z.object({
      institution: z.string().min(1),
      shortName: z.string().min(1),
      college: z.string().min(1),
      address: z.string().min(1),
    }),
    contactInformation: z.object({
      generalEmail: z.string().email().nullable(),
      directors: z.array(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
        }),
      ),
      joinPage: z.string().startsWith("/"),
    }),
    lastSubstantiveContentUpdate: z.string().date(),
    lastSubstantiveContentUpdateDisplay: z.string().min(1),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

const researchAreas = defineCollection({
  loader: glob({ base: "./src/content/research-areas", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    topics: z.string().min(1),
    menuTitle: z.string().min(1),
    menuSummary: z.string().min(1),
    marker: z.enum(["filled", "outline", "combination"]),
    displayNumber: z.string().regex(/^\d{2}$/),
    displayOrder: z.number().int().nonnegative(),
    visibility: z.enum(["draft", "public"]),
  }),
});

const joinPaths = defineCollection({
  loader: glob({ base: "./src/content/join-paths", pattern: "**/*.json" }),
  schema: z.object({
    label: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    steps: z.array(z.string().min(1)).min(1),
    note: z.string().min(1).nullable(),
    displayOrder: z.number().int().nonnegative(),
    visibility: z.enum(["draft", "public"]),
    todos: todoList.optional(),
  }),
});

export const collections = {
  publications,
  people,
  projects,
  news,
  siteSettings,
  researchAreas,
  joinPaths,
};
