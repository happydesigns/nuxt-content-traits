import { defineCollection as _defineCollection, defineContentConfig as _defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

/**
 * A nameless trait definition for use inside the `defineContentConfig` traits registry.
 * The trait name is derived from its key in the registry object.
 * @template T - The schema type (expected to be a Zod object schema)
 */
export interface TraitDefinition<T = unknown> {
  schema: T
}

/**
 * A reusable content trait with a Zod schema.
 * @template T - The schema type (expected to be a Zod object schema)
 */
export interface ContentTrait<T = unknown> {
  name: string
  schema: T
}

/**
 * Creates a nameless trait definition for use in the `defineContentConfig` traits registry.
 * The registry key becomes the trait name.
 * @template S - The Zod object schema shape
 * @param definition - The trait schema
 */
export function defineTrait<S extends z.ZodObject<z.ZodRawShape>>(
  definition: TraitDefinition<S>,
): TraitDefinition<S> {
  return definition
}

type BaseCollectionConfig = Parameters<typeof _defineCollection>[0]
type BaseContentConfig = Parameters<typeof _defineContentConfig>[0]

type ContentCollectionInput = Omit<BaseCollectionConfig, 'schema'> & {
  schema?: z.ZodObject<z.ZodRawShape>
  traits?: string[]
}

/**
 * A wrapper around Nuxt Content's native `defineContentConfig` that adds a top-level
 * traits registry. Collections can reference traits by their registry key (string).
 * Internally calls `_defineCollection` for each entry.
 * @param config - Content config with an optional trait registry and collections map
 */
export function defineContentConfig(
  config: Omit<BaseContentConfig, 'collections'> & {
    traits?: Record<string, TraitDefinition<z.ZodObject<z.ZodRawShape>>>
    collections?: Record<string, ContentCollectionInput>
  },
): ReturnType<typeof _defineContentConfig> {
  const { traits: traitRegistry = {}, collections: rawCollections = {}, ...rest } = config

  const namedTraits: Record<string, ContentTrait<z.ZodObject<z.ZodRawShape>>> = Object.fromEntries(
    Object.entries(traitRegistry).map(([key, def]) => [key, { name: key, ...def }]),
  )

  const processedCollections: Record<string, ReturnType<typeof _defineCollection>> = {}

  for (const [colName, colConfig] of Object.entries(rawCollections)) {
    const { schema: baseSchema, traits: traitRefs = [], ...colRest } = colConfig

    const activeTraits: string[] = []
    let mergedSchema = (baseSchema ?? z.object({})) as z.ZodObject<z.ZodRawShape>

    for (const ref of traitRefs) {
      const trait = namedTraits[ref]
      if (!trait) throw new Error(`[nuxt-content-traits] Unknown trait: "${ref}". Available: ${Object.keys(namedTraits).join(', ')}`)

      activeTraits.push(trait.name)
      mergedSchema = mergedSchema.merge(trait.schema)
    }

    const traitsMetadata = { active: activeTraits, config: {} }

    const finalSchema = mergedSchema.extend({
      meta: z.looseObject({
        traits: z.object({
          active: z.array(z.string()),
          config: z.record(z.string(), z.unknown()),
        }).default(traitsMetadata),
      }).default({ traits: traitsMetadata }),
    })

    processedCollections[colName] = _defineCollection({ ...colRest, schema: finalSchema })
  }

  return _defineContentConfig({ ...rest, collections: processedCollections } as BaseContentConfig)
}
