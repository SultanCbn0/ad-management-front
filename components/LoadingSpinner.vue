<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="inline-block animate-spin rounded-full border-b-2" :class="spinnerClass"></div>
    <span v-if="showText" class="ml-2 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showText: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Yükleniyor...'
  },
  containerClass: {
    type: String,
    default: ''
  }
})

const spinnerClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }
  
  return `${sizeClasses[props.size]} border-blue-600`
})
</script>
