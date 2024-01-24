<template>
  <div v-if="visible" class="date-modal-wrapper">
    <div class="date-modal-content">
      <h1 class="text-2xl mb-3">{{ inEditMode ? 'Edit' : 'Create' }} Event</h1>
      <form class="flex flex-col gap-y-4" @submit.prevent="onSave">
        <div>
          <label for="event-name">Event Name *</label>
          <input
            id="event-name"
            v-model.trim="eventName"
            type="text"
            name="event-name"
            placeholder="Enter event name"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label for="event-date">Event Date *</label>
          <input
            id="event-date"
            v-model="eventDate"
            type="date"
            name="event-date"
            pattern="\d{4}-\d{2}-\d{2}"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label for="relationship">Relationship *</label>
          <select
            id="relationship"
            v-model="selectedRelation"
            name="event-relationship"
            required
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
          >
            <option disabled :value="null" selected>Choose relation</option>
            <option
              v-for="relation in dateStore.relatedPersonList"
              :key="relation.firstName"
              :value="relation"
            >
              {{ relation.firstName }} {{ relation.lastName }}
            </option>
          </select>
        </div>
        <div>
          <label for="event-notes">Notes</label>
          <textarea
            id="event-notes"
            v-model.trim="eventNotes"
            name="event-notes"
            placeholder="Enter notes"
            :rows="5"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="flex items-center">
          <label for="event-active" class="!mb-0 !mr-2">Active</label>
          <input
            id="event-active"
            v-model="eventIsActive"
            name="event-active"
            type="checkbox"
            class="cursor-pointer"
          />
        </div>

        <div class="flex gap-2">
          <button
            class="w-1/2 text-gray-500 bg-white rounded-lg border border-gray-400 hover:border-gray-700"
            @click="onClose"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-1/2 text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useDateStore } from '@/stores/date.store'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dateInfo: {
    type: Object,
    default: null
  }
})

const dateStore = useDateStore()
const selectedRelation = ref(null)
const eventName = ref(null)
const eventDate = ref(null)
const eventIsActive = ref(true)
const eventNotes = ref('')

const inEditMode = computed(() => !!props.dateInfo)

watchEffect(() => {
  if (props.dateInfo) {
    selectedRelation.value = props.dateInfo?.relatedPerson || ''
    eventName.value = props.dateInfo?.name || ''
    eventIsActive.value = props.dateInfo?.active
    eventNotes.value = props.dateInfo?.notes || ''

    if (props.dateInfo?.date) {
      const dateWithOffset = new Date(props.dateInfo.date)
      const timezoneOffsetMs = dateWithOffset.getTimezoneOffset() * 60 * 1000
      const dateWithOffsetAdjusted = new Date(dateWithOffset.getTime() + timezoneOffsetMs)

      eventDate.value = dateWithOffsetAdjusted.toISOString().substring(0, 10)
    }
  }
})

const emit = defineEmits(['cancel', 'save'])

const clearState = () => {
  selectedRelation.value = null
  eventName.value = null
  eventDate.value = null
  eventIsActive.value = true
  eventNotes.value = null
}

const onClose = () => {
  emit('cancel')
  clearState()
}

function onSave() {
  const date = new Date(eventDate.value).toISOString()

  if (!selectedRelation.value) {
    alert('Please select a relation')
    return
  }

  const eventPayload = {
    date,
    id: props.dateInfo?.id,
    name: eventName.value,
    relatedPerson: selectedRelation.value,
    notes: eventNotes.value,
    active: eventIsActive.value
  }

  if (inEditMode.value) {
    dateStore.updateDate(eventPayload.id, eventPayload)
  } else {
    dateStore.addEvent(eventPayload)
  }

  onClose()
}
</script>

<style scoped lang="pcss">
.date-modal-wrapper {
  @apply fixed bg-black bg-opacity-50 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex justify-center items-center w-full h-full max-h-full z-50 target:opacity-100;
}

.date-modal-content {
  @apply p-4 md:max-w-md h-full md:h-auto w-full md:w-1/2 bg-white md:rounded-2xl;
}

label {
  @apply block mb-2 text-sm font-medium text-gray-900;
}

select {
  @apply appearance-none pr-8;
  background: no-repeat
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")
    right 0.5rem center / 1.5em 1.5em;
}
</style>
