import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getData, getPeople, resetData, saveData, saveDates, addData } from '@/mock-api/api'

export const useDateStore = defineStore('dates', () => {
  const dateList = ref([])
  const relatedPersonList = ref([])

  const initDateStore = () => {
    dateList.value = getData()
    relatedPersonList.value = getPeople()
  }

  const findEventById = (eventId) => {
    const index = dateList.value.findIndex((date) => date.id === eventId)

    if (index === -1) {
      throw new Error(`Could not find date with id ${eventId}`)
    }

    return dateList.value[index]
  }

  const editEventById = (eventId, payload) => {
    const index = dateList.value.findIndex((date) => date.id === eventId)

    if (index === -1) {
      throw new Error(`Could not find date with id ${eventId}`)
    }

    dateList.value[index] = payload
  }

  const toggleEventActive = (indexOrId) => {
    const eventToEdit = findEventById(indexOrId)

    if (eventToEdit) {
      eventToEdit.active = !eventToEdit.active
      saveData(indexOrId, eventToEdit)
    }
  }

  const updateDate = (eventId, payload) => {
    if (!eventId) throw new Error('id is required')

    editEventById(eventId, payload)

    saveData(eventId, payload)
  }

  const addEvent = (event) => {
    dateList.value.push(event)

    addData(event)
    initDateStore()
  }

  const removeDate = (indexOrId) => {
    const eventToDelete = findEventById(indexOrId)
    const filteredDates = dateList.value.filter((date) => date.id !== eventToDelete.id)
    dateList.value = filteredDates
    saveDates(filteredDates)
  }

  const resetStore = () => {
    resetData()
    initDateStore()
  }

  return {
    addEvent,
    dateList,
    initDateStore,
    relatedPersonList,
    removeDate,
    findEventById,
    resetStore,
    toggleEventActive,
    updateDate
  }
})
