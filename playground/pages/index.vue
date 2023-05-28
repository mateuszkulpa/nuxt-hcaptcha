<template>
  <div class="h-[100dvh] bg-gray-100 flex justify-center p-4 items-start">
    <form
      class="mt-12 bg-white w-full md:max-w-[600px] p-4 shadow-lg rounded-lg"
      @submit.prevent="sendForm"
    >
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input id="email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <NuxtHCaptcha v-model="form.token" />

      <button :disabled="!form.token" type="submit" class="disabled:opacity-50 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>

      <hr class="my-4">

      <p>hCaptcha response:</p>
      <pre>{{ hCaptchaResponse }}</pre>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  token: ''
})

const hCaptchaResponse = ref()

async function sendForm () {
  hCaptchaResponse.value = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      token: form.value.token
    }
  })
}
</script>
