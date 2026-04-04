# Changelog


## v0.1.3

[compare changes](https://github.com/happydesigns/nuxt-content-traits/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- Expose trait metadata via globalThis and Vite virtual module ([85af455](https://github.com/happydesigns/nuxt-content-traits/commit/85af455))

### 💅 Refactors

- Remove extendWithTraitsMeta from schema adapters ([f53d4c3](https://github.com/happydesigns/nuxt-content-traits/commit/f53d4c3))

### ✅ Tests

- Add unit tests for defineContentConfig trait metadata ([aa86748](https://github.com/happydesigns/nuxt-content-traits/commit/aa86748))
- Replace deprecated toMatchTypeOf with toExtend ([2ec1355](https://github.com/happydesigns/nuxt-content-traits/commit/2ec1355))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.1.2

[compare changes](https://github.com/happydesigns/nuxt-content-traits/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Add defineCollection wrapper to match Nuxt Content's native API pattern ([0df6d09](https://github.com/happydesigns/nuxt-content-traits/commit/0df6d09))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.1.1

[compare changes](https://github.com/happydesigns/nuxt-content-traits/compare/v0.1.0...v0.1.1)

### 🩹 Fixes

- Lazy-load valibot via createRequire to avoid hard install requirement ([d41f8b1](https://github.com/happydesigns/nuxt-content-traits/commit/d41f8b1))

### 📖 Documentation

- Update readme ([9dcf18c](https://github.com/happydesigns/nuxt-content-traits/commit/9dcf18c))
- Update README to reflect current API and Valibot support ([b103200](https://github.com/happydesigns/nuxt-content-traits/commit/b103200))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.1.0

[compare changes](https://github.com/happydesigns/nuxt-content-traits/compare/v0.0.2...v0.1.0)

### 🚀 Enhancements

- ⚠️  Replace defineTraitCollection with native defineCollection wrapper ([304c06c](https://github.com/happydesigns/nuxt-content-traits/commit/304c06c))
- **playground:** ⚠️  Migrate to native wrapper architecture ([586c472](https://github.com/happydesigns/nuxt-content-traits/commit/586c472))
- ⚠️  Implement defineContentConfig with inline traits registry ([cceea48](https://github.com/happydesigns/nuxt-content-traits/commit/cceea48))
- Implement automatic type inference for useCollectionTraits ([7e957fb](https://github.com/happydesigns/nuxt-content-traits/commit/7e957fb))
- Add schema adapter system for Zod and Valibot support ([6380ce4](https://github.com/happydesigns/nuxt-content-traits/commit/6380ce4))
- Add Valibot as an optional peer dependency ([41fd59a](https://github.com/happydesigns/nuxt-content-traits/commit/41fd59a))
- **test:** Add unit and integration tests for Valibot support ([6411c0f](https://github.com/happydesigns/nuxt-content-traits/commit/6411c0f))
- **playground:** Add Valibot demo and update Zod examples ([20f8dbe](https://github.com/happydesigns/nuxt-content-traits/commit/20f8dbe))

### 🩹 Fixes

- Store traits metadata in _traits field to avoid Nuxt Content meta collision ([1edc223](https://github.com/happydesigns/nuxt-content-traits/commit/1edc223))

### 💅 Refactors

- ⚠️  Migrate playground to inline trait registry ([8a2fa5a](https://github.com/happydesigns/nuxt-content-traits/commit/8a2fa5a))
- **playground:** Reorganize demo layout and shared components ([3e7aaed](https://github.com/happydesigns/nuxt-content-traits/commit/3e7aaed))

### 📖 Documentation

- Update usage instructions for new trait workflow ([035b9b1](https://github.com/happydesigns/nuxt-content-traits/commit/035b9b1))

### ✅ Tests

- Update adapter tests for _traits field rename ([bab4fa9](https://github.com/happydesigns/nuxt-content-traits/commit/bab4fa9))

### 🎨 Styles

- Replace explicit any with Record<string, unknown> in useCollectionTraits ([43401eb](https://github.com/happydesigns/nuxt-content-traits/commit/43401eb))

#### ⚠️ Breaking Changes

- ⚠️  Replace defineTraitCollection with native defineCollection wrapper ([304c06c](https://github.com/happydesigns/nuxt-content-traits/commit/304c06c))
- **playground:** ⚠️  Migrate to native wrapper architecture ([586c472](https://github.com/happydesigns/nuxt-content-traits/commit/586c472))
- ⚠️  Implement defineContentConfig with inline traits registry ([cceea48](https://github.com/happydesigns/nuxt-content-traits/commit/cceea48))
- ⚠️  Migrate playground to inline trait registry ([8a2fa5a](https://github.com/happydesigns/nuxt-content-traits/commit/8a2fa5a))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.0.2

[compare changes](https://github.com/happydesigns/nuxt-content-traits/compare/v0.0.1...v0.0.2)

### 💅 Refactors

- Update defineTraitCollection to return schema directly ([9a371ff](https://github.com/happydesigns/nuxt-content-traits/commit/9a371ff))

### 📖 Documentation

- Update readme ([dd8a1e8](https://github.com/happydesigns/nuxt-content-traits/commit/dd8a1e8))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.0.1


### 🚀 Enhancements

- Implement core trait-based content architecture ([5f9a10a](https://github.com/happydesigns/nuxt-content-traits/commit/5f9a10a))
- **runtime:** Refactor trait metadata and defineTraitCollection ([1f99751](https://github.com/happydesigns/nuxt-content-traits/commit/1f99751))
- Implement automatic inference and multi-validator support ([a9e4e28](https://github.com/happydesigns/nuxt-content-traits/commit/a9e4e28))
- Add multi-page demo for Zod and Valibot ([44c4fef](https://github.com/happydesigns/nuxt-content-traits/commit/44c4fef))

### 🩹 Fixes

- **playground:** Fix dev:prepare by re-introducing explicit imports in schemas ([9958958](https://github.com/happydesigns/nuxt-content-traits/commit/9958958))
- **valibot:** Ensure trait metadata defaults are injected in custom schemas ([6d99aab](https://github.com/happydesigns/nuxt-content-traits/commit/6d99aab))
- Correct ./utils export extensions in package.json ([88522ac](https://github.com/happydesigns/nuxt-content-traits/commit/88522ac))

### 💅 Refactors

- Decouple trait assembly from collection routing ([cf48051](https://github.com/happydesigns/nuxt-content-traits/commit/cf48051))
- **playground:** Restructure traits and collections for scalability ([78269c9](https://github.com/happydesigns/nuxt-content-traits/commit/78269c9))
- **playground:** Improve multi-validator demo and fix valibot defaults ([4e108ae](https://github.com/happydesigns/nuxt-content-traits/commit/4e108ae))

### 📖 Documentation

- Add readme ([377898f](https://github.com/happydesigns/nuxt-content-traits/commit/377898f))

### 🏡 Chore

- Init Nuxt module ([fae3d98](https://github.com/happydesigns/nuxt-content-traits/commit/fae3d98))
- Remove version constraint ([6cb558c](https://github.com/happydesigns/nuxt-content-traits/commit/6cb558c))
- Rely on auto-imports ([d512c09](https://github.com/happydesigns/nuxt-content-traits/commit/d512c09))
- Fix linting and JSDoc errors ([d091d75](https://github.com/happydesigns/nuxt-content-traits/commit/d091d75))
- Migrate workspaces to pnpm-workspace.yaml ([d8eb4d4](https://github.com/happydesigns/nuxt-content-traits/commit/d8eb4d4))
- **playground:** Use workspace protocol for local dependency ([520deb9](https://github.com/happydesigns/nuxt-content-traits/commit/520deb9))
- Update lockfile ([da5d4f4](https://github.com/happydesigns/nuxt-content-traits/commit/da5d4f4))

### ✅ Tests

- **playground:** Setup traits, article collection and dummy content ([a248c8f](https://github.com/happydesigns/nuxt-content-traits/commit/a248c8f))
- **playground:** Update app.vue and nuxt configuration ([b3c9c95](https://github.com/happydesigns/nuxt-content-traits/commit/b3c9c95))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

