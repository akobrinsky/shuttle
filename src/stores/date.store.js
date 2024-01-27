import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getData, getPeople, resetData, saveData, saveDates, addData } from '@/mock-api/api'

export const useDateStore = defineStore('dates', () => {
  const dateList = ref([])
  const relatedPersonList = ref([])

  const initDateStore = () => {
    /* originalIndex is a quick hacky way to have the right index for reference with the sorting in place
    With more time, I'd bring the sorting to the store so the list in state's indices can be trusted */
    dateList.value = getData().map((date, originalIndex) => ({ ...date, originalIndex }))
    relatedPersonList.value = getPeople()
  }

  const findOrEditById = (id, updatedEvent) => {
    const index = dateList.value.findIndex((date) => date.id === id)
    if (index === -1) {
      throw new Error(`Could not find date with id ${id}`)
    }
    if (updatedEvent) {
      dateList.value[index] = updatedEvent
    } else {
      return dateList.value[index]
    }
  }

  const findOrEditByIndex = (index, updatedEvent) => {
    if (updatedEvent) {
      dateList.value[index] = updatedEvent
    } else {
      const result = dateList.value[index]
      if (!result) {
        throw new Error(`Could not find date with index ${index}`)
      }
      return dateList.value[index]
    }
  }

  const findByIndexOrId = (indexOrId, updatedEvent) => {
    return typeof indexOrId === 'number'
      ? findOrEditByIndex(indexOrId, updatedEvent)
      : findOrEditById(indexOrId, updatedEvent)
  }

  const toggleEventActive = (indexOrId) => {
    const eventToEdit = findByIndexOrId(indexOrId)

    if (eventToEdit) {
      eventToEdit.active = !eventToEdit.active
      saveData(indexOrId, eventToEdit)
    }
  }

  const updateDate = (dateUUID, updatedEvent) => {
    if (typeof dateUUID === 'number') {
      findOrEditByIndex(dateUUID, updatedEvent)
    } else {
      findOrEditById(dateUUID, updatedEvent)
    }

    saveData(dateUUID, updatedEvent)
  }

  const addEvent = (event) => {
    const eventWithOriginalIndex = {
      ...event,
      originalIndex: dateList.value.length
    }
    dateList.value.push(eventWithOriginalIndex)

    addData(event)
  }

  const removeDate = (indexOrId) => {
    const eventToDelete = findByIndexOrId(indexOrId)
    const filteredDates = dateList.value.filter(({ id }, index) => {
      if (!id) return index !== eventToDelete.originalIndex
      return id !== eventToDelete.id
    })
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
    findByIndexOrId,
    initDateStore,
    relatedPersonList,
    removeDate,
    resetStore,
    toggleEventActive,
    updateDate
  }
})
