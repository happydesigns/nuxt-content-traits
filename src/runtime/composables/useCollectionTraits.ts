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
 * @param collectionName The name of the collection (e.g., 'article', 'event')
 */
export function useCollectionTraits<K extends keyof Collections>(collectionName: K) {
  // We fetch the first document to get the trait configuration.
  const { data: document } = useAsyncData(`collection-meta-${collectionName}`, async () => {
    return await queryCollection(collectionName).first()
  })

  const activeTraits = computed<string[]>(() => (document.value as TraitDocument)?._traits?.active ?? [])

  // We infer the configuration type directly from the generated Collections interface.
  const traitConfig = computed(() => {
    type Config = Collections[K] extends { _traits: { config: infer C } } ? C : Record<string, unknown>
    return (document.value as TraitDocument)?._traits?.config as Config
  })

  const hasTrait = (traitName: string) => activeTraits.value.includes(traitName)

  return {
    activeTraits,
    traitConfig,
    hasTrait,
  }
}
