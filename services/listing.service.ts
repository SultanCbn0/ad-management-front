import { ApiService, type PaginatedResponse } from '@/services/api'

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  is_active: boolean
  sub_categories?: SubCategory[]
}

export interface SubCategory {
  id: number
  name: string
  slug: string
  description?: string
  is_active: boolean
  category?: Category
}

export interface ListingImage {
  id: number
  image_path: string
  image_name: string
  is_primary: boolean
  sort_order: number
  full_url: string
}

export interface Listing {
  id: number
  unique_number: string
  title: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  city: string
  district: string
  created_at: string
  updated_at: string
  approved_at?: string
  category?: Category
  sub_category?: SubCategory
  images?: ListingImage[]
  user?: any
  approved_by?: any
}

export interface CreateListingRequest {
  title: string
  description: string
  category_id: number
  sub_category_id: number
  city: string
  district: string
  image: File
}

export interface UpdateListingRequest {
  title?: string
  description?: string
  category_id?: number
  sub_category_id?: number
  city?: string
  district?: string
  image?: File
}

export interface ListingFilters {
  category_id?: number
  sub_category_id?: number
  city?: string
  district?: string
  search?: string
  per_page?: number
  page?: number
}

export class ListingService extends ApiService {
  async getListings(filters: ListingFilters = {}) {
    return await this.get<PaginatedResponse<Listing>>('/listings', filters)
  }

  async getListing(id: number) {
    return await this.get<Listing>(`/listings/${id}`)
  }

  async createListing(data: any) {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category_id', data.category_id.toString())
    formData.append('sub_category_id', data.sub_category_id.toString())
    formData.append('city', data.city)
    formData.append('district', data.district)
    formData.append('image', data.image)
    
    if (data.unique_number) {
      formData.append('unique_number', data.unique_number)
    }

    return await this.upload<Listing>('/listings', formData)
  }

  async updateListing(id: number, data: UpdateListingRequest) {
    const formData = new FormData()
    
    if (data.title) formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    if (data.category_id) formData.append('category_id', data.category_id.toString())
    if (data.sub_category_id) formData.append('sub_category_id', data.sub_category_id.toString())
    if (data.city) formData.append('city', data.city)
    if (data.district) formData.append('district', data.district)
    if (data.image) formData.append('image', data.image)

    return await this.put<Listing>(`/listings/${id}`, formData)
  }

  async deleteListing(id: number) {
    return await this.delete(`/listings/${id}`)
  }

  async getMyListings(filters: ListingFilters = {}) {
    return await this.get<PaginatedResponse<Listing>>('/my-listings', filters)
  }

  async getCategories() {
    return await this.get<Category[]>('/categories')
  }

  async getCategory(id: number) {
    return await this.get<Category>(`/categories/${id}`)
  }

  async generateListingNumber() {
    return await this.get<{ unique_number: string }>('/listings/generate-number')
  }
}
