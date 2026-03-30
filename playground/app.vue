<script setup lang="ts">
const { data: article } = await useAsyncData('article', () => queryCollection('article').first())
const { traitConfig, hasTrait, activeTraits } = useCollectionTraits<{ ui?: { showCalendarIcon?: boolean } }>('article')
</script>

<template>
  <div class="p-8 max-w-2xl mx-auto space-y-6">
    <div
      v-if="article"
      class="border p-6 rounded-lg shadow-sm"
    >
      <div
        v-if="hasTrait('seo')"
        class="mb-4"
      >
        <h1 class="text-3xl font-bold">
          {{ article.title }}
        </h1>
        <p
          v-if="article.description"
          class="text-gray-600 italic mt-1"
        >
          {{ article.description }}
        </p>
      </div>

      <div
        v-if="hasTrait('dates')"
        class="flex items-center gap-2 text-sm text-gray-500"
      >
        <span v-if="traitConfig.ui?.showCalendarIcon">📅</span>
        <time :datetime="article.date">{{ article.date }}</time>
        <span v-if="article.dateEnd"> – <time :datetime="article.dateEnd">{{ article.dateEnd }}</time></span>
      </div>

      <div class="prose mt-6">
        <ContentRenderer :value="article" />
      </div>
    </div>

    <div
      v-else
      class="text-red-500"
    >
      Failed to load article.
    </div>

    <div class="mt-8 pt-8 border-t text-xs font-mono text-gray-400">
      <h2 class="uppercase font-bold mb-2">
        Debug Meta
      </h2>
      <p>Active Traits: {{ activeTraits }}</p>
      <p>Trait Config: {{ traitConfig }}</p>
    </div>
  </div>
</template>
