import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  api.interceptors.request.use(
    (config) => {
      const token = useCookie('auth_token')
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        const token = useCookie('auth_token')
        token.value = null
        navigateTo('/auth/login')
      }
      
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
