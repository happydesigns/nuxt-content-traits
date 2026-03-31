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
    schemaWrapper: (schema, _traitsSchema, traitsMetadata) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vSchema = schema as v.ObjectSchema<any, any>
      return v.object({
        ...vSchema.entries,
        // Inject _traits with default values using v.optional for Valibot
        _traits: v.optional(
          v.object({
            active: v.array(v.string()),
            config: v.unknown(),
          }),
          traitsMetadata,
        ),
      })
    },
    config: {
      ui: {
        showCalendarIcon: false,
      },
    },
  },
)
