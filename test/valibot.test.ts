import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr (valibot)', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/valibot', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>valibot</div>')
  })
})
