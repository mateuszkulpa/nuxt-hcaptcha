import hCaptchaModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    hCaptchaModule
  ],
  hcaptcha: {
    siteKey: '10000000-ffff-ffff-ffff-000000000001',
    secretKey: '0x0000000000000000000000000000000000000000'
  }
})
