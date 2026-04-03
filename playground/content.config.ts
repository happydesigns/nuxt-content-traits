import { z } from 'zod'
import * as v from 'valibot'
import { defineCollection, defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'

export default defineContentConfig({
  traits: {
    zodSeo: defineTrait({
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
    zodDates: defineTrait({
      schema: z.object({
        date: z.string(),
        dateEnd: z.string().optional(),
      }),
    }),
    valibotSeo: defineTrait({
      schema: v.object({
        title: v.optional(v.string()),
        description: v.optional(v.string()),
      }),
    }),
    valibotDates: defineTrait({
      schema: v.object({
        date: v.string(),
        dateEnd: v.optional(v.string()),
      }),
    }),
  },
  collections: {
    zodArticle: defineCollection({
      type: 'page',
      source: 'zod/**',
      traits: ['zodDates', 'zodSeo'],
    }),
    valibotArticle: defineCollection({
      type: 'page',
      source: 'valibot/**',
      traits: ['valibotDates', 'valibotSeo'],
    }),
  },
})
