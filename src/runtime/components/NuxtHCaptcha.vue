<script setup lang="ts">
import { useNuxtApp, ref, onMounted } from '#imports'

const nuxtApp = useNuxtApp()
const element = ref<HTMLElement>()
const widgetId = ref<string>()

const props = withDefaults(defineProps<{
  modelValue?: string,
  options?: Omit<ConfigRender, 'sitekey'>,
}>(), {
  modelValue: '',
  options: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [token: string];
}>()

async function renderHCaptchaWidget () {
  widgetId.value = await nuxtApp.$hcaptcha.render(element.value!,
    {
      ...props.options,
      callback: (token) => {
        emit('update:modelValue', token)
        if (typeof props.options?.callback === 'function') {
          props.options.callback?.(token)
        }
      }
    })
}

onMounted(() => {
  renderHCaptchaWidget()
})

onBeforeUnmount(() => {
  if (widgetId.value) { nuxtApp.$hcaptcha.remove(widgetId.value) }
})
</script>

<template>
  <div ref="element" />
</template>
