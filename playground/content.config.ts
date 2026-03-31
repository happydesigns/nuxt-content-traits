import { defineContentConfig, defineCollection } from '@nuxt/content'
import { articleTraits as zodArticleTraits } from './schemas/collections/zod-article'
import { articleTraits as valibotArticleTraits } from './schemas/collections/valibot-article'

export default defineContentConfig({
  collections: {
    zodArticle: defineCollection({
      type: 'page',
      source: 'zod/**',
      ...zodArticleTraits,
    }),
    valibotArticle: defineCollection({
      type: 'page',
      source: 'valibot/**',
      ...valibotArticleTraits,
    }),
  },
})
