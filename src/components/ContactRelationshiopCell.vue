<template>
  <div class="text-center flex items-center w-44">
    <img
      :src="relatedPerson?.avatar"
      :alt="relatedPerson?.name + ' image'"
      class="h-8 w-8 rounded-full mr-2"
    />
    <span class="mr-1 truncate">{{ firstOrFullName }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  relatedPerson: {
    type: Object,
    default: null
  }
})

const firstOrFullName = computed(() =>
  props.relatedPerson?.lastName
    ? `${props.relatedPerson.firstName} ${props.relatedPerson.lastName}`
    : props.relatedPerson?.firstName
)
</script>
