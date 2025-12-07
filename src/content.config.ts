import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { articleSchema, viewSchema } from "@/lib/schema";

const articleCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) => articleSchema(image),
});

const viewCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/views" }),
  schema: viewSchema,
});

export const collections = {
  articles: articleCollection,
  views: viewCollection,
};
