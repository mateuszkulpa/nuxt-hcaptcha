import type { HCaptchaVerificationResponse } from '../../types'
// @ts-expect-error nitro aliases aren't registered
import { useRuntimeConfig } from '#internal/nitro'

const endpoint = 'https://hcaptcha.com/siteverify'

export const verifyHCaptchaToken = async (
  token: string,
): Promise<HCaptchaVerificationResponse> => {
  const {
    public: {
      hcaptcha: { siteKey },
    },
    hcaptcha: { secretKey },
  } = useRuntimeConfig()

  const data = new FormData()
  data.append('sitekey', siteKey)
  data.append('secret', secretKey)
  data.append('response', token)

  return await $fetch(endpoint, {
    method: 'POST',
    body: data,
  })
}
