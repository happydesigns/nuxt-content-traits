# Nuxt Content Traits

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-content-traits?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

  - **🧩 Feature-Driven Architecture:** Break down complex content schemas into modular, reusable traits.
  - **🔒 Type-Safe Composition:** Intersect multiple Zod schemas at runtime with perfect TypeScript inference (no `z.ZodTypeAny` bailouts).
  - **🎛️ Deeply Merged Configurations:** Deep-merge UI configurations, query fields, and default settings globally and locally using `defu`.
  - **⚡ Perfect HMR:** Pure TypeScript utilities ensure zero build-time magic and instant Hot Module Replacement.
  - **🎨 Nuxt Studio Ready:** Perfectly compatible with Nuxt Studio's Zod AST parser.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxt module add nuxt-content-traits
```

## Usage

### 1. Define Traits and Collections

Use `defineContentConfig` from `nuxt-content-traits/utils` to register shared traits and compose them into collections. Traits are defined once and referenced by name.

```typescript
// content.config.ts
import { z } from 'zod'
import { defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'

export default defineContentConfig({
  // 1. Register shared traits
  traits: {
    dates: defineTrait({
      schema: z.object({
        date: z.string(),
        dateEnd: z.string().optional(),
      })
    }),
    seo: defineTrait({
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
    })
  },

  // 2. Compose into collections
  collections: {
    article: {
      type: 'page',
      source: 'articles/**/*.md',
      traits: ['dates', 'seo'] // Referenced by key
    }
  }
})
```

### 2. Configure Traits

Trait configurations and UI defaults live in `app.config.ts`. This allows you to provide global defaults that can be overridden per collection.

```typescript
// app.config.ts
export default defineAppConfig({
  content: {
    traits: {
      // Global trait settings
      ui: { darkMode: true }
    },
    collections: {
      article: {
        // Collection-specific overrides
        ui: { showCalendarIcon: false }
      }
    }
  }
})
```

### 3. Consume at Runtime

Trait metadata is automatically injected into the collection's `meta.traits` field. Use the `useCollectionTraits` composable to access deeply merged configurations and active traits in your components.

```vue
<script setup lang="ts">
// Extract the deeply merged config and active traits
const { traitConfig, hasTrait, activeTraits } = useCollectionTraits('article')

const isSeoActive = hasTrait('seo')
const showIcon = traitConfig.ui?.showCalendarIcon
</script>

<template>
  <header>
    <div v-if="isSeoActive">
      <span v-if="showIcon">📅</span>
    </div>
  </header>
</template>
```

## Contribution

<details>
<summary>Local development</summary>

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

\</details\>

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
