<script setup lang="ts">
const { data: article } = await useAsyncData('valibotArticle', () => queryCollection('valibotArticle').first())
const { traitConfig, activeTraits } = useCollectionTraits('valibotArticle')
</script>

<template>
  <TraitDemo
    v-if="article"
    validator="valibot"
    :doc="article"
    :active-traits="activeTraits"
    :trait-config="traitConfig"
  />
</template>
