<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/my-listings" class="text-blue-600 hover:text-blue-800 mr-4">← İlanlarım</NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">İlan Düzenle</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Merhaba, {{ authStore.user?.name }}</span>
            <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">İlan Bilgilerini Düzenle</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">İlan yükleniyor...</p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Başlık -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                İlan Başlığı <span class="text-red-500">*</span>
              </label>
              <input v-model="form.title" required
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="İlan başlığını girin">
            </div>

            <!-- Açıklama -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Açıklama <span class="text-red-500">*</span>
              </label>
              <textarea v-model="form.description" required rows="4"
                        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="İlan açıklamasını girin"></textarea>
            </div>

            <!-- Kategori -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select v-model="form.category_id" required @change="onCategoryChange"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Kategori seçin</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Alt Kategori -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Alt Kategori <span class="text-red-500">*</span>
              </label>
              <select v-model="form.sub_category_id" required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Alt kategori seçin</option>
                <option v-for="subCategory in subCategories" :key="subCategory.id" :value="subCategory.id">
                  {{ subCategory.name }}
                </option>
              </select>
            </div>

            <!-- Şehir -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Şehir <span class="text-red-500">*</span>
              </label>
              <input v-model="form.city" required
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Şehir">
            </div>

            <!-- İlçe -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                İlçe <span class="text-red-500">*</span>
              </label>
              <input v-model="form.district" required
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="İlçe">
            </div>
          </div>

          <!-- Mevcut Resim -->
          <div v-if="currentImage" class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Mevcut Resim</label>
            <div class="flex items-center space-x-4">
              <img :src="currentImage.full_url" :alt="form.title" class="h-32 w-32 object-cover rounded-lg">
              <div>
                <p class="text-sm text-gray-600">{{ currentImage.image_name }}</p>
                <button type="button" @click="removeImage" class="text-red-600 hover:text-red-800 text-sm">
                  Resmi Kaldır
                </button>
              </div>
            </div>
          </div>

          <!-- Yeni Resim -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ currentImage ? 'Yeni Resim (Opsiyonel)' : 'Resim (Opsiyonel)' }}
            </label>
            <input type="file" @change="onImageChange" accept="image/*"
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <p class="text-xs text-gray-500 mt-1">Maksimum 2MB, JPG, PNG veya GIF formatında</p>
            
            <!-- Resim Önizleme -->
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" alt="Önizleme" class="h-32 w-32 object-cover rounded-lg">
            </div>
          </div>

          <!-- Hata Mesajı -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
            <p class="text-red-800">{{ errorMessage }}</p>
          </div>

          <!-- Başarı Mesajı -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
            <p class="text-green-800">{{ successMessage }}</p>
          </div>

          <!-- Butonlar -->
          <div class="flex justify-end space-x-4 pt-6">
            <NuxtLink to="/my-listings" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              İptal
            </NuxtLink>
            <button type="submit" :disabled="loading"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {{ loading ? 'Güncelleniyor...' : 'Güncelle' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const authStore = useAuthStore()
const listingStore = useListingStore()
const { $toast } = useNuxtApp()

const { categories, subCategories, loading } = storeToRefs(listingStore)

const form = ref({
  title: '',
  description: '',
  category_id: '',
  sub_category_id: '',
  city: '',
  district: '',
  image: null
})

const currentImage = ref(null)
const selectedImage = ref(null)
const imagePreview = ref('')
const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  await authStore.initialize()
  await listingStore.fetchCategories()
  await loadListing()
})

const loadListing = async () => {
  try {
    const response = await listingStore.fetchListing(parseInt(route.params.id))
    if (response && response.success) {
      const listing = response.data
      form.value = {
        title: listing.title,
        description: listing.description,
        category_id: listing.category ? listing.category.id.toString() : '',
        sub_category_id: listing.sub_category ? listing.sub_category.id.toString() : '',
        city: listing.city,
        district: listing.district,
        image: null
      }
      
      if (listing.images && listing.images.length > 0) {
        currentImage.value = listing.images[0]
      }
      
      if (listing.category) {
        await listingStore.fetchSubCategories(listing.category.id)
      }
    }
  } catch (error) {
    $toast.error('İlan yüklenirken bir hata oluştu')
  }
}

const onCategoryChange = () => {
  form.value.sub_category_id = ''
  if (form.value.category_id) {
    listingStore.fetchSubCategories(parseInt(form.value.category_id))
  }
}

const onImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      errorMessage.value = 'Resim boyutu 2MB\'dan küçük olmalıdır.'
      return
    }
    
    form.value.image = file
    selectedImage.value = file
    
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  currentImage.value = null
  form.value.image = null
  selectedImage.value = null
  imagePreview.value = ''
}

const submitForm = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const formData = {
      ...form.value,
      category_id: form.value.category_id ? parseInt(form.value.category_id) : null,
      sub_category_id: form.value.sub_category_id ? parseInt(form.value.sub_category_id) : null
    }
    
    const result = await listingStore.updateListing(parseInt(route.params.id), formData)
    
    if (result.success) {
      $toast.success('İlan başarıyla güncellendi!')
      await navigateTo('/my-listings')
    } else {
      errorMessage.value = result.message
      $toast.error(result.message || 'İlan güncellenirken bir hata oluştu')
    }
  } catch (error) {
    $toast.error('İlan güncellenirken bir hata oluştu')
  }
}

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/auth/login')
}
</script>
