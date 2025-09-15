import type { AxiosResponse } from 'axios'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export class ApiService {
  private api: any

  constructor() {
    const { $axiosApi } = useNuxtApp()
    this.api = $axiosApi
  }


  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.get(url, { params })
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.post(url, data)
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.put(url, data)
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.delete(url)
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  async upload<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  private handleError(error: any): ApiResponse {
    if (error.response?.data) {
      return error.response.data
    }

    return {
      success: false,
      message: error.message || 'Bir hata oluştu'
    }
  }
}
