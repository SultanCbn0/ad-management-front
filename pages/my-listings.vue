<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mr-4">← Ana Sayfa</NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">İlanlarım</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Merhaba, {{ authStore.user?.name }}</span>
            <NuxtLink to="/listings/create" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Yeni İlan
            </NuxtLink>
            <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">İlanlar yükleniyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!myListings || myListings.length === 0" class="text-center py-12">
        <div class="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Henüz ilanınız yok</h3>
        <p class="mt-1 text-sm text-gray-500">İlk ilanınızı oluşturmak için başlayın.</p>
        <div class="mt-6">
          <NuxtLink to="/listings/create" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            İlan Oluştur
          </NuxtLink>
        </div>
      </div>

      <!-- Listings Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="listing in myListings" :key="listing.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <!-- Image -->
          <div v-if="listing.images && listing.images.length > 0" class="h-48 bg-gray-200">
            <img :src="listing.images[0].full_url" :alt="listing.title" class="w-full h-full object-cover">
          </div>
          <div v-else class="h-48 bg-gray-200 flex items-center justify-center">
            <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900 truncate">{{ listing.title }}</h3>
              <span :class="getStatusClass(listing.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ getStatusText(listing.status) }}
              </span>
            </div>
            
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ listing.description }}</p>
            
            <div class="text-sm text-gray-500 mb-3">
              <div class="flex items-center">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ listing.city }}, {{ listing.district }}
              </div>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                {{ listing.category?.name }} - {{ listing.sub_category?.name }}
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-400">
                İlan No: {{ listing.unique_number }}
              </div>
              <div class="flex space-x-2">
                <NuxtLink :to="`/listings/${listing.id}`" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Detay
                </NuxtLink>
                <NuxtLink :to="`/listings/edit/${listing.id}`" class="text-green-600 hover:text-green-800 text-sm font-medium">
                  Düzenle
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="mt-8 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Toplam {{ pagination.total }} ilan, sayfa {{ pagination.current_page }} / {{ pagination.last_page }}
        </div>
        <div class="flex space-x-2">
          <button v-if="pagination.current_page > 1" @click="changePage(pagination.current_page - 1)"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Önceki
          </button>
          <button v-if="pagination.current_page < pagination.last_page" @click="changePage(pagination.current_page + 1)"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Sonraki
          </button>
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
const listingStore = useListingStore()

const myListings = ref([])
const loading = ref(false)
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
})

const loadMyListings = async (page = 1) => {
  loading.value = true
  try {
    const response = await listingStore.fetchMyListings({ page })
    if (response.success) {
      myListings.value = response.data.listings
      pagination.value = response.data.pagination
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const changePage = async (page) => {
  await loadMyListings(page)
}

const getStatusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'approved':
      return 'Onaylandı'
    case 'pending':
      return 'Beklemede'
    case 'rejected':
      return 'Reddedildi'
    default:
      return 'Bilinmiyor'
  }
}

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/auth/login')
}

onMounted(async () => {
  await authStore.initialize()
  await loadMyListings()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
