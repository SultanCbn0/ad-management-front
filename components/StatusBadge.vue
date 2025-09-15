<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        :class="statusClass">
    {{ statusText }}
  </span>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['pending', 'approved', 'rejected'].includes(value)
  }
})

const statusClass = computed(() => {
  switch (props.status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const statusText = computed(() => {
  switch (props.status) {
    case 'approved':
      return 'Onaylandı'
    case 'pending':
      return 'Beklemede'
    case 'rejected':
      return 'Reddedildi'
    default:
      return 'Bilinmiyor'
  }
})
</script>
