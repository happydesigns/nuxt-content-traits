import { describe, it, expect, beforeEach, vi } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { defineContentConfig, defineTrait } from '../../src/runtime/utils'

vi.mock('@nuxt/content', () => ({
  defineCollection: (config: unknown) => config,
  defineContentConfig: (config: unknown) => config,
}))

type TraitsMeta = Record<string, { active: string[] }>

beforeEach(() => {
  delete (globalThis as Record<string, unknown>).__nuxtContentTraitsMeta
})

describe('defineContentConfig — trait metadata', () => {
  it('sets globalThis.__nuxtContentTraitsMeta with active traits for each collection (Zod)', () => {
    defineContentConfig({
      traits: {
        seo: defineTrait({ schema: z.object({ title: z.string() }) }),
        dates: defineTrait({ schema: z.object({ date: z.string() }) }),
      },
      collections: {
        posts: { type: 'page', source: '**', traits: ['seo', 'dates'] },
        pages: { type: 'page', source: 'pages/**', traits: ['seo'] },
      },
    })

    const meta = (globalThis as Record<string, unknown>).__nuxtContentTraitsMeta as TraitsMeta
    expect(meta).toBeDefined()
    expect(meta['posts']?.active).toEqual(['seo', 'dates'])
    expect(meta['pages']?.active).toEqual(['seo'])
  })

  it('sets globalThis.__nuxtContentTraitsMeta with active traits for each collection (Valibot)', () => {
    defineContentConfig({
      traits: {
        seo: defineTrait({ schema: v.object({ title: v.optional(v.string()) }) }),
      },
      collections: {
        articles: { type: 'page', source: '**', traits: ['seo'] },
      },
    })

    const meta = (globalThis as Record<string, unknown>).__nuxtContentTraitsMeta as TraitsMeta
    expect(meta['articles']?.active).toEqual(['seo'])
  })

  it('produces an empty active list for a collection with no traits', () => {
    defineContentConfig({
      traits: {},
      collections: {
        bare: { type: 'page', source: '**' },
      },
    })

    const meta = (globalThis as Record<string, unknown>).__nuxtContentTraitsMeta as TraitsMeta
    expect(meta['bare']?.active).toEqual([])
  })

  it('throws for an unknown trait reference', () => {
    expect(() =>
      defineContentConfig({
        traits: { seo: defineTrait({ schema: z.object({ title: z.string() }) }) },
        collections: {
          posts: { type: 'page', source: '**', traits: ['nonexistent'] },
        },
      }),
    ).toThrow('[nuxt-content-traits] Unknown trait: "nonexistent"')
  })
})
