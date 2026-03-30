import { defineContentConfig, defineCollection } from '@nuxt/content'
import { articleCollection } from './schemas/collections/article'

export default defineContentConfig({
  collections: {
    article: defineCollection(articleCollection),
  },
})
