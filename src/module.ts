import { defineNuxtModule, addImports, createResolver } from '@nuxt/kit'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-content-traits',
    configKey: 'contentTraits',
  },
  setup() {
    const resolver = createResolver(import.meta.url)

    addImports([
      {
        name: 'defineContentTrait',
        as: 'defineContentTrait',
        from: resolver.resolve('./runtime/utils'),
      },
      {
        name: 'defineCollection',
        as: 'defineCollection',
        from: resolver.resolve('./runtime/utils'),
      },
      {
        name: 'useCollectionTraits',
        as: 'useCollectionTraits',
        from: resolver.resolve('./runtime/composables/useCollectionTraits'),
      },
    ])
  },
})
