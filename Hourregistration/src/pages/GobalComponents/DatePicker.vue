<script setup>
import { ref, computed } from 'vue'

// 1. Parse your ISO string into a real Date object immediately
const props = defineProps({
  date: "2026-02-24T08:45:00Z"
})

const menu = ref(false)
const pickerDate = ref(new Date(props.date))

// 2. Create a computed property for the text field display
const formattedDate = computed(() => {
  if (!pickerDate.value) return ''
  // Returns local date format (e.g., 2/24/2026)
  return new Date(pickerDate.value).toLocaleDateString()
})
</script>

<template>
  <v-text-field
      v-model="formattedDate"
      label="Select Date"
      prepend-icon="mdi-calendar"
      readonly
      v-bind="menu"
  >
    <v-menu
        :close-on-content-click="false"
        activator="parent"
        v-model="menu"
    >
      <v-date-picker
          v-model="pickerDate"
          @update:model-value="menu = false; $emit('update:date', pickerDate)"
      ></v-date-picker>
    </v-menu>
  </v-text-field>
</template>