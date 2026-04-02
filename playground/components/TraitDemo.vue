<script setup lang="ts">
defineProps<{
  validator: 'zod' | 'valibot'
  doc: {
    title?: string
    description?: string
    date?: string
    dateEnd?: string
  }
  activeTraits: string[]
  traitConfig: Record<string, unknown>
}>()
</script>

<template>
  <div class="space-y-10">
    <!-- Article -->
    <article class="space-y-6">
      <header class="space-y-3">
        <span
          class="badge"
          :data-validator="validator"
        >{{ validator.toUpperCase() }}</span>
        <h1 v-if="doc.title">
          {{ doc.title }}
        </h1>
        <p
          v-if="doc.description"
          class="description"
        >
          {{ doc.description }}
        </p>
        <p
          v-if="doc.date"
          class="date"
        >
          <time :datetime="doc.date">{{ doc.date }}</time>
          <template v-if="doc.dateEnd">
            &ndash; <time :datetime="doc.dateEnd">{{ doc.dateEnd }}</time>
          </template>
        </p>
      </header>

      <hr>

      <div class="prose">
        <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
        <ContentRenderer :value="doc" />
      </div>
    </article>

    <!-- Technical details -->
    <div class="separator-label">
      <span>Technical details</span>
    </div>

    <div class="cards-grid">
      <!-- Runtime trait config -->
      <div class="card col-span-2">
        <div class="card-header">
          Trait config <span class="muted">(runtime · from useCollectionTraits)</span>
        </div>
        <div class="trait-row">
          <span class="key">activeTraits</span>
          <span>{{ activeTraits.join(', ') }}</span>
          <span class="key">traitConfig</span>
          <span>{{ JSON.stringify(traitConfig) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-y-10 { display: flex; flex-direction: column; gap: 2.5rem; }
.space-y-6 { display: flex; flex-direction: column; gap: 1.5rem; }
.space-y-3 { display: flex; flex-direction: column; gap: 0.75rem; }

.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #374151;
}
.badge[data-validator="zod"] { background: #fff7ed; color: #c2410c; }
.badge[data-validator="valibot"] { background: #f5f3ff; color: #6d28d9; }

h1 { font-size: 1.875rem; font-weight: 700; letter-spacing: -0.025em; color: #111827; margin: 0; }
.description { font-size: 1.125rem; color: #6b7280; margin: 0; }
.date { font-size: 0.875rem; color: #9ca3af; margin: 0; }

hr { border: none; border-top: 1px solid #e5e7eb; }

.separator-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #9ca3af;
  font-size: 0.875rem;
}
.separator-label::before,
.separator-label::after {
  content: '';
  flex: 1;
  border-top: 1px solid #e5e7eb;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 0.875rem;
}
.col-span-2 { grid-column: span 2; }

.card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}
.card-header {
  padding: 0.625rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
  background: #f9fafb;
}
.muted { text-transform: none; font-weight: 400; color: #d1d5db; }

.trait-row {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-family: monospace;
  color: #4b5563;
  align-items: baseline;
}
.trait-row .key { color: #9ca3af; }
</style>
