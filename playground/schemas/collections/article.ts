import { defineTraitCollection } from '../../../src/runtime/utils'
import { datesTrait } from '../traits/dates'
import { seoTrait } from '../traits/seo'

export const articleCollection = defineTraitCollection(
  {
    type: 'page',
    source: 'articles/**',
  },
  [datesTrait, seoTrait],
  {
    config: {
      ui: {
        showCalendarIcon: false,
      },
    },
  },
)
