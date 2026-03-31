import { defu } from 'defu'
import { z } from 'zod'

/**
 * @template T
 */
export interface ContentTrait<T = unknown> {
  name: string
  schema: T
  config?: Record<string, unknown>
}

/**
 * TypeScript magic to infer the combined Zod schema from a tuple of traits.
 */
export type MergeTraitShapes<T extends readonly ContentTrait<unknown>[]> = T extends readonly [ContentTrait<infer S>, ...infer Rest]
  ? Rest extends readonly ContentTrait<unknown>[]
    ? S extends z.ZodObject<infer Shape>
      ? MergeTraitShapes<Rest> extends z.ZodObject<infer RestShape>
        ? z.ZodObject<Shape & RestShape>
        : S
      : S
    : S
  : z.ZodObject<Record<string, never>>

/**
 * Defines a highly reusable content feature trait.
 * @template SchemaType
 * @param trait - The trait definition containing name, schema, and config
 * @returns The strongly typed trait
 */
export function defineContentTrait<SchemaType>(
  trait: ContentTrait<SchemaType>,
): ContentTrait<SchemaType> {
  return trait
}

/**
 * Assembles the schema and meta configuration from a list of traits.
 * @template T
 * @param traits - A readonly tuple of active traits
 * @param overrides - Optional overrides for custom schemas or config overrides
 * @returns An object containing the merged schema with injected trait metadata
 */
export function defineTraitCollection<T extends readonly ContentTrait<unknown>[]>(
  traits: T,
  overrides?: {
    customSchema?: unknown
    config?: Record<string, unknown>
  },
) {
  const activeTraits: string[] = []
  let mergedTraitConfig: Record<string, unknown> = {}

  let autoMergedSchema: unknown = z.object({})

  for (const trait of traits) {
    activeTraits.push(trait.name)

    if (trait.config) {
      mergedTraitConfig = defu(mergedTraitConfig, trait.config)
    }

    if (
      !overrides?.customSchema
      && autoMergedSchema && typeof (autoMergedSchema as Record<string, unknown>).merge === 'function'
      && trait.schema && typeof (trait.schema as Record<string, unknown>).merge === 'function'
    ) {
      autoMergedSchema = (autoMergedSchema as z.ZodObject<Record<string, never>>).merge(
        trait.schema as z.ZodObject<Record<string, never>>,
      )
    }
  }

  const finalConfig = defu(overrides?.config || {}, mergedTraitConfig)
  let finalSchema = overrides?.customSchema ? overrides.customSchema : autoMergedSchema

  if (finalSchema && typeof (finalSchema as z.ZodObject<z.ZodRawShape>).extend === 'function') {
    finalSchema = (finalSchema as z.ZodObject<z.ZodRawShape>).extend({
      _traits: z.object({
        active: z.array(z.string()),
        config: z.unknown(),
      }).default({
        active: activeTraits,
        config: finalConfig,
      }),
    })
  }

  return {
    schema: finalSchema as MergeTraitShapes<T>,
  }
}
