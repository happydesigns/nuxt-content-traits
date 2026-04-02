# Nuxt Content Traits

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-content-traits?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- **🧩 Reusable Traits:** Define schema fragments once and compose them into multiple collections by name.
- **🔒 Type-Safe:** Full TypeScript inference for all trait fields — supports both Zod v4 and Valibot.
- **⚡ Runtime Access:** Active traits and merged config are available at runtime via `useCollectionTraits`.
- **🔄 Per-Collection Overrides:** Deep-merge global and per-collection trait config overrides via `app.config.ts`.

## Quick Setup

```bash
npx nuxt module add nuxt-content-traits
```

## Usage

### 1. Define Traits and Collections

Replace `defineContentConfig` from `@nuxt/content` with the one from `nuxt-content-traits/utils`. Register shared traits in a `traits` registry and reference them by key in each collection.

```typescript
// content.config.ts
import { z } from 'zod'
import { defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'

export default defineContentConfig({
  traits: {
    dates: defineTrait({
      schema: z.object({
        date: z.string(),
        dateEnd: z.string().optional(),
      }),
    }),
    seo: defineTrait({
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  },

  collections: {
    article: {
      type: 'page',
      source: 'articles/**/*.md',
      traits: ['dates', 'seo'],
    },
  },
})
```

Valibot schemas are also supported — all traits within a collection must use the same validator.

```typescript
import * as v from 'valibot'
import { defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'

export default defineContentConfig({
  traits: {
    dates: defineTrait({
      schema: v.object({
        date: v.string(),
        dateEnd: v.optional(v.string()),
      }),
    }),
  },
  collections: {
    post: {
      type: 'page',
      source: 'posts/**/*.md',
      traits: ['dates'],
    },
  },
})
```

### 2. Consume at Runtime

Use `useCollectionTraits` to access active traits and the merged trait config in your components.

```vue
<script setup lang="ts">
const { data: article } = await useAsyncData('article', () =>
  queryCollection('article').first()
)

const { activeTraits, hasTrait, traitConfig } = useCollectionTraits('article')
</script>

<template>
  <div>
    <p v-if="hasTrait('seo')">SEO trait is active</p>
    <pre>{{ activeTraits }}</pre>
    <pre>{{ traitConfig }}</pre>
  </div>
</template>
```

### 3. Add Trait Config (Optional)

Trait config consumed by `useCollectionTraits` lives in `app.config.ts`. You can define global values and per-collection overrides — they are deep-merged at runtime.

```typescript
// app.config.ts
export default defineAppConfig({
  content: {
    traits: {
      // Global values available to all collections
    },
    collections: {
      article: {
        // Per-collection values, takes precedence over global
      },
    },
  },
})
```

## Contribution

<details>
<summary>Local development</summary>

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

</details>

---

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-content-traits/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-content-traits

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-content-traits.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-content-traits

[license-src]: https://img.shields.io/npm/l/nuxt-content-traits.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-content-traits

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
