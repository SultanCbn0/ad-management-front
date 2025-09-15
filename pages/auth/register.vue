<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Kayıt Ol
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Yeni hesap oluşturun
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input id="name" v-model="form.name" name="name" type="text" required
                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                   placeholder="Adınız ve soyadınız">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">E-posta</label>
            <input id="email" v-model="form.email" name="email" type="email" required
                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                   placeholder="E-posta adresiniz">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
            <input id="password" v-model="form.password" name="password" type="password" required
                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                   placeholder="Şifreniz">
          </div>
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation" type="password" required
                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                   placeholder="Şifrenizi tekrar girin">
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
            <span v-if="loading">Kayıt oluşturuluyor...</span>
            <span v-else>Kayıt Ol</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Zaten hesabınız var mı?
            <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
              Giriş yapın
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
// Guest middleware ile korunuyor - sadece giriş yapmamış kullanıcılar
definePageMeta({
  middleware: 'guest'
})

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''
  
  if (form.value.password !== form.value.password_confirmation) {
    errorMessage.value = 'Şifreler eşleşmiyor.'
    return
  }
  
  const result = await authStore.register(
    form.value.name,
    form.value.email,
    form.value.password,
    form.value.password_confirmation
  )
  
  if (result.success) {
    // Başarılı kayıt - ana sayfaya yönlendir
    await navigateTo('/')
  } else {
    errorMessage.value = result.message
  }
}
</script>
