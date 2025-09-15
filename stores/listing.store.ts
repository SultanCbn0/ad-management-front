import { defineStore } from 'pinia'
import type { Listing, Category, SubCategory, ListingFilters } from '@/services/listing.service'

export const useListingStore = defineStore('listing', () => {
  const listings = ref<Listing[]>([])
  const categories = ref<Category[]>([])
  const subCategories = ref<SubCategory[]>([])
  const currentListing = ref<Listing | null>(null)
  const loading = ref(false)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  })

  const fetchListings = async (filters: ListingFilters = {}) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.getListings(filters)
      if (response.success) {
        listings.value = response.data.data
        pagination.value = response.data.pagination
      }
    } catch (error) {
    } finally {
      loading.value = false
    }
  }

  const fetchMyListings = async (filters: ListingFilters = {}) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.getMyListings(filters)
      if (response.success) {
        return { success: true, data: response.data }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlanlar yüklenirken bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const fetchListing = async (id: number) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.getListing(id)
      if (response.success) {
        currentListing.value = response.data
        return { success: true, data: response.data }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlan yüklenirken bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const createListing = async (data: any) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.createListing(data)
      if (response.success) {
        await fetchListings()
        return { success: true, data: response.data, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlan oluşturulurken bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const updateListing = async (id: number, data: any) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.updateListing(id, data)
      if (response.success) {
        await fetchListings()
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlan güncellenirken bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const deleteListing = async (id: number) => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    loading.value = true
    try {
      const response = await listingService.deleteListing(id)
      if (response.success) {
        await fetchListings()
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlan silinirken bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    try {
      const response = await listingService.getCategories()
      if (response.success) {
        categories.value = response.data
      }
    } catch (error) {
    }
  }

  const fetchSubCategories = async (categoryId: number) => {
    try {
      const category = categories.value.find(c => c.id === categoryId)
      if (category?.sub_categories) {
        subCategories.value = category.sub_categories
      }
    } catch (error) {
    }
  }

  const getSubCategoriesByCategory = (categoryId: number) => {
    const category = categories.value.find(c => c.id === categoryId)
    return category?.sub_categories || []
  }

  const generateListingNumber = async () => {
    const listingService = new (await import('@/services/listing.service')).ListingService()
    try {
      const response = await listingService.generateListingNumber()
      if (response.success) {
        return { success: true, data: response.data }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İlan numarası oluşturulurken bir hata oluştu' }
    }
  }

  return {
    listings: readonly(listings),
    categories: readonly(categories),
    subCategories: readonly(subCategories),
    currentListing: readonly(currentListing),
    loading: readonly(loading),
    pagination: readonly(pagination),
    fetchListings,
    fetchMyListings,
    fetchListing,
    createListing,
    updateListing,
    deleteListing,
    fetchCategories,
    fetchSubCategories,
    getSubCategoriesByCategory,
    generateListingNumber
  }
})