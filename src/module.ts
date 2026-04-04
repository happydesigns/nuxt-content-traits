import { defineNuxtModule, addImports, createResolver } from '@nuxt/kit'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-content-traits',
    configKey: 'contentTraits',
  },
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins ?? []
      ;(config.plugins as unknown[]).push({
        name: 'nuxt-content-traits:meta',
        resolveId(id: string) {
          if (id === '#content-traits-meta') return '\0content-traits-meta'
        },
        load(id: string) {
          if (id === '\0content-traits-meta') {
            const data = (globalThis as Record<string, unknown>).__nuxtContentTraitsMeta ?? {}
            return `export default ${JSON.stringify(data)}`
          }
        },
      })
    })

    addImports([
      {
        name: 'defineTrait',
        as: 'defineTrait',
        from: resolver.resolve('./runtime/utils'),
      },
      {
        name: 'defineCollection',
        as: 'defineCollection',
        from: resolver.resolve('./runtime/utils'),
      },
      {
        name: 'defineContentConfig',
        as: 'defineContentConfig',
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
