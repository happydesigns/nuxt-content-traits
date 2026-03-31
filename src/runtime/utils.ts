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
 * Recursively infers a Zod schema from a plain configuration object.
 */
function inferZodSchema(val: unknown): z.ZodTypeAny {
  if (val === null) return z.null()
  if (typeof val === 'boolean') return z.boolean()
  if (typeof val === 'number') return z.number()
  if (typeof val === 'string') return z.string()
  if (Array.isArray(val)) return z.array(z.any())
  if (typeof val === 'object' && val !== null) {
    const shape: Record<string, z.ZodTypeAny> = {}
    for (const key in val) {
      shape[key] = inferZodSchema((val as Record<string, unknown>)[key])
    }
    return z.object(shape)
  }
  return z.any()
}

/**
 * Assembles the schema and meta configuration from a list of traits.
 * @template T, S
 * @param traits - A readonly tuple of active traits
 * @param overrides - Optional overrides for custom schemas or config overrides
 * @param [overrides.customSchema] - Optional custom schema (Valibot/Yup)
 * @param [overrides.config] - Optional config overrides
 * @param [overrides.schemaWrapper] - Optional function to wrap the final schema (useful for non-Zod validators)
 * @returns An object containing the merged schema with injected trait metadata
 */
export function defineTraitCollection<T extends readonly ContentTrait<unknown>[], S = unknown>(
  traits: T,
  overrides?: {
    customSchema?: S
    config?: Record<string, unknown>
    schemaWrapper?: (schema: unknown, traitsSchema: z.ZodDefault<z.ZodObject<z.ZodRawShape>>, traitsMetadata: { active: string[], config: Record<string, unknown> }) => S
  },
): MergeTraitShapes<T> & S {
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

  const traitsMetadata = {
    active: activeTraits,
    config: finalConfig,
  }

  const traitsZodSchema = z.object({
    active: z.array(z.string()),
    config: inferZodSchema(finalConfig),
  }).default(traitsMetadata)

  if (!overrides?.schemaWrapper && finalSchema && typeof (finalSchema as z.ZodObject<z.ZodRawShape>).extend === 'function') {
    finalSchema = (finalSchema as z.ZodObject<z.ZodRawShape>).extend({
      _traits: traitsZodSchema,
    })
  }
  else if (overrides?.schemaWrapper) {
    finalSchema = overrides.schemaWrapper(finalSchema, traitsZodSchema, traitsMetadata)
  }

  return finalSchema as MergeTraitShapes<T> & S
}
