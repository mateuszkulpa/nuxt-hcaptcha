<script setup lang="ts">
import { useNuxtApp, ref, onMounted, onBeforeUnmount } from '#imports'

const nuxtApp = useNuxtApp()
const element = ref<HTMLElement>()
const widgetId = ref<string>()

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: Omit<ConfigRender, 'sitekey'>
  size?: 'normal' | 'compact' | 'invisible'
}>(), {
  modelValue: '',
  options: () => ({}),
  size: 'normal',
})

const emit = defineEmits<{
  'update:modelValue': [token: string]
}>()

async function renderHCaptchaWidget() {
  widgetId.value = await nuxtApp.$hcaptcha.render(element.value!, {
    ...props.options,
    size: props.size,
    callback: (token) => {
      emit('update:modelValue', token)
      if (typeof props.options?.callback === 'function') {
        props.options.callback?.(token)
      }
    },
  })

  if (props.size === 'invisible') {
    await nuxtApp.$hcaptcha.execute(widgetId.value)
  }
}

async function refresh() {
  if (widgetId.value) {
    await nuxtApp.$hcaptcha.remove(widgetId.value)
  }
  await renderHCaptchaWidget()
}

defineExpose({
  refresh,
})

onMounted(() => {
  renderHCaptchaWidget()
})

onBeforeUnmount(() => {
  if (widgetId.value) {
    nuxtApp.$hcaptcha.remove(widgetId.value)
  }
})
</script>

<template>
  <div ref="element" />
</template>
