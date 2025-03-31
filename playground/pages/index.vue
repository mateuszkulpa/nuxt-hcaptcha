<template>
  <div class="h-[100dvh] bg-gray-100 flex justify-center p-4 items-start">
    <div class="mt-12 space-y-8 w-full md:max-w-[600px]">
      <!-- Normal Mode Example -->
      <form
        class="bg-white p-4 shadow-lg rounded-lg"
        @submit.prevent="sendForm"
      >
        <h2 class="text-lg font-semibold mb-4">
          Normal Mode
        </h2>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label>
          <input
            id="email"
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
        </div>

        <div class="flex items-center gap-2">
          <NuxtHCaptcha
            ref="normalCaptchaRef"
            v-model="normalForm.token"
          />
          <button
            type="button"
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            @click="normalCaptchaRef?.refresh()"
          >
            Refresh
          </button>
        </div>

        <button
          :disabled="!normalForm.token"
          type="submit"
          class="disabled:opacity-50 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <hr class="my-4">

        <p>hCaptcha response:</p>
        <pre>{{ normalForm.response }}</pre>
      </form>

      <!-- Invisible Mode Example -->
      <form
        class="bg-white p-4 shadow-lg rounded-lg"
        @submit.prevent="sendInvisibleForm"
      >
        <h2 class="text-lg font-semibold mb-4">
          Invisible Mode
        </h2>
        <div class="mb-6">
          <label
            for="invisible-email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label>
          <input
            id="invisible-email"
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
        </div>

        <div class="flex items-center gap-2">
          <NuxtHCaptcha
            ref="invisibleCaptchaRef"
            v-model="invisibleForm.token"
            size="invisible"
          />
          <button
            type="button"
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            @click="invisibleCaptchaRef?.refresh()"
          >
            Refresh
          </button>
        </div>

        <button
          :disabled="!invisibleForm.token"
          type="submit"
          class="disabled:opacity-50 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <hr class="my-4">

        <p>hCaptcha response:</p>
        <pre>{{ invisibleForm.response }}</pre>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const normalForm = ref({
  token: '',
  response: null,
})

const invisibleForm = ref({
  token: '',
  response: null,
})

const normalCaptchaRef = ref()
const invisibleCaptchaRef = ref()

async function sendForm() {
  normalForm.value.response = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      token: normalForm.value.token,
    },
  })
}

async function sendInvisibleForm() {
  invisibleForm.value.response = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      token: invisibleForm.value.token,
    },
  })
}
</script>
