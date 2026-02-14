import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional().nullable(),
    permalink: z.string().optional().nullable()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    order: z.number().int().optional().nullable(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { notes, projects };
