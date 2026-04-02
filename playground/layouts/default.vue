<template>
  <div>
    <header class="site-header">
      <div class="site-header-inner">
        <span class="site-title">nuxt-content-traits</span>
        <nav class="site-nav">
          <NuxtLink to="/">Zod</NuxtLink>
          <NuxtLink to="/valibot">Valibot</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="site-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}
.site-header-inner {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-title {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}
.site-nav {
  display: flex;
  gap: 0.25rem;
}
.site-nav a {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: #374151;
}
.site-nav a:hover { background: #f3f4f6; }
.site-nav a.router-link-active { background: #f3f4f6; font-weight: 500; }
.site-main {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}
</style>
