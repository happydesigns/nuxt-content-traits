import { defineCollection as _defineCollection, defineContentConfig as _defineContentConfig } from '@nuxt/content'
import type { z } from 'zod'
import type * as v from 'valibot'
import { zodAdapter } from './adapters/zod'
import { detectAdapter } from './adapters/detect'
import type { AnyObjectSchema } from './adapters/types'

/**
 * A nameless trait definition for use inside the `defineContentConfig` traits registry.
 * The trait name is derived from its key in the registry object.
 * @template T - The schema type (a Zod or Valibot object schema)
 */
export interface TraitDefinition<T = unknown> {
  readonly schema: T
}

/**
 * A reusable content trait with a schema.
 * @template T - The schema type (a Zod or Valibot object schema)
 */
export interface ContentTrait<T = unknown> {
  name: string
  readonly schema: T
}

/**
 * Creates a nameless trait definition for use in the `defineContentConfig` traits registry.
 * The registry key becomes the trait name. Supports Zod v4 and Valibot schemas.
 * @param definition - The trait schema
 */
export function defineTrait<S extends z.ZodObject<z.ZodRawShape>>(
  definition: TraitDefinition<S>,
): TraitDefinition<S>
export function defineTrait<S extends v.ObjectSchema<v.ObjectEntries, undefined>>(
  definition: TraitDefinition<S>,
): TraitDefinition<S>
export function defineTrait<S extends AnyObjectSchema>(
  definition: TraitDefinition<S>,
): TraitDefinition<S> {
  return definition
}

type BaseCollectionConfig = Parameters<typeof _defineCollection>[0]
type BaseContentConfig = Parameters<typeof _defineContentConfig>[0]

type ContentCollectionInput = Omit<BaseCollectionConfig, 'schema'> & {
  schema?: AnyObjectSchema
  traits?: string[]
}

/**
 * A wrapper around Nuxt Content's native `defineContentConfig` that adds a top-level
 * traits registry. Collections can reference traits by their registry key (string).
 * Supports Zod v4 and Valibot schemas. All traits within a collection must use the same validator.
 * @param config - Content config with an optional trait registry and collections map
 */
export function defineContentConfig(
  config: Omit<BaseContentConfig, 'collections'> & {
    traits?: Record<string, TraitDefinition<AnyObjectSchema>>
    collections?: Record<string, ContentCollectionInput>
  },
): ReturnType<typeof _defineContentConfig> {
  const { traits: traitRegistry = {}, collections: rawCollections = {}, ...rest } = config

  const namedTraits: Record<string, ContentTrait<AnyObjectSchema>> = Object.fromEntries(
    Object.entries(traitRegistry).map(([key, def]) => [key, { name: key, ...def }]),
  )

  const processedCollections: Record<string, ReturnType<typeof _defineCollection>> = {}

  for (const [colName, colConfig] of Object.entries(rawCollections)) {
    const { schema: baseSchema, traits: traitRefs = [], ...colRest } = colConfig

    // Determine the adapter from the first available schema
    const firstRef = traitRefs[0]
    const firstTraitSchema = firstRef !== undefined ? namedTraits[firstRef]?.schema : undefined
    const referenceSchema = firstTraitSchema ?? baseSchema
    const adapter = referenceSchema ? detectAdapter(referenceSchema) : zodAdapter

    const activeTraits: string[] = []
    let mergedSchema = adapter.emptyObject()

    if (baseSchema) {
      if (detectAdapter(baseSchema) !== adapter) {
        throw new Error(
          `[nuxt-content-traits] Mixed validators in collection "${colName}": `
          + `the collection's own schema uses a different validator than its traits.`,
        )
      }
      mergedSchema = adapter.merge(mergedSchema, baseSchema)
    }

    for (const ref of traitRefs) {
      const trait = namedTraits[ref]
      if (!trait) throw new Error(`[nuxt-content-traits] Unknown trait: "${ref}". Available: ${Object.keys(namedTraits).join(', ')}`)

      if (detectAdapter(trait.schema) !== adapter) {
        throw new Error(
          `[nuxt-content-traits] Mixed validators in collection "${colName}": `
          + `all traits must use the same schema validator.`,
        )
      }

      activeTraits.push(trait.name)
      mergedSchema = adapter.merge(mergedSchema, trait.schema)
    }

    const finalSchema = adapter.extendWithTraitsMeta(mergedSchema, {
      active: activeTraits,
      config: {},
    })

    processedCollections[colName] = _defineCollection({ ...colRest, schema: finalSchema } as Parameters<typeof _defineCollection>[0])
  }

  return _defineContentConfig({ ...rest, collections: processedCollections } as BaseContentConfig)
}

export type { AnyObjectSchema, SchemaAdapter, TraitsMeta } from './adapters/types'
export { zodAdapter, valibotAdapter, detectAdapter } from './adapters/index'
