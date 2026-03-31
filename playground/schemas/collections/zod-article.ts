import { defineTraitCollection } from '../../../src/runtime/utils'
import { datesTrait } from '../traits/zod/dates'
import { seoTrait } from '../traits/zod/seo'

export const articleTraits = defineTraitCollection(
  [datesTrait, seoTrait] as const,
  {
    config: {
      ui: {
        showCalendarIcon: false,
      },
    },
  },
)
