import * as v from 'valibot'
import type { SchemaAdapter, TraitsMeta } from './types'

type ValibotObj = v.ObjectSchema<v.ObjectEntries, undefined>

export const valibotAdapter: SchemaAdapter<ValibotObj> = {
  emptyObject() {
    return v.object({})
  },

  merge(base, extra) {
    return v.object({ ...base.entries, ...extra.entries })
  },

  extendWithTraitsMeta(schema, metadata: TraitsMeta) {
    return v.object({
      ...schema.entries,
      meta: v.optional(
        v.looseObject({
          traits: v.optional(
            v.object({
              active: v.array(v.string()),
              config: v.record(v.string(), v.unknown()),
            }),
            metadata,
          ),
        }),
        { traits: metadata },
      ),
    })
  },
}
