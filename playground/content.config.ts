import { defineContentConfig } from '@nuxt/content'
import { defineCollection } from 'nuxt-content-traits/utils'
import { datesTrait } from './schemas/traits/dates'
import { seoTrait } from './schemas/traits/seo'

export default defineContentConfig({
  collections: {
    article: defineCollection({
      type: 'page',
      source: 'zod/**',
      traits: [datesTrait, seoTrait],
    }),
  },
})
