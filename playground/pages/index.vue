<script setup lang="ts">
const { data: article } = await useAsyncData('zodArticle', () => queryCollection('zodArticle').first())
const { traitConfig, activeTraits } = useCollectionTraits('zodArticle')
</script>

<template>
  <TraitDemo
    v-if="article"
    validator="zod"
    :doc="article"
    :active-traits="activeTraits"
    :trait-config="traitConfig"
  />
</template>
