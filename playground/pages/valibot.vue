<script setup lang="ts">
const { data: article } = await useAsyncData('valibot-article', () => queryCollection('valibotArticle').first())
const { traitConfig, hasTrait, activeTraits } = useCollectionTraits<'valibotArticle', { valibot?: { enabled?: boolean } }>('valibotArticle')
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-serif text-blue-600">Valibot Traits Demo</h1>
      <p class="text-gray-500">Demonstrating trait extraction from a Valibot-powered collection.</p>
    </header>

    <div v-if="article" class="border p-6 rounded-lg shadow-sm bg-white border-blue-100">
      <div class="mb-4">
        <h2 class="text-3xl font-bold text-blue-900">Valibot Item</h2>
        <p class="text-gray-600 italic mt-1">Field from Valibot schema: {{ article.valibotField }}</p>
      </div>

      <div v-if="hasTrait('valibotFeature')" class="p-4 bg-blue-50 rounded border border-blue-200 text-blue-800 text-sm">
        <span v-if="traitConfig.valibot?.enabled">✅ Valibot Trait Logic Active (Inferred)</span>
      </div>

      <div class="prose max-w-none mt-6">
        <ContentRenderer :value="article" />
      </div>
    </div>

    <div class="mt-8 pt-8 border-t text-xs font-mono text-gray-400">
      <h3 class="uppercase font-bold mb-2 text-[10px]">Debug Meta (Inferred via wrapper)</h3>
      <p>Active Traits: {{ activeTraits }}</p>
      <p>Trait Config: {{ traitConfig }}</p>
    </div>
  </div>
</template>
