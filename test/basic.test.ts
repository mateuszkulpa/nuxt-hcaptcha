import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, url, createPage } from '@nuxt/test-utils'

describe('hCaptcha widget', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    browser: true
  })

  it('renders the page with hCaptcha widget page', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    const hCaptchaWidget = await page.$('[data-hcaptcha-widget-id]')

    expect(hCaptchaWidget).toBeDefined()
  })
})
