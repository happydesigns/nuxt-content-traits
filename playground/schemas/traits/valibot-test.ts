import * as v from 'valibot'
import { defineContentTrait } from '../../../src/runtime/utils'

export const valibotTrait = defineContentTrait({
  name: 'valibotFeature',
  // Valibot 1.x style schema
  schema: v.object({
    valibotField: v.string(),
    isValibot: v.boolean(),
  }),
  config: {
    valibot: {
      enabled: true,
    },
  },
})
