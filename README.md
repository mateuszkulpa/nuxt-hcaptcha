# Nuxt hCaptcha

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

🚧 **Note: This project is currently under development and not yet production ready.**

Nuxt module that allows to protect your website from bots. Heavily inspired by [Nuxt Turnstile](https://github.com/nuxt-modules/turnstile).

## Quick Setup

1. Add `nuxt-hcaptcha-module` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-hcaptcha-module

# Using yarn
yarn add --dev nuxt-hcaptcha-module

# Using npm
npm install --save-dev nuxt-hcaptcha-module
```

2. Add `nuxt-hcaptcha-module` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-hcaptcha-module'
  ]
})
```

3. Set `siteKey` and `secretKey` generated in hCaptcha dashboard
```ts
export default defineNuxtConfig({
  modules: ["nuxt-hcaptcha-module"],
  hcaptcha: {
    siteKey: 'YOUR_SITE_KEY',
    secretKey: 'YOUR_SECRET_KEY'
  }
});
```

You can also use environment variables:
```
HCAPTCHA_SITE_KEY=YOUR_SITE_KEY
HCAPTCHA_SECRET_KEY=YOUR_SECRET_KEY
```

4. Use `NuxtHCaptcha` component in your application

```vue
<template>
  <form>
    <NuxtHCaptcha v-model="token" />
  </form>
</template>

<script setup>
const token = ref()
</script>
```

5. Use `verifyHCaptchaToken` to validate hCaptcha token (only when you use server routes)

```ts
// server/api/your-api-endpoint.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const captchaResponse = await verifyHCaptchaToken(body.token)

  return {
    captchaResponse,
    token: body.token
  }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-hcaptcha-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-hcaptcha-module

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-hcaptcha-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-hcaptcha-module

[license-src]: https://img.shields.io/npm/l/nuxt-hcaptcha-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-hcaptcha-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
