import * as v from 'valibot'
import { defineTraitCollection } from '../../../src/runtime/utils'
import { datesTrait } from '../traits/valibot/dates'
import { seoTrait } from '../traits/valibot/seo'

export const articleTraits = defineTraitCollection(
  [datesTrait, seoTrait] as const,
  {
    customSchema: v.object({
      ...datesTrait.schema.entries,
      ...seoTrait.schema.entries,
    }),
    schemaWrapper: (schema, traitsSchema) => {
      const vSchema = schema as any
      return v.object({
        ...vSchema.entries,
        _traits: v.object({
          active: v.array(v.string()),
          config: v.any(),
        }),
      })
    },
    config: {
      ui: {
        showCalendarIcon: false,
      },
    },
  },
)
