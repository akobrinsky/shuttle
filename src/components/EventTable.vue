<template>
  <div class="flex items-center justify-between mb-4">
    <h1 class="flex-auto text-3xl font-bold text-slate-600">Significant Dates</h1>
    <button class="rounded bg-primary text-white py-1 px-3 mr-2" @click="dateStore.resetStore()">
      <div class="flex items-center">
        <span class="mr-1">Reset Data</span>
        <ArrowUturnLeftIcon class="h-4 w-4" />
      </div>
    </button>
    <button class="rounded bg-primary text-white py-1 px-3" @click="onAddEvent">
      <div class="flex items-center">
        <span class="mr-1">Add Event</span>
        <PlusIcon class="h-4 w-4" />
      </div>
    </button>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th v-for="{ sortable, name, label } in headerCells" :key="name" class="px-6 py-3">
            <div
              class="flex items-center select-none"
              :class="{
                'cursor-pointer': sortable,
                'text-green-700': sortedColumn === name
              }"
              @click="onColumnSort({ name: name })"
            >
              <span class="mr-1">{{ label }}</span>
              <ArrowUpIcon
                v-if="sortable"
                class="h-3 w-3"
                :class="{
                  'text-gsreen-700': sortedColumn === name,
                  'rotate-180': sortedColumn === name && sortDirection === 'desc'
                }"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="date in dateStore.dateList"
          :key="date.id"
          :date="date"
          @edit:event="onEditEvent"
          @changed:active="onActiveChange"
        />
      </tbody>
    </table>
  </div>
  <EventModal :visible="editModalVisible" :date-info="eventToEdit" @cancel="onCancel" />
</template>

<script setup>
import TableRow from '@/components/TableRow.vue'
import EventModal from '@/components/EventModal.vue'
import { useDateStore } from '@/stores/date.store'
import { ArrowUpIcon, PlusIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'

const dateStore = useDateStore()

const editModalVisible = ref(false)
const eventToEdit = ref(null)
const sortedColumn = ref('date')
const sortDirection = ref('asc')
const sortedEvents = ref([])

const headerCells = [
  {
    label: 'Event Name',
    name: 'name',
    sortable: true
  },
  {
    label: 'Date',
    name: 'date',
    sortable: true
  },
  {
    label: 'Relationship',
    name: 'relatedPerson',
    sortable: true
  },
  {
    label: 'Notes',
    name: 'notes'
  },
  {
    label: 'Active',
    name: 'active'
  }
]

const dateComparator = (a, b) => {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  if (sortDirection.value === 'asc') {
    return dateA - dateB
  } else {
    return dateB - dateA
  }
}

const nameComparator = (a, b) => {
  return sortDirection.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
}

const relationshipComparator = (a, b) => {
  const { relatedPerson: aRelatedPerson } = a
  const { relatedPerson: bRelatedPerson } = b

  return sortDirection.value === 'asc'
    ? aRelatedPerson.lastName.localeCompare(bRelatedPerson.lastName)
    : bRelatedPerson.lastName.localeCompare(aRelatedPerson.lastName)
}

const getComparator = (column) => {
  return {
    date: dateComparator,
    name: nameComparator,
    relatedPerson: relationshipComparator
  }[column]
}

watch(
  [sortDirection, sortedColumn, dateStore.dateList],
  () => {
    const comparator = getComparator(sortedColumn.value)
    sortedEvents.value = dateStore.dateList.sort(comparator)
  },
  { immediate: true }
)

const onActiveChange = (event) => {
  dateStore.toggleEventActive(event.id)
}

const onEditEvent = (id) => {
  editModalVisible.value = true
  eventToEdit.value = dateStore.dateList.find((date) => date.id === id)
}

const onCancel = () => {
  editModalVisible.value = false
  eventToEdit.value = null
}

const onAddEvent = () => {
  editModalVisible.value = true
  eventToEdit.value = null
}

const onColumnSort = ({ name }) => {
  sortedColumn.value = name
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}
</script>
