import { z } from 'zod'
import { defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'

export default defineContentConfig({
  traits: {
    dates: defineTrait({
      schema: z.object({
        date: z.string(),
        dateEnd: z.string().optional(),
      }),
    }),
    seo: defineTrait({
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  },
  collections: {
    article: {
      type: 'page',
      source: 'zod/**',
      traits: ['dates', 'seo'],
    },
  },
})
