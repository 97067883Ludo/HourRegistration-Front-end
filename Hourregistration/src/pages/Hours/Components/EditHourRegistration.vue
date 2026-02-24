<script setup>
import {ref} from "vue";
import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
import {DateToTimeOnly} from "@/globalfunctions.js";
import DatePicker from "@/pages/GobalComponents/DatePicker.vue";

const props = defineProps({
  hourRegistration: Object
})

const startTime = ref(props.hourRegistration.startTime)
const endTime = ref(props.hourRegistration.endTime)
const date = ref(props.hourRegistration.startTime)

console.log(props.hourRegistration)

</script>

<template>
  <v-dialog max-width="500">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon="mdi-pencil" variant="text" v-bind="activatorProps"></v-btn>

    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.cardTitle">
        <v-card-text>
          <h4>Datum</h4>
          <DatePicker :date="date"></DatePicker>
          <h4>Start tijd</h4>
          <TimePicker :Value="DateToTimeOnly(startTime)"></TimePicker>
          <h4>End tijd</h4>
          <TimePicker :Value="DateToTimeOnly(endTime)"></TimePicker>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Annuleren"
              @click="isActive.value = false"
          ></v-btn>
          <v-btn
              text="Opslaan"
              color="green"
              @click="$emit('onDeleteConfirm'), isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>