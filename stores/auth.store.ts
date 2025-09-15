import { defineStore } from 'pinia'
import type { User } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie('auth_token', { 
    default: () => null,
    secure: true,
    sameSite: 'lax'
  })
  const isTokenValid = () => {
    if (!token.value) return false
    
    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp > currentTime
    } catch (error) {
      console.error('Error decoding token:', error)
      return false
    }
  }

  const isAuthenticated = computed(() => !!token.value && isTokenValid())

  const login = async (email: string, password: string) => {
    try {
      const { AuthService } = await import('@/services/auth.service')
      const authService = new AuthService()
      const response = await authService.login({
        email,
        password
      })
      
      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        return { success: true, message: response.message }
      }
      
      return { success: false, message: response.message }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || 'Giriş yapılırken bir hata oluştu' 
      }
    }
  }

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const { AuthService } = await import('@/services/auth.service')
      const authService = new AuthService()
      const response = await authService.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      })
      
      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        return { success: true, message: response.message }
      }
      
      return { success: false, message: response.message }
    } catch (error: any) {
      console.error('Register error:', error)
      return { 
        success: false, 
        message: error.message || 'Kayıt olurken bir hata oluştu' 
      }
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        const { AuthService } = await import('@/services/auth.service')
        const authService = new AuthService()
        await authService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      user.value = null
    }
  }

  const fetchUser = async () => {
    if (!token.value) {
      return
    }
    
    try {
      const config = useRuntimeConfig()
      const response = await $fetch(`${config.public.apiBase}/me`, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })
      
      if (response && response.success && response.data) {
        user.value = response.data as User
      } else {
        token.value = null
        user.value = null
      }
    } catch (error) {
      token.value = null
      user.value = null
    }
  }

  const initialize = async () => {
    if (!token.value) {
      user.value = null
      return
    }
    
    if (!isTokenValid()) {
      token.value = null
      user.value = null
      return
    }
    
    try {
      await fetchUser()
    } catch (error) {
      token.value = null
      user.value = null
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    initialize
  }
})
