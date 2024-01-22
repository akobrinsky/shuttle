<template>
  <div class="text-center flex items-center">
    <span class="mr-1">{{ formattedDate }}</span>
    <CalendarDaysIcon class="h-6 w-6 text-gray-400 inline-block" />
  </div>
</template>

<script setup>
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    default: null
  }
})

const formattedDate = computed(() => {
  if (props.date) {
    const date = new Date(props.date)
    return date.toLocaleDateString()
  }
  return null
})
</script>
