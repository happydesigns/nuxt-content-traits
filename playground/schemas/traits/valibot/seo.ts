import * as v from 'valibot'
import { defineContentTrait } from '../../../../src/runtime/utils'

export const seoTrait = defineContentTrait({
  name: 'seo',
  schema: v.object({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
  }),
})
