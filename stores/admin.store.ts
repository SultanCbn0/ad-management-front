import { defineStore } from 'pinia'
import type { Listing, ListingStats } from '@/services/admin.service'

export const useAdminStore = defineStore('admin', () => {
  const pendingListings = ref<Listing[]>([])
  const stats = ref<ListingStats | null>(null)
  const loading = ref(false)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  })

  const fetchPendingListings = async (filters: any = {}) => {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    loading.value = true
    try {
      const response = await adminService.getPendingListings(filters)
      if (response && response.success) {
        pendingListings.value = response.data.listings || []
        pagination.value = response.data.pagination || {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: 0
        }
      } else {
        pendingListings.value = []
        pagination.value = {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: 0
        }
      }
    } catch (error) {
      console.error('Error fetching pending listings:', error)
      pendingListings.value = []
      pagination.value = {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0
      }
    } finally {
      loading.value = false
    }
  }

  const approveListing = async (id: number, status: 'approved' | 'rejected', rejectionReason?: string) => {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    loading.value = true
    try {
      const response = await adminService.approveListing(id, { status, rejection_reason: rejectionReason })
      if (response.success) {
        await fetchPendingListings()
        await fetchStats()
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'İşlem sırasında bir hata oluştu' }
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    const adminService = new (await import('@/services/admin.service')).AdminService()
    try {
      const response = await adminService.getStats()
      if (response && response.success) {
        stats.value = response.data
      } else {
        stats.value = {
          total_listings: 0,
          pending_listings: 0,
          approved_listings: 0,
          rejected_listings: 0,
          today_listings: 0
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      stats.value = {
        total_listings: 0,
        pending_listings: 0,
        approved_listings: 0,
        rejected_listings: 0,
        today_listings: 0
      }
    }
  }

  return {
    pendingListings: readonly(pendingListings),
    stats: readonly(stats),
    loading: readonly(loading),
    pagination: readonly(pagination),
    fetchPendingListings,
    approveListing,
    fetchStats
  }
})
