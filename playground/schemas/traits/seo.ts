import { z } from 'zod'
import { defineContentTrait } from '../../../src/runtime/utils'

export const seoTrait = defineContentTrait({
  name: 'seo',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})
