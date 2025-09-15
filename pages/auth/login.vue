<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Giriş Yap
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Hesabınıza giriş yapın
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">E-posta</label>
            <input id="email" v-model="form.email" name="email" type="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="E-posta adresi">
          </div>
          <div>
            <label for="password" class="sr-only">Şifre</label>
            <input id="password" v-model="form.password" name="password" type="password" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Şifre">
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loading">Giriş yapılıyor...</span>
            <span v-else>Giriş Yap</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Hesabınız yok mu?
            <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
              Kayıt olun
            </NuxtLink>
          </p>
        </div>

        <div class="text-center">
          <NuxtLink to="/" class="text-sm text-gray-600 hover:text-gray-500">
            ← Ana Sayfaya Dön
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

const form = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    if (authStore.user?.role === 'admin') {
      await navigateTo('/admin')
    } else {
      await navigateTo('/')
    }
  } else {
    errorMessage.value = result.message
  }
}
</script>
