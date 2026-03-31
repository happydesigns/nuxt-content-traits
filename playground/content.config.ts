import { defineContentConfig, defineCollection } from '@nuxt/content'
import { articleTraits } from './schemas/collections/article'

export default defineContentConfig({
  collections: {
    article: defineCollection({
      type: 'page',
      source: 'articles/**',
      ...articleTraits,
    }),
  },
})
