import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live in en/ and es/; a translation shares its file name. `_`-prefixed files are unpublished drafts.
const blog = defineCollection({
  loader: glob({ pattern: '{en,es}/**/[^_]*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    banner: z.string().optional(),
  }),
});

export const collections = { blog };
