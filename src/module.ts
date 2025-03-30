import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addPlugin, useLogger, addComponentsDir } from '@nuxt/kit'
import { defu } from 'defu'
import { join } from 'pathe'

export interface ModuleOptions {
  /** Your hCaptcha site key */
  siteKey?: string
  /** Your hCaptcha secret key */
  secretKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-hcaptcha-module',
    configKey: 'hcaptcha',
  },
  defaults: nuxt => ({
    siteKey: nuxt.options.dev ? '10000000-ffff-ffff-ffff-000000000001' : undefined,
    secretKey: nuxt.options.dev ? '0x0000000000000000000000000000000000000000' : undefined,
  }),
  setup(options, nuxt) {
    const logger = useLogger('hcaptcha')

    const siteKey = process.env.HCAPTCHA_SITE_KEY || options.siteKey
    const secretKey = process.env.HCAPTCHA_SECRET_KEY || options.secretKey
    if (!siteKey) {
      logger.warn(
        'No site key was provided. Make sure you pass one at runtime by setting HCAPTCHA_SITE_KEY.',
      )
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Set up configuration
    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      hcaptcha: {
        secretKey,
      },
      public: {
        hcaptcha: {
          siteKey,
        },
      },
    })

    // Add plugin to load hcatpcha script
    addPlugin({ src: join(runtimeDir, 'plugins/script'), mode: 'client' })

    // Add <NuxtHCaptcha> component
    addComponentsDir({ path: join(runtimeDir, 'components') })

    // Add nitro composable for verifying token in server routes
    nuxt.hook('nitro:config', (config) => {
      config.externals = defu(config.externals, {
        inline: [runtimeDir],
      })
      config.imports = defu(config.imports, {
        presets: [
          {
            from: join(runtimeDir, 'nitro/utils/verify'),
            imports: ['verifyHCaptchaToken'],
          },
        ],
      })
    })
  },
})
