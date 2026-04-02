import * as v from 'valibot'
import { defineContentConfig, defineTrait } from '../../../src/runtime/utils'

export default defineContentConfig({
  traits: {
    seo: defineTrait({
      schema: v.object({
        title: v.optional(v.string()),
        description: v.optional(v.string()),
      }),
    }),
  },
  collections: {
    post: {
      type: 'page',
      source: '**',
      traits: ['seo'],
    },
  },
})
