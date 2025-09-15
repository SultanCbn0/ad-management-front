import { ApiService, type PaginatedResponse } from '@/services/api'
import type { Listing } from '@/services/listing.service'

export interface ApproveListingRequest {
  status: 'approved' | 'rejected'
  rejection_reason?: string
}

export interface ListingStats {
  total_listings: number
  pending_listings: number
  approved_listings: number
  rejected_listings: number
  today_listings: number
}

export class AdminService extends ApiService {
  async getPendingListings(filters: any = {}) {
    return await this.get<PaginatedResponse<Listing>>('/admin/pending-listings', filters)
  }

  async approveListing(id: number, data: ApproveListingRequest) {
    return await this.post<Listing>(`/admin/listings/${id}/approve`, data)
  }

  async getStats() {
    return await this.get<ListingStats>('/admin/stats')
  }

  async getAllListings(params: any = {}) {
    return await this.get<PaginatedResponse<Listing>>('/admin/listings', params)
  }

  async getAllCategories() {
    return await this.get('/admin/categories/all')
  }

  async createCategory(data: any) {
    return await this.post('/admin/categories', data)
  }

  async updateCategory(id: number, data: any) {
    return await this.put(`/admin/categories/${id}`, data)
  }

  async deleteCategory(id: number) {
    return await this.delete(`/admin/categories/${id}`)
  }

  async createSubCategory(categoryId: number, data: any) {
    return await this.post(`/admin/categories/${categoryId}/sub-categories`, data)
  }

  async updateSubCategory(id: number, data: any) {
    return await this.put(`/admin/sub-categories/${id}`, data)
  }

  async deleteSubCategory(id: number) {
    return await this.delete(`/admin/sub-categories/${id}`)
  }
}
