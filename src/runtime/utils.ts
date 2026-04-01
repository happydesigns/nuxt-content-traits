import { defineCollection as _defineCollection } from '@nuxt/content'
import { defu } from 'defu'
import { z } from 'zod'

/**
 * A reusable content trait with a Zod schema and optional default configuration.
 * @template T - The schema type (expected to be a Zod object schema)
 */
export interface ContentTrait<T = unknown> {
  name: string
  schema: T
  config?: Record<string, unknown>
}

/**
 * Creates a strongly-typed content trait.
 * @template SchemaType
 * @param trait - The trait definition containing name, schema, and optional config defaults
 */
export function defineContentTrait<SchemaType>(
  trait: ContentTrait<SchemaType>,
): ContentTrait<SchemaType> {
  return trait
}

type BaseCollectionConfig = Parameters<typeof _defineCollection>[0]

/**
 * A wrapper around Nuxt Content's native `defineCollection` with trait composition support.
 * Merges trait Zod schemas via `.merge()`, deep-merges trait configs via `defu`,
 * and injects the active trait names and merged defaults into `meta.traits`.
 * @param config - Collection configuration with an optional base schema and traits array
 */
export function defineCollection<S extends z.ZodRawShape>(
  config: Omit<BaseCollectionConfig, 'schema'> & {
    schema?: z.ZodObject<S>
    traits?: ContentTrait<z.ZodObject<z.ZodRawShape>>[]
  },
) {
  const { schema: baseSchema, traits = [], ...rest } = config

  const activeTraits: string[] = []
  let mergedConfig: Record<string, unknown> = {}
  let mergedSchema = (baseSchema ?? z.object({})) as z.ZodObject<z.ZodRawShape>

  for (const trait of traits) {
    activeTraits.push(trait.name)
    if (trait.config) {
      mergedConfig = defu(mergedConfig, trait.config)
    }
    mergedSchema = mergedSchema.merge(trait.schema)
  }

  const traitsMetadata = { active: activeTraits, config: mergedConfig }

  const finalSchema = mergedSchema.extend({
    meta: z.object({
      traits: z.object({
        active: z.array(z.string()),
        config: z.record(z.string(), z.unknown()),
      }),
    }).default({ traits: traitsMetadata }),
  })

  return _defineCollection({ ...rest, schema: finalSchema })
}
