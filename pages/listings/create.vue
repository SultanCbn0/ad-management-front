<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mr-4">← Geri</NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Yeni İlan Oluştur</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow p-6">
        <div class="space-y-6">
          <!-- İlan Numarası (Sadece Gösterim) -->
          <div v-if="listingNumber" class="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800">İlan Numaranız</h3>
                <div class="mt-2 text-sm text-blue-700">
                  <p class="font-mono text-lg font-bold">{{ listingNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- İlan Başlığı -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              İlan Başlığı <span class="text-red-500">*</span>
            </label>
            <input v-model="form.title" type="text" required
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="İlan başlığını giriniz">
          </div>

          <!-- Kategori ve Alt Kategori -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select v-model="form.category_id" @change="onCategoryChange" required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Kategori Seçiniz</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Alt Kategori <span class="text-red-500">*</span>
              </label>
              <select v-model="form.sub_category_id" required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Alt Kategori Seçiniz</option>
                <option v-for="subCategory in subCategories" :key="subCategory.id" :value="subCategory.id">
                  {{ subCategory.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- İl ve İlçe -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                İl <span class="text-red-500">*</span>
              </label>
              <input v-model="form.city" type="text" required
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="İl giriniz">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                İlçe <span class="text-red-500">*</span>
              </label>
              <input v-model="form.district" type="text" required
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="İlçe giriniz">
            </div>
          </div>

          <!-- Açıklama -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Açıklama <span class="text-red-500">*</span>
            </label>
            <textarea v-model="form.description" required rows="6"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="İlan açıklamasını giriniz"></textarea>
          </div>

          <!-- Resim Yükleme -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Resim <span class="text-red-500">*</span>
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="image-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Resim yükleyin</span>
                    <input id="image-upload" ref="imageInput" type="file" accept="image/*" @change="onImageChange" class="sr-only">
                  </label>
                  <p class="pl-1">veya sürükleyip bırakın</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF (Max 2MB)</p>
              </div>
            </div>
            <div v-if="selectedImage" class="mt-2">
              <img :src="imagePreview" alt="Preview" class="h-32 w-32 object-cover rounded-md">
            </div>
          </div>

          <!-- Hata Mesajları -->
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

          <!-- Başarı Mesajı -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">{{ successMessage }}</h3>
              </div>
            </div>
          </div>

          <!-- Butonlar -->
          <div class="flex justify-end space-x-4">
            <NuxtLink to="/" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              İptal
            </NuxtLink>
            <button type="submit" :disabled="loading"
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="loading">Oluşturuluyor...</span>
              <span v-else>İlan Oluştur</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const listingStore = useListingStore()
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

const selectedImage = ref(null)
const imagePreview = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const listingNumber = ref('')
const { $toast } = useNuxtApp()

onMounted(async () => {
  await listingStore.fetchCategories()
  
  // Sayfa yüklendiğinde ilan numarası oluştur
  const numberResult = await listingStore.generateListingNumber()
  if (numberResult.success) {
    listingNumber.value = numberResult.data.unique_number
  }
})

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

const submitForm = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!form.value.image) {
    errorMessage.value = 'Lütfen bir resim seçiniz.'
    return
  }
  
  // Form data'ya ilan numarasını ekle
  const formData = {
    ...form.value,
    unique_number: listingNumber.value
  }
  
  const result = await listingStore.createListing(formData)
  
  if (result.success) {
    $toast.success('İlan başarıyla oluşturuldu! İlan numaranız: ' + listingNumber.value)
    
    // Formu temizle
    form.value = {
      title: '',
      description: '',
      category_id: '',
      sub_category_id: '',
      city: '',
      district: '',
      image: null
    }
    selectedImage.value = null
    imagePreview.value = ''
    
    // Yeni numara oluştur
    const numberResult = await listingStore.generateListingNumber()
    if (numberResult.success) {
      listingNumber.value = numberResult.data.unique_number
    }
    
    // 3 saniye sonra ana sayfaya yönlendir
    setTimeout(() => {
      navigateTo('/')
    }, 3000)
  } else {
    errorMessage.value = result.message
    $toast.error(result.message || 'İlan oluşturulurken bir hata oluştu.')
  }
}
</script>
