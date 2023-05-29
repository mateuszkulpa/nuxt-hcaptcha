import { defineNuxtPlugin, ref, useRuntimeConfig, watch, useHead } from '#imports'

const hCaptchaScript = {
  src: 'https://js.hcaptcha.com/1/api.js?onload=onloadHCaptchaCallback',
  async: true,
  defer: true
}

const configureScript = `
window.loadHCaptcha = new Promise(resolve => {
  window.onloadHCaptchaCallback = function () {
    resolve();
    delete window.onloadHCaptchaCallback;
    delete window.loadHCaptcha;
  }
})
window.resolveHCaptchaLoadingScriptPromise();
`

export default defineNuxtPlugin(() => {
  const addHCaptchaScript = ref(false)
  const config = useRuntimeConfig()

  const hcaptchaPlugin = {
    async loadHCaptcha () {
      addHCaptchaScript.value = true
      await (window as any).hCaptchaLoadingScript
      await (window as any).loadHCaptcha
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

  const scripts = [{ children: configureScript }, hCaptchaScript];

  (window as any).resolveHCaptchaLoadingScriptPromise = undefined;
  (window as any).hCaptchaLoadingScript = new Promise((resolve) => {
    (window as any).resolveHCaptchaLoadingScriptPromise = resolve
  })

  const unsubscribe = watch(addHCaptchaScript, () => {
    if (!addHCaptchaScript.value) { return }
    unsubscribe()
    useHead({ script: scripts })
  })

  return {
    provide: {
      hcaptcha: hcaptchaPlugin
    }
  }
})
