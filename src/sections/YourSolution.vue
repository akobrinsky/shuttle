<template>
  <EventTable />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useDateStore } from '@/stores/date.store'
import EventTable from '@/components/EventTable.vue'

const dateStore = useDateStore()

onBeforeMount(() => {
  dateStore.initDateStore()
})
</script>
