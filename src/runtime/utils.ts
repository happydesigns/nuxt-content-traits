import { defu } from 'defu'
import { z } from 'zod'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A loose representation of Nuxt Content's defineCollection input,
 * omitting the schema since we generate it.
 */
export interface BaseCollectionConfig {
  type: 'page' | 'data'
  source?: any
  meta?: Record<string, any>
  [key: string]: any
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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

export function defineContentTrait<SchemaType>(
  trait: ContentTrait<SchemaType>,
): ContentTrait<SchemaType> {
  return trait
}

/**
 * @template Type, T
 * @param baseConfig - The Nuxt Content collection config (excluding 'schema')
 * @param traits - A readonly tuple of active traits (e.g., `[traitA, traitB] as const`)
 * @param overrides - Optional overrides for custom schemas (Valibot/Yup) or config overrides
 * @param [overrides.customSchema] - Optional custom schema (Valibot/Yup)
 * @param [overrides.config] - Optional config overrides
 */
export function defineTraitCollection<
  Type extends 'page' | 'data',
  T extends readonly ContentTrait<unknown>[],
>(
  baseConfig: BaseCollectionConfig & { type: Type },
  traits: T,
  overrides?: {
    customSchema?: unknown
    config?: Record<string, unknown>
  },
) {
  const activeTraits: string[] = []
  let mergedTraitConfig: Record<string, unknown> = {}

  // Start with an empty Zod object for auto-merging
  let autoMergedSchema: unknown = z.object({})

  for (const trait of traits) {
    activeTraits.push(trait.name)

    if (trait.config) {
      mergedTraitConfig = defu(mergedTraitConfig, trait.config)
    }

    // Attempt to auto-merge if it looks like a Zod object
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

  // Use the custom schema if provided, otherwise fallback to the auto-merged Zod schema
  let finalSchema = overrides?.customSchema ? overrides.customSchema : autoMergedSchema

  // Inject traits metadata into the schema so it's available on every document
  // This avoids adding invalid properties to the collection config while keeping metadata accessible
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
    ...baseConfig,
    schema: finalSchema as MergeTraitShapes<T>,
  }
}
