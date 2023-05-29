import { defineNuxtPlugin, ref, useRuntimeConfig, watch, useHead } from '#imports'

const hCaptchaScript = {
  src: 'https://js.hcaptcha.com/1/api.js?onload=onloadHCaptchaCallback',
  async: true,
  defer: true
}

export default defineNuxtPlugin(() => {
  const addHCaptchaScript = ref(false)
  const config = useRuntimeConfig()

  const hcaptchaPlugin = {
    async loadHCaptcha () {
      addHCaptchaScript.value = true
      await (window as any).hCaptchaLoadedPromise
    },
    async render (element: string | HTMLElement, options: Omit<ConfigRender, 'sitekey'> = {}) {
      await hcaptchaPlugin.loadHCaptcha()
      return hcaptcha.render(element, {
        sitekey: config.public.hcaptcha.siteKey,
        ...options
      })
    },
    remove (widgetId: string) {
      hcaptcha.remove(widgetId)
    }
  }

  ;(window as any).hCaptchaLoadedPromise = new Promise<void>((resolve) => {
    (window as any).onloadHCaptchaCallback = function () {
      resolve()
    }
  })

  const unsubscribe = watch(addHCaptchaScript, () => {
    if (!addHCaptchaScript.value) { return }
    unsubscribe()
    useHead({ script: [hCaptchaScript] })
  })

  return {
    provide: {
      hcaptcha: hcaptchaPlugin
    }
  }
})
