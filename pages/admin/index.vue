<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mr-4">← Ana Sayfa</NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Admin: {{ authStore.user?.name }}</span>
            <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Tab Navigation -->
      <div class="mb-8">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button @click="activeTab = 'pending'" 
                  :class="[activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm']">
            Onay Bekleyenler
          </button>
          <button @click="activeTab = 'all'" 
                  :class="[activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm']">
            Tüm İlanlar
          </button>
          <button @click="activeTab = 'categories'" 
                  :class="[activeTab === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm']">
            Kategori Yönetimi
          </button>
        </nav>
      </div>

      <!-- İstatistikler -->
      <div v-if="stats && activeTab !== 'categories'" class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Toplam İlan</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_listings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Beklemede</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.pending_listings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Onaylanan</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.approved_listings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Reddedilen</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.rejected_listings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Bugün</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.today_listings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onay Bekleyen İlanlar Tab -->
      <div v-if="activeTab === 'pending'" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Onay Bekleyen İlanlar</h2>
        </div>
        
        <div v-if="loading" class="p-6 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Yükleniyor...</p>
        </div>

        <div v-else-if="!pendingListings || pendingListings.length === 0" class="p-6 text-center text-gray-500">
          <p>Onay bekleyen ilan bulunmamaktadır.</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="listing in pendingListings" :key="listing.id" class="p-6">
            <div class="flex items-start space-x-4">
              <div v-if="listing.images && listing.images.length > 0" class="flex-shrink-0">
                <img :src="listing.images[0].full_url" :alt="listing.title" class="h-20 w-20 object-cover rounded-lg">
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900">
                    <NuxtLink :to="`/listings/${listing.id}`" class="hover:text-blue-600">
                      {{ listing.title }}
                    </NuxtLink>
                  </h3>
                  <div class="flex space-x-2">
                    <button @click="approveListing(listing.id, 'approved')"
                            class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Onayla
                    </button>
                    <button @click="showRejectModal(listing)"
                            class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Reddet
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">{{ listing.description.substring(0, 150) }}...</p>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <span>{{ listing.city }}, {{ listing.district }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ listing.category?.name }} - {{ listing.sub_category?.name }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ formatDate(listing.created_at) }}</span>
                </div>
                <div class="mt-2 text-xs text-gray-400">
                  İlan No: {{ listing.unique_number }} • Sahibi: {{ listing.user?.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
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

      <!-- Tüm İlanlar Tab -->
      <div v-if="activeTab === 'all'" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Tüm İlanlar</h2>
        </div>
        
        <div v-if="loading" class="p-6 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Yükleniyor...</p>
        </div>

        <div v-else-if="!allListings || allListings.length === 0" class="p-6 text-center text-gray-500">
          <p>Henüz ilan bulunmamaktadır.</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="listing in allListings" :key="listing.id" class="p-6">
            <div class="flex items-start space-x-4">
              <div v-if="listing.images && listing.images.length > 0" class="flex-shrink-0">
                <img :src="listing.images[0].full_url" :alt="listing.title" class="h-20 w-20 object-cover rounded-lg">
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900">
                    <NuxtLink :to="`/listings/${listing.id}`" class="hover:text-blue-600">
                      {{ listing.title }}
                    </NuxtLink>
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span :class="getStatusClass(listing.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ getStatusText(listing.status) }}
                    </span>
                    <div v-if="listing.status === 'pending'" class="flex space-x-2">
                      <button @click="approveListing(listing.id, 'approved')"
                              class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Onayla
                      </button>
                      <button @click="showRejectModal(listing)"
                              class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Reddet
                      </button>
                    </div>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">{{ listing.description.substring(0, 150) }}...</p>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <span>{{ listing.city }}, {{ listing.district }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ listing.category?.name }} - {{ listing.sub_category?.name }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ formatDate(listing.created_at) }}</span>
                </div>
                <div class="mt-2 text-xs text-gray-400">
                  İlan No: {{ listing.unique_number }} • Sahibi: {{ listing.user?.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="allPagination.last_page > 1" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Toplam {{ allPagination.total }} ilan, sayfa {{ allPagination.current_page }} / {{ allPagination.last_page }}
            </div>
            <div class="flex space-x-2">
              <button v-if="allPagination.current_page > 1" @click="changeAllPage(allPagination.current_page - 1)"
                      class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Önceki
              </button>
              <button v-if="allPagination.current_page < allPagination.last_page" @click="changeAllPage(allPagination.current_page + 1)"
                      class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Sonraki
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kategori Yönetimi Tab -->
      <div v-if="activeTab === 'categories'" class="space-y-6">
        <!-- Kategoriler -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Kategoriler</h2>
            <button @click="showCategoryModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Yeni Kategori
            </button>
          </div>
          
          <div v-if="categoriesLoading" class="p-6 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-600">Yükleniyor...</p>
          </div>

          <div v-else-if="!categories || categories.length === 0" class="p-6 text-center text-gray-500">
            <p>Henüz kategori bulunmamaktadır.</p>
          </div>

          <div v-else class="divide-y divide-gray-200">
            <div v-for="category in categories" :key="category.id" class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">{{ category.name }}</h3>
                  <p v-if="category.description" class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
                  <div class="mt-2">
                    <span :class="category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                          class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ category.is_active ? 'Aktif' : 'Pasif' }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button @click="editCategory(category)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Düzenle
                  </button>
                  <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">
                    Sil
                  </button>
                </div>
              </div>
              
              <!-- Alt Kategoriler -->
              <div v-if="category.sub_categories && category.sub_categories.length > 0" class="mt-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Alt Kategoriler:</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div v-for="subCategory in category.sub_categories" :key="subCategory.id" 
                       class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div>
                      <span class="text-sm font-medium text-gray-900">{{ subCategory.name }}</span>
                      <span :class="subCategory.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                            class="ml-2 px-2 py-1 text-xs font-medium rounded-full">
                        {{ subCategory.is_active ? 'Aktif' : 'Pasif' }}
                      </span>
                    </div>
                    <div class="flex space-x-1">
                      <button @click="editSubCategory(subCategory)" class="text-blue-600 hover:text-blue-800 text-xs">
                        Düzenle
                      </button>
                      <button @click="deleteSubCategory(subCategory.id)" class="text-red-600 hover:text-red-800 text-xs">
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
                <button @click="showSubCategoryModal = true; selectedCategory = category" 
                        class="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  + Alt Kategori Ekle
                </button>
              </div>
              <div v-else class="mt-4">
                <button @click="showSubCategoryModal = true; selectedCategory = category" 
                        class="text-sm text-blue-600 hover:text-blue-800">
                  + Alt Kategori Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Red Sebebi Modal -->
    <div v-if="showRejectModalFlag" class="fixed inset-0 z-50 overflow-y-auto" @click="closeRejectModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop>
          <form @submit.prevent="rejectListing">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                İlanı Reddet
              </h3>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Red Sebebi <span class="text-red-500">*</span>
                </label>
                <textarea v-model="rejectionReason" required rows="4"
                          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Red sebebini açıklayınız..."></textarea>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" :disabled="!rejectionReason.trim()"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Reddet
              </button>
              <button type="button" @click="closeRejectModal"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Kategori Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeCategoryModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop>
          <form @submit.prevent="saveCategory">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                {{ editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori' }}
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Kategori Adı <span class="text-red-500">*</span>
                  </label>
                  <input v-model="categoryForm.name" required
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Kategori adını girin">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea v-model="categoryForm.description" rows="3"
                            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Kategori açıklaması (opsiyonel)"></textarea>
                </div>
                <div class="flex items-center">
                  <input v-model="categoryForm.is_active" type="checkbox" id="is_active"
                         class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="is_active" class="ml-2 block text-sm text-gray-900">
                    Aktif
                  </label>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                {{ editingCategory ? 'Güncelle' : 'Oluştur' }}
              </button>
              <button type="button" @click="closeCategoryModal"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Alt Kategori Modal -->
    <div v-if="showSubCategoryModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeSubCategoryModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop>
          <form @submit.prevent="saveSubCategory">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                {{ editingSubCategory ? 'Alt Kategori Düzenle' : 'Yeni Alt Kategori' }}
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ana Kategori
                  </label>
                  <input :value="selectedCategory?.name" disabled
                         class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Alt Kategori Adı <span class="text-red-500">*</span>
                  </label>
                  <input v-model="subCategoryForm.name" required
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Alt kategori adını girin">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea v-model="subCategoryForm.description" rows="3"
                            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Alt kategori açıklaması (opsiyonel)"></textarea>
                </div>
                <div class="flex items-center">
                  <input v-model="subCategoryForm.is_active" type="checkbox" id="sub_is_active"
                         class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="sub_is_active" class="ml-2 block text-sm text-gray-900">
                    Aktif
                  </label>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                {{ editingSubCategory ? 'Güncelle' : 'Oluştur' }}
              </button>
              <button type="button" @click="closeSubCategoryModal"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      :show="showConfirmModal"
      :title="confirmModal.title"
      :message="confirmModal.message"
      :confirm-text="confirmModal.confirmText"
      :cancel-text="confirmModal.cancelText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()
const adminStore = useAdminStore()
const listingStore = useListingStore()
const { pendingListings, stats, loading, pagination } = storeToRefs(adminStore)

// Toast
const { $toast } = useNuxtApp()

// Confirmation Modal
const showConfirmModal = ref(false)
const confirmModal = ref({
  title: 'Emin misiniz?',
  message: 'Bu işlemi geri alamazsınız.',
  confirmText: 'Evet, Sil',
  cancelText: 'İptal'
})
const pendingAction = ref(null)

// Tab state
const activeTab = ref('pending')

const allListings = ref([])
const allPagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
})

const categories = ref([])
const categoriesLoading = ref(false)
const showCategoryModal = ref(false)
const showSubCategoryModal = ref(false)
const selectedCategory = ref(null)
const editingCategory = ref(null)
const editingSubCategory = ref(null)

// Form data
const categoryForm = ref({
  name: '',
  description: '',
  is_active: true
})

const subCategoryForm = ref({
  name: '',
  description: '',
  is_active: true,
  category_id: null
})

onMounted(async () => {
  await adminStore.fetchPendingListings()
  await adminStore.fetchStats()
  await fetchAllListings()
  await fetchCategories()
})

const showRejectModalFlag = ref(false)
const selectedListing = ref(null)
const rejectionReason = ref('')


const changePage = async (page) => {
  await adminStore.fetchPendingListings({ page })
}

const fetchAllListings = async (page = 1) => {
  try {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    const response = await adminService.getAllListings({ page })
    if (response.success) {
      allListings.value = response.data.listings || []
      allPagination.value = response.data.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0
      }
    }
  } catch (error) {
    allListings.value = []
    allPagination.value = {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0
    }
  }
}

const changeAllPage = async (page) => {
  await fetchAllListings(page)
}

const fetchCategories = async () => {
  categoriesLoading.value = true
  try {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    const response = await adminService.getAllCategories()
    if (response.success) {
      categories.value = response.data
    }
  } catch (error) {
  } finally {
    categoriesLoading.value = false
  }
}

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = {
    name: category.name,
    description: category.description || '',
    is_active: category.is_active
  }
  showCategoryModal.value = true
}

const editSubCategory = (subCategory) => {
  editingSubCategory.value = subCategory
  subCategoryForm.value = {
    name: subCategory.name,
    description: subCategory.description || '',
    is_active: subCategory.is_active,
    category_id: subCategory.category_id
  }
  showSubCategoryModal.value = true
}

const deleteCategory = async (id) => {
  showConfirmation(
    'Kategoriyi Sil',
    'Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    'Evet, Sil',
    'İptal',
    async () => {
      try {
        const adminService = new (await import('@/services/admin.service')).AdminService()
        const response = await adminService.deleteCategory(id)
        
        if (response.success) {
          await fetchCategories()
          $toast.success('Kategori başarıyla silindi.')
        } else {
          $toast.error(response.message || 'Kategori silinirken bir hata oluştu.')
        }
      } catch (error) {
        console.error('Error deleting category:', error)
        $toast.error('Kategori silinirken bir hata oluştu.')
      }
    }
  )
}

const deleteSubCategory = async (id) => {
  showConfirmation(
    'Alt Kategoriyi Sil',
    'Bu alt kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    'Evet, Sil',
    'İptal',
    async () => {
      try {
        const adminService = new (await import('@/services/admin.service')).AdminService()
        const response = await adminService.deleteSubCategory(id)
        
        if (response.success) {
          await fetchCategories()
          $toast.success('Alt kategori başarıyla silindi.')
        } else {
          $toast.error(response.message || 'Alt kategori silinirken bir hata oluştu.')
        }
      } catch (error) {
        console.error('Error deleting sub category:', error)
        $toast.error('Alt kategori silinirken bir hata oluştu.')
      }
    }
  )
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    description: '',
    is_active: true
  }
}

const closeSubCategoryModal = () => {
  showSubCategoryModal.value = false
  selectedCategory.value = null
  editingSubCategory.value = null
  subCategoryForm.value = {
    name: '',
    description: '',
    is_active: true,
    category_id: null
  }
}

const saveCategory = async () => {
  try {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    
    let response
    if (editingCategory.value) {
      response = await adminService.updateCategory(editingCategory.value.id, categoryForm.value)
    } else {
      response = await adminService.createCategory(categoryForm.value)
    }
    
    if (response.success) {
      closeCategoryModal()
      await fetchCategories()
      $toast.success(response.message)
    } else {
      $toast.error(response.message || 'Kategori kaydedilirken bir hata oluştu.')
    }
  } catch (error) {
    console.error('Error saving category:', error)
    $toast.error('Kategori kaydedilirken bir hata oluştu.')
  }
}

const saveSubCategory = async () => {
  try {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    
    if (selectedCategory.value) {
      subCategoryForm.value.category_id = selectedCategory.value.id
    }
    
    let response
    if (editingSubCategory.value) {
      response = await adminService.updateSubCategory(editingSubCategory.value.id, subCategoryForm.value)
    } else {
      response = await adminService.createSubCategory(selectedCategory.value.id, subCategoryForm.value)
    }
    
    if (response.success) {
      closeSubCategoryModal()
      await fetchCategories()
      $toast.success(response.message)
    } else {
      $toast.error(response.message || 'Alt kategori kaydedilirken bir hata oluştu.')
    }
  } catch (error) {
    console.error('Error saving sub category:', error)
    $toast.error('Alt kategori kaydedilirken bir hata oluştu.')
  }
}

const approveListing = async (id, status) => {
  const result = await adminStore.approveListing(id, status)
  if (result.success) {
    // Başarı mesajı gösterilebilir
    console.log(result.message)
  }
}

const showRejectModal = (listing) => {
  selectedListing.value = listing
  showRejectModalFlag.value = true
  rejectionReason.value = ''
}

const closeRejectModal = () => {
  showRejectModalFlag.value = false
  selectedListing.value = null
  rejectionReason.value = ''
}

const rejectListing = async () => {
  if (selectedListing.value) {
    const result = await adminStore.approveListing(selectedListing.value.id, 'rejected', rejectionReason.value)
    if (result.success) {
      closeRejectModal()
    }
  }
}

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
  return new Date(date).toLocaleDateString('tr-TR')
}

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/auth/login')
}

const showConfirmation = (title, message, confirmText, cancelText, action) => {
  confirmModal.value = { title, message, confirmText, cancelText }
  pendingAction.value = action
  showConfirmModal.value = true
}

const handleConfirm = async () => {
  if (pendingAction.value) {
    await pendingAction.value()
  }
  showConfirmModal.value = false
  pendingAction.value = null
}

const handleCancel = () => {
  showConfirmModal.value = false
  pendingAction.value = null
}
</script>
