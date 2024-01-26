<template>
  <div class="block md:flex items-center justify-between mb-4">
    <h1 class="flex-auto text-3xl font-bold text-slate-600 mb-4 md:mb-0">Significant Dates</h1>
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
          <th
            v-for="{ sortable, name, label } in headerCells"
            :key="name"
            class="p-3"
            :class="{ '!px-0': name === 'active' }"
          >
            <div
              class="flex items-center select-none"
              :class="{
                'cursor-pointer': sortable,
                'text-green-700': sortedColumn === name && sortable
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
          v-for="date in sortedDates"
          :key="date.id"
          :date="date"
          @edit:event="onEditEvent"
        />
      </tbody>
    </table>
  </div>
  <EventModal
    :visible="editModalVisible"
    :date-info="eventToEdit"
    :index="eventEditIdx"
    @cancel="onCancel"
  />
</template>

<script setup>
import TableRow from '@/components/TableRow.vue'
import EventModal from '@/components/EventModal.vue'
import { useDateStore } from '@/stores/date.store'
import { ArrowUpIcon, PlusIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { sortBy } from 'lodash'
const dateStore = useDateStore()

const editModalVisible = ref(false)
const eventToEdit = ref(null)
const sortedColumn = ref('date')
const sortDirection = ref('desc')
const eventEditIdx = ref(null)

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
const relationshipComparator = (event) => event.relatedPerson?.name?.toLowerCase()
const titleComparator = (event) => event.name?.toLowerCase()

const getComparator = (column) => {
  return {
    date: 'date',
    name: titleComparator,
    relatedPerson: relationshipComparator
  }[column]
}

const sortedDates = computed(() => {
  const comparator = getComparator(sortedColumn.value)
  let sorted = sortBy(dateStore.dateList, comparator)

  if (sortDirection.value !== 'asc') {
    sorted = sorted.reverse()
  }

  return sorted
})

const onEditEvent = (indexOrId) => {
  if (typeof indexOrId === 'number') eventEditIdx.value = indexOrId

  try {
    eventToEdit.value = dateStore.findByIndexOrId(indexOrId)
    if (eventToEdit.value) editModalVisible.value = true
  } catch (err) {
    console.log(err)
  }
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
