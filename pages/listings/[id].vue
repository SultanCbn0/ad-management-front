<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mr-4">← Geri</NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">İlan Detayı</h1>
          </div>
        </div>
      </div>
    </header>

    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Yükleniyor...</p>
      </div>
    </div>

    <div v-else-if="!currentListing" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="text-center text-gray-500">
        <p>İlan bulunamadı.</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <!-- İlan Başlığı ve Durum -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">{{ currentListing.title }}</h1>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusClass(currentListing.status)">
              {{ getStatusText(currentListing.status) }}
            </span>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            İlan No: {{ currentListing.unique_number }}
          </p>
        </div>

        <!-- Resimler -->
        <div v-if="currentListing.images && currentListing.images.length > 0" class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Resimler</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in currentListing.images" :key="image.id" 
                 class="relative group cursor-pointer" @click="openImageModal(image)">
              <img :src="image.full_url" :alt="`Resim ${index + 1}`" 
                   class="w-full h-32 object-cover rounded-lg hover:opacity-75">
              <div v-if="image.is_primary" 
                   class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Ana Resim
              </div>
            </div>
          </div>
        </div>

        <!-- İlan Bilgileri -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900 mb-4">İlan Bilgileri</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Kategori</h3>
              <p class="mt-1 text-sm text-gray-900">
                {{ currentListing.category?.name }} - {{ currentListing.sub_category?.name }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Konum</h3>
              <p class="mt-1 text-sm text-gray-900">
                {{ currentListing.city }}, {{ currentListing.district }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Oluşturulma Tarihi</h3>
              <p class="mt-1 text-sm text-gray-900">
                {{ formatDate(currentListing.created_at) }}
              </p>
            </div>
            <div v-if="currentListing.approved_at">
              <h3 class="text-sm font-medium text-gray-500">Onaylanma Tarihi</h3>
              <p class="mt-1 text-sm text-gray-900">
                {{ formatDate(currentListing.approved_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Açıklama -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Açıklama</h2>
          <div class="prose max-w-none">
            <p class="text-gray-700 whitespace-pre-wrap">{{ currentListing.description }}</p>
          </div>
        </div>

        <!-- İlan Sahibi Bilgileri -->
        <div v-if="currentListing.user" class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900 mb-4">İlan Sahibi</h2>
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-700">
                  {{ currentListing.user.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ currentListing.user.name }}</p>
              <p class="text-sm text-gray-500">{{ currentListing.user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Admin Bilgileri -->
        <div v-if="currentListing.approved_by" class="px-6 py-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Onaylayan Admin</h2>
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-700">
                  {{ currentListing.approved_by.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ currentListing.approved_by.name }}</p>
              <p class="text-sm text-gray-500">{{ currentListing.approved_by.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resim Modal -->
    <div v-if="selectedImage" class="fixed inset-0 z-50 overflow-y-auto" @click="closeImageModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <img :src="selectedImage.full_url" :alt="selectedImage.image_name" 
                 class="w-full h-auto max-h-96 object-contain">
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="closeImageModal" 
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Auth middleware ile korunuyor
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const listingStore = useListingStore()
const { currentListing, loading } = storeToRefs(listingStore)

const selectedImage = ref(null)

onMounted(async () => {
  await listingStore.fetchListing(parseInt(route.params.id))
})

const getStatusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'approved': return 'Onaylandı'
    case 'pending': return 'Beklemede'
    case 'rejected': return 'Reddedildi'
    default: return 'Bilinmiyor'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openImageModal = (image) => {
  selectedImage.value = image
}

const closeImageModal = () => {
  selectedImage.value = null
}
</script>
