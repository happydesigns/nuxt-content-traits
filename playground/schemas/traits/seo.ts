import { z } from 'zod'

export const seoTrait = defineContentTrait({
  name: 'seo',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})
