import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, createPage, url } from '@nuxt/test-utils'

describe('verifyHCaptchaToken', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    browser: true,
  })

  it('validates test token successfully', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    const testToken = '10000000-aaaa-bbbb-cccc-000000000001'
    const response = await page.evaluate(async (token) => {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      return res.json()
    }, testToken)

    expect(response).toHaveProperty('success')
    expect(response).toHaveProperty('challenge_ts')
    expect(response).toHaveProperty('hostname')
    expect(response.success).toBe(true)
    expect(response.hostname).toBe('dummy-key-pass')
  })

  it('rejects invalid token', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    const invalidToken = 'invalid-token'
    const response = await page.evaluate(async (token) => {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      return res.json()
    }, invalidToken)

    expect(response).toHaveProperty('success')
    expect(response.success).toBe(false)
    expect(response).toHaveProperty('error-codes')
    expect(response['error-codes']).toContain('invalid-input-response')
  })
})
