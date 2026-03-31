import * as v from 'valibot'
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { articleTraits } from './schemas/collections/article'
import { valibotTrait } from './schemas/traits/valibot-test'
import { defineTraitCollection } from '../src/runtime/utils'

// Using the new schemaWrapper to demonstrate clean Valibot integration
const valibotAssembled = defineTraitCollection(
  [valibotTrait] as const,
  {
    customSchema: valibotTrait.schema,
    schemaWrapper: (schema) => {
      return v.object({
        ...schema.entries,
        _traits: v.object({
          active: v.array(v.string()),
          config: v.any(),
        }),
      })
    },
  },
)

export default defineContentConfig({
  collections: {
    article: defineCollection({
      type: 'page',
      source: 'articles/**',
      ...articleTraits,
    }),
    // Now using the properly assembled Valibot traits
    valibotArticle: defineCollection({
      type: 'page',
      source: 'valibot/**',
      ...valibotAssembled,
    }),
  },
})
