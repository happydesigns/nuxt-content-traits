import { computed } from 'vue'
import { useAsyncData, useAppConfig, queryCollection } from '#imports'
import { defu } from 'defu'
import type { Collections } from '@nuxt/content'

interface TraitsMeta {
  active: string[]
  config: Record<string, unknown>
}

interface ContentAppConfig {
  traits?: Record<string, unknown>
  collections?: Record<string, Record<string, unknown>>
}

/**
 * Provides reactive trait configuration for a Nuxt Content collection.
 * Fetches trait defaults from `meta.traits` on the first collection document,
 * then deep-merges them with global and collection-level overrides from `app.config.ts`.
 * @template K - The collection name key
 * @param collectionName - The name of the collection
 */
export function useCollectionTraits<K extends keyof Collections>(collectionName: K) {
  const appConfig = useAppConfig() as { content?: ContentAppConfig }

  const { data: meta } = useAsyncData(`traits-meta-${String(collectionName)}`, async () => {
    const doc = await queryCollection(collectionName).first()
    const traits = (doc as { meta?: { traits?: TraitsMeta } } | null)?.meta?.traits
    return traits ?? { active: [] as string[], config: {} as Record<string, unknown> }
  })

  const activeTraits = computed<string[]>(() => meta.value?.active ?? [])

  const traitConfig = computed(() => {
    const defaults = meta.value?.config ?? {}
    const globalOverrides = appConfig.content?.traits ?? {}
    const collectionOverrides = appConfig.content?.collections?.[String(collectionName)] ?? {}
    return defu(collectionOverrides, globalOverrides, defaults)
  })

  const hasTrait = (name: string): boolean => activeTraits.value.includes(name)

  return { activeTraits, traitConfig, hasTrait }
}
