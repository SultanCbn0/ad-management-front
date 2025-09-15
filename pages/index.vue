<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">İlan Yönetim Sistemi</h1>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="authStore.isAuthenticated">
              <span class="text-gray-700">Merhaba, {{ authStore.user?.name }}</span>
              <NuxtLink to="/listings/create" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                İlan Oluştur
              </NuxtLink>
              <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Çıkış Yap
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Giriş Yap
              </NuxtLink>
              <NuxtLink to="/auth/register" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Kayıt Ol
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Ana İçerik -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Hoş Geldiniz!</h2>
        <p class="text-gray-600 mb-6">
          İlan yönetim sistemine hoş geldiniz. Bu sistemde ilan oluşturabilir, 
          mevcut ilanları görüntüleyebilir ve admin paneli üzerinden ilanları yönetebilirsiniz.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-blue-900 mb-2">İlan Oluştur</h3>
            <p class="text-blue-700 mb-4">Yeni bir ilan oluşturmak için tıklayın.</p>
            <NuxtLink to="/listings/create" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Başla
            </NuxtLink>
          </div>
          
          
          <div class="bg-orange-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-orange-900 mb-2">İlanlarım</h3>
            <p class="text-orange-700 mb-4">Kendi ilanlarınızı görüntüleyin ve yönetin.</p>
            <NuxtLink to="/my-listings" class="inline-block bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
              Görüntüle
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/auth/login')
}

onMounted(async () => {
  await authStore.initialize()
})
</script>