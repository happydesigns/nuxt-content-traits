<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <nav class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-bold text-lg tracking-tight">Nuxt Content Traits</div>
        <div class="flex gap-6">
          <NuxtLink 
            to="/" 
            class="text-sm font-medium hover:text-blue-600 transition-colors"
            active-class="text-blue-600 underline underline-offset-8"
          >
            Zod Demo
          </NuxtLink>
          <NuxtLink 
            to="/valibot" 
            class="text-sm font-medium hover:text-blue-600 transition-colors"
            active-class="text-blue-600 underline underline-offset-8"
          >
            Valibot Demo
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="p-8 max-w-4xl mx-auto">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.10/dist/typography.min.css";
</style>
