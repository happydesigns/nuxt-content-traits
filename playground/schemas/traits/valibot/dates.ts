import * as v from 'valibot'
import { defineContentTrait } from '../../../../src/runtime/utils'

export const datesTrait = defineContentTrait({
  name: 'dates',
  schema: v.object({
    date: v.string(),
    dateEnd: v.optional(v.string()),
  }),
  config: {
    ui: {
      showCalendarIcon: true,
    },
  },
})
