import { z } from 'zod'
import { defineContentTrait } from '../../../../src/runtime/utils'

export const datesTrait = defineContentTrait({
  name: 'dates',
  schema: z.object({
    date: z.string(),
    dateEnd: z.string().optional(),
  }),
  config: {
    ui: {
      showCalendarIcon: true,
    },
  },
})
