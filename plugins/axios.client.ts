import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Axios instance oluştur
  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  api.interceptors.request.use((config) => {
    const token = useCookie('auth_token').value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
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
      axiosApi: api
    }
  }
})
