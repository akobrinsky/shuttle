import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDateStore = defineStore('dates', () => {
  const dateList = ref([])
  return { dateList }
})
