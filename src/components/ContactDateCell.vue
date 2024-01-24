<template>
  <div class="text-center flex items-center">
    <span class="mr-1">{{ formattedDate }}</span>
    <CalendarDaysIcon class="h-4 w-4 text-gray-400 inline-block" />
  </div>
</template>

<script setup>
import { createDateWithOffset } from '@/utils'
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
    const date = createDateWithOffset(props.date)

    return date.toLocaleDateString('en-US')
  }
  return null
})
</script>
