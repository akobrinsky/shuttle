<template>
  <tr data-testid="event-row">
    <td class="font-medium text-gray-900 whitespace-nowrap">
      {{ date.name }}
    </td>
    <td><ContactDateCell :date="date.date" /></td>
    <td><ContactRelationshiopCell :related-person="date.relatedPerson" /></td>
    <td>{{ date.notes }}</td>
    <td>
      <input
        :id="`event-active-${date.id}`"
        v-model="isActive"
        type="checkbox"
        class="cursor-pointer"
        data-testid="active-checkbox"
        @input="emit('changed:active', date)"
      />
    </td>
    <td>
      <div class="flex gap-1">
        <button
          class="font-medium text-gray-600 p-2 hover:bg-gray-200 rounded-md"
          data-testid="edit-event-button"
          @click="emit('edit:event', date.id)"
        >
          <PencilSquareIcon class="h-3.5 w-3.5" />
        </button>
        <button
          class="font-medium text-red-600 p-2 hover:bg-gray-200 rounded-md"
          data-testid="remove-event-button"
          @click="dateStore.removeDate([date.id])"
        >
          <TrashIcon class="h-3.5 w-3.5" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import ContactDateCell from '@/components/ContactDateCell.vue'
import ContactRelationshiopCell from '@/components/ContactRelationshiopCell.vue'
import { useDateStore } from '@/stores/date.store'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

const dateStore = useDateStore()
const props = defineProps({
  date: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['changed:active', 'edit:event'])
const isActive = ref(false)

watchEffect(() => {
  isActive.value = props.date?.active
})
</script>
<style scoped lang="pcss">
tr {
  @apply bg-white border-b  hover:bg-gray-50;
}

td {
  @apply px-6 py-4;
}
</style>
