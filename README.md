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

### 1. Define Traits

Create isolated features defining their Zod schema and default configurations.

```typescript
// schemas/traits/dates.ts
import { z } from 'zod/v4'
import { defineContentTrait } from 'nuxt-content-traits/utils'

export const datesTrait = defineContentTrait({
  name: 'dates',
  schema: z.object({
    date: z.iso.date(),
    dateEnd: z.iso.date().optional(),
  }),
  config: {
    query: {
      order: [{ field: 'date', direction: 'DESC' }],
    },
    ui: {
      showCalendarIcon: true,
    }
  },
})
```

### 2. Assemble Collections

Compose your traits into Nuxt Content collections. The `as const` tuple ensures flawless TypeScript inference of the combined schemas.

```typescript
// schemas/collections/event.ts
import { defineTraitCollection } from 'nuxt-content-traits/utils'
import { datesTrait } from '../traits/dates'
import { authorsTrait } from '../traits/authors'

export const eventCollection = defineTraitCollection(
  {
    type: 'page',
    source: 'events/**/*.{md,yaml}',
  },
  [datesTrait, authorsTrait] as const,
  {
    // Collection-level overrides deep-merge over trait defaults
    query: {
      order: [{ field: 'date', direction: 'ASC' }]
    },
    ui: {
      authors: {
        showSocials: false
      }
    }
  }
)
```

### 3. Register in Nuxt Content

Keep your `content.config.ts` clean by registering the assembled collections.

```typescript
// content.config.ts
import { defineContentConfig } from '@nuxt/content'
import { eventCollection } from './schemas/collections/event'

export default defineContentConfig({
  collections: {
    event: eventCollection,
  },
})
```

### 4. Consume at Runtime

The merged configuration and active traits are automatically injected into the collection's `meta` object, ready to be used in your components to conditionally render UI or dynamically construct optimized `queryCollection` calls.

```vue
<script setup lang="ts">
const appConfig = useAppConfig()
// Extract the deeply merged config from the collection's meta
const eventTraits = appConfig.content?.collections?.event?.meta?.traits

const hasDates = eventTraits?.active?.includes('dates')
const dateConfig = eventTraits?.config?.ui?.showCalendarIcon
</script>

<template>
  <header>
    <div v-if="hasDates">
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
