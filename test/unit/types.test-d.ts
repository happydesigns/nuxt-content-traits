import { expectTypeOf } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { defineTrait, type TraitDefinition } from '../../src/runtime/utils'

// Zod trait: concrete schema type is preserved
const zodTrait = defineTrait({ schema: z.object({ title: z.string() }) })
expectTypeOf(zodTrait).toMatchTypeOf<TraitDefinition<z.ZodObject<{ title: z.ZodString }>>>()

// Valibot trait: concrete schema type is preserved (not widened to AnyObjectSchema)
const valibotTrait = defineTrait({ schema: v.object({ title: v.string() }) })
expectTypeOf(valibotTrait.schema).not.toMatchTypeOf<z.ZodObject<z.ZodRawShape>>()
expectTypeOf(valibotTrait.schema).toMatchTypeOf<v.ObjectSchema<v.ObjectEntries, undefined>>()
