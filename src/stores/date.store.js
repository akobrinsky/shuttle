import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getData, getPeople, resetData, saveData, saveDates } from '@/mock-api/api'

export const useDateStore = defineStore('dates', () => {
  const dateList = ref([])
  const relatedPersonList = ref([])

  const initDateStore = () => {
    const dates = getData()

    dateList.value = dates.map((date, idx) => ({ ...date, idx }))
    relatedPersonList.value = getPeople()
  }

  const toggleEventActive = (eventId) => {
    const contactToEdit = dateList.value.find((date) => date.id === eventId)
    contactToEdit.active = !contactToEdit.active

    saveData(eventId, contactToEdit)
  }

  const updateDate = (dateUUID, updatedDate) => {
    const spliceIdx = dateList.value.findIndex((date) => date.id === dateUUID)

    dateList.value[spliceIdx] = updatedDate

    saveData(dateUUID, updatedDate)
  }

  const addEvent = (event) => {
    const fakeId = `${dateList.value.length}_${event.name.replace(/\s/g, '')}`

    dateList.value.push({
      ...event,
      id: fakeId
    })

    saveDates(dateList.value)
  }

  const removeDate = (dateIds) => {
    const deletionLookup = dateIds.reduce((acc, currentUUID) => {
      acc[currentUUID] = true
      return acc
    }, {})

    const filteredDates = dateList.value.filter((date) => !deletionLookup[date.id])
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
    toggleEventActive,
    removeDate,
    updateDate,
    resetStore
  }
})
