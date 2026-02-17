<script setup>

import {onMounted, ref, watch} from "vue";

  const Time = ref(null);
  const startTimeShowMenu = ref(false);

  const emit = defineEmits(["update-time"]);
  const {Disabled, Label, Format = "24hr", Value} = defineProps({
    Disabled: Boolean,
    Label: String,
    Format: String,
  });
  
  onMounted(() => {
    Time.value = Value;
  })
  
  watch(Time, (time) => {
    console.log(time)
    emit('update-time', time);
  })

function clearTime() {
    Time.value = "";
}
  
</script>

<template>
  <v-text-field
      :model-value="Time"
      :label="Label"
      prepend-icon="mdi-clock-time-four-outline"
      :format="Format"
      :disabled="Disabled"
      clearable
      @click:clear="clearTime"
  >
    <v-menu
        v-model="startTimeShowMenu"
        :close-on-content-click="false"
        activator="parent"
        min-width="0"
    >
      <v-time-picker v-model="Time" :format="Format"></v-time-picker>
    </v-menu>
  </v-text-field>
</template>

<style scoped>

</style>