import { useToast } from 'vue-toastification'

export default defineNuxtPlugin(() => {
  const toast = useToast()
  
  return {
    provide: {
      toast
    }
  }
})
