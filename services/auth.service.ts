import { ApiService } from '@/services/api'

export interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export class AuthService extends ApiService {
  async login(credentials: LoginRequest) {
    return await this.post('/login', credentials)
  }

  async register(data: RegisterRequest) {
    return await this.post('/register', data)
  }

  async logout() {
    return await this.post('/logout')
  }

  async me() {
    return await this.get<User>('/me')
  }

  async refresh() {
    return await this.post('/refresh')
  }
}
