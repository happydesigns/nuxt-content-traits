import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { zodAdapter } from '../../src/runtime/adapters/zod'
import { valibotAdapter } from '../../src/runtime/adapters/valibot'
import { detectAdapter } from '../../src/runtime/adapters/detect'

// ---------------------------------------------------------------------------
// zodAdapter
// ---------------------------------------------------------------------------

describe('zodAdapter', () => {
  it('emptyObject returns a Zod object with no fields', () => {
    const schema = zodAdapter.emptyObject()
    expect(schema).toBeInstanceOf(z.ZodObject)
    expect(Object.keys(schema.shape)).toHaveLength(0)
  })

  it('merge combines fields from both schemas', () => {
    const base = z.object({ a: z.string() })
    const extra = z.object({ b: z.number() })
    const merged = zodAdapter.merge(base, extra)
    expect(Object.keys(merged.shape)).toEqual(expect.arrayContaining(['a', 'b']))
  })

  it('merge lets extra win on field conflict', () => {
    const base = z.object({ title: z.string() })
    const extra = z.object({ title: z.number() })
    const merged = zodAdapter.merge(base, extra)
    // The merged title field should be a ZodNumber (from extra)
    expect(merged.shape.title).toBeInstanceOf(z.ZodNumber)
  })

  it('extendWithTraitsMeta adds meta.traits with correct defaults', () => {
    const metadata = { active: ['seo'], config: { key: 'value' } }
    const schema = zodAdapter.extendWithTraitsMeta(z.object({ title: z.string() }), metadata)
    expect(schema.shape.meta).toBeDefined()
    // Parsing without meta should use the injected default
    const result = schema.parse({ title: 'Hello' })
    expect(result).toMatchObject({ meta: { traits: { active: ['seo'], config: { key: 'value' } } } })
  })

  it('extendWithTraitsMeta preserves existing fields', () => {
    const schema = zodAdapter.extendWithTraitsMeta(
      z.object({ title: z.string() }),
      { active: [], config: {} },
    )
    const result = schema.parse({ title: 'Hello' })
    expect(result).toMatchObject({ title: 'Hello' })
  })
})

// ---------------------------------------------------------------------------
// valibotAdapter
// ---------------------------------------------------------------------------

describe('valibotAdapter', () => {
  it('emptyObject returns a Valibot object with no entries', () => {
    const schema = valibotAdapter.emptyObject()
    expect(schema.type).toBe('object')
    expect(Object.keys(schema.entries)).toHaveLength(0)
  })

  it('merge combines entries from both schemas', () => {
    const base = v.object({ a: v.string() })
    const extra = v.object({ b: v.number() })
    const merged = valibotAdapter.merge(base, extra)
    expect(Object.keys(merged.entries)).toEqual(expect.arrayContaining(['a', 'b']))
  })

  it('merge lets extra win on entry conflict', () => {
    const base = v.object({ title: v.string() })
    const extra = v.object({ title: v.number() })
    const merged = valibotAdapter.merge(base, extra)
    // The merged title entry should be the number schema from extra
    expect((merged.entries.title as { type: string }).type).toBe('number')
  })

  it('extendWithTraitsMeta adds meta entry', () => {
    const metadata = { active: ['seo'], config: { key: 'value' } }
    const schema = valibotAdapter.extendWithTraitsMeta(v.object({ title: v.string() }), metadata)
    expect(schema.entries.meta).toBeDefined()
  })

  it('extendWithTraitsMeta meta defaults are applied when meta is absent', () => {
    const metadata = { active: ['dates'], config: {} }
    const schema = valibotAdapter.extendWithTraitsMeta(v.object({ title: v.string() }), metadata)
    const result = v.parse(schema, { title: 'Hello' })
    expect(result.meta).toEqual({ traits: metadata })
  })

  it('extendWithTraitsMeta preserves existing entries', () => {
    const schema = valibotAdapter.extendWithTraitsMeta(
      v.object({ title: v.string() }),
      { active: [], config: {} },
    )
    const result = v.parse(schema, { title: 'Hello' })
    expect(result.title).toBe('Hello')
  })
})

// ---------------------------------------------------------------------------
// detectAdapter
// ---------------------------------------------------------------------------

describe('detectAdapter', () => {
  it('returns zodAdapter for z.object({})', () => {
    expect(detectAdapter(z.object({}))).toBe(zodAdapter)
  })

  it('returns zodAdapter for z.object with fields', () => {
    expect(detectAdapter(z.object({ title: z.string() }))).toBe(zodAdapter)
  })

  it('returns valibotAdapter for v.object({})', () => {
    expect(detectAdapter(v.object({}))).toBe(valibotAdapter)
  })

  it('returns valibotAdapter for v.object with fields', () => {
    expect(detectAdapter(v.object({ title: v.string() }))).toBe(valibotAdapter)
  })

  it('returns valibotAdapter for v.looseObject({})', () => {
    expect(detectAdapter(v.looseObject({}))).toBe(valibotAdapter)
  })

  it('throws for a plain object', () => {
    expect(() => detectAdapter({} as never)).toThrow('[nuxt-content-traits]')
  })

  it('throws for null', () => {
    expect(() => detectAdapter(null as never)).toThrow('[nuxt-content-traits]')
  })

  it('throws with message naming supported validators', () => {
    expect(() => detectAdapter({} as never)).toThrow('Zod v4, Valibot')
  })
})
