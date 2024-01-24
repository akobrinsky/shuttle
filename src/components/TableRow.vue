<template>
  <tr data-testid="event-row">
    <td>
      <div class="flex items-center font-medium text-gray-900 whitespace-nowrap">
        <button
          class="font-medium text-gray-500 p-2 hover:bg-gray-200 rounded-md mr-1"
          data-testid="edit-event-button"
          @click="emit('edit:event', date.id)"
        >
          <PencilSquareIcon class="h-3.5 w-3.5" />
        </button>
        <span>{{ date.name }}</span>
      </div>
    </td>
    <td><ContactDateCell :date="date.date" /></td>
    <td><ContactRelationshiopCell :related-person="date.relatedPerson" /></td>
    <td class="min-w-80">{{ date.notes }}</td>
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
      <button
        class="font-medium text-red-600 p-2 hover:bg-gray-200 rounded-md"
        data-testid="remove-event-button"
        @click="dateStore.removeDate([date.id])"
      >
        <TrashIcon class="h-3.5 w-3.5" />
      </button>
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
  @apply p-3;
}
</style>
