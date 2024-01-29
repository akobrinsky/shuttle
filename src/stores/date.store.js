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
    const foundEvent = dateList.value.find((date) => date.id === eventId)

    if (!foundEvent) {
      throw new Error(`Could not find date with id ${eventId}`)
    }

    return foundEvent
  }

  const editEventById = (eventId, payload) => {
    const index = dateList.value.findIndex((date) => date.id === eventId)

    if (index === -1) {
      throw new Error(`Could not find date with id ${eventId}`)
    }

    dateList.value[index] = payload
  }

  const toggleEventActive = (eventId) => {
    const eventToEdit = findEventById(eventId)

    if (eventToEdit) {
      eventToEdit.active = !eventToEdit.active
      saveData(eventId, eventToEdit)
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

  const removeDate = (eventId) => {
    const eventToDelete = findEventById(eventId)
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
