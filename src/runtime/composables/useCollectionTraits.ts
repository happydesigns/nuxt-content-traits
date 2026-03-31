import { computed } from 'vue'
import { useAsyncData, queryCollection } from '#imports'
import type { Collections } from '@nuxt/content'

interface TraitDocument {
  _traits?: {
    active?: string[]
    config?: Record<string, unknown>
  }
}

/**
 * Extracts the trait configuration and active features for a given Nuxt Content collection.
 * @template K - The name of the collection
 * @template T - Optional manual override for the trait configuration type
 * @param collectionName The name of the collection (e.g., 'article', 'event')
 */
export function useCollectionTraits<K extends keyof Collections, T = unknown>(collectionName: K) {
  // We fetch the first document to get the trait configuration.
  const { data: document } = useAsyncData(`collection-meta-${collectionName}`, async () => {
    return await queryCollection(collectionName).first()
  })

  const activeTraits = computed<string[]>(() => (document.value as TraitDocument)?._traits?.active ?? [])

  // We infer the configuration type directly from the generated Collections interface,
  // but allow for a manual override if T is provided.
  const traitConfig = computed(() => {
    type InferredConfig = Collections[K] extends { _traits: { config: infer C } } ? C : Record<string, unknown>
    // If T was not provided (remains unknown), use the inferred type.
    type FinalConfig = unknown extends T ? InferredConfig : T
    return (document.value as TraitDocument)?._traits?.config as FinalConfig
  })

  const hasTrait = (traitName: string) => activeTraits.value.includes(traitName)

  return {
    activeTraits,
    traitConfig,
    hasTrait,
  }
}
