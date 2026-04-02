import { z } from 'zod'
import type { SchemaAdapter, TraitsMeta } from './types'

type ZodObj = z.ZodObject<z.ZodRawShape>

export const zodAdapter: SchemaAdapter<ZodObj> = {
  emptyObject() {
    return z.object({})
  },

  merge(base, extra) {
    return base.merge(extra)
  },

  extendWithTraitsMeta(schema, metadata: TraitsMeta) {
    return schema.extend({
      meta: z.looseObject({
        traits: z.object({
          active: z.array(z.string()),
          config: z.record(z.string(), z.unknown()),
        }).default(metadata),
      }).default({ traits: metadata }),
    })
  },
}
