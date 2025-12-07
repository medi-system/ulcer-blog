import { z } from "astro:content";
import type { ImageFunction } from "astro:content";

export const articleSchema = (image: ImageFunction) =>
  z.object({
    isDraft: z.boolean().default(false),
    isMainHeadline: z.boolean().default(false),
    isSubHeadline: z.boolean().default(false),
    cover: z.string().url().or(image()),
    covert_alt: z.string().optional(),
    title: z.string().max(60, "Too long, max 60 characters"),
    description: z.string().max(160, "Too long, max 160 characters"),
    publishedTime: z.string().datetime().or(z.date()),
  });

export const viewSchema = z.object({
  title: z.string(),
  description: z.string(),
  blocks: z.array(z.any()),
});

// avatar: Image().refine(
//   (img) => {
//       const isValidWidth = img.width > 100 && img.width < 2000;
//       const isValidHeight = img.height > 100 && img.height < 2000;
//       return isValidWidth && isValidHeight;
//   },
//   "Avatar image must have width and height between 100 and 2000"
// ),
