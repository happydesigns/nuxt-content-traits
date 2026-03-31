<script setup lang="ts">
const { data: article } = await useAsyncData('article', () => queryCollection('zodArticle').first())
const { traitConfig, hasTrait, activeTraits } = useCollectionTraits('zodArticle')
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-serif">
        Zod Traits Demo
      </h1>
      <p class="text-gray-500">
        Demonstrating automatic inference with Zod schemas.
      </p>
    </header>

    <div
      v-if="article"
      class="border p-6 rounded-lg shadow-sm bg-white"
    >
      <div
        v-if="hasTrait('seo')"
        class="mb-4"
      >
        <h2 class="text-3xl font-bold">
          {{ article.title }}
        </h2>
        <p
          v-if="article.description"
          class="text-gray-600 italic mt-1"
        >
          {{ article.description }}
        </p>
      </div>

      <div
        v-if="hasTrait('dates')"
        class="flex items-center gap-2 text-sm text-gray-500 border-b pb-4 mb-4"
      >
        <span v-if="traitConfig.ui?.showCalendarIcon">📅</span>
        <time :datetime="article.date">{{ article.date }}</time>
        <span v-if="article.dateEnd"> – <time :datetime="article.dateEnd">{{ article.dateEnd }}</time></span>
      </div>

      <div class="prose max-w-none">
        <ContentRenderer :value="article" />
      </div>
    </div>

    <div class="mt-8 pt-8 border-t text-xs font-mono text-gray-400">
      <h3 class="uppercase font-bold mb-2 text-[10px]">
        Debug Meta (Inferred)
      </h3>
      <p>Active Traits: {{ activeTraits }}</p>
      <p>Trait Config: {{ traitConfig }}</p>
    </div>
  </div>
</template>
