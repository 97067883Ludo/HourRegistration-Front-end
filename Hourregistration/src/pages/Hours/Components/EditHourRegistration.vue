<script setup>
import {ref, watch} from "vue";
import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
import {DateToTimeOnly} from "@/globalfunctions.js";
import DatePicker from "@/pages/GobalComponents/DatePicker.vue";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";

const props = defineProps({
  hourRegistration: Object
})

const hourRegistrationStore = useHourRegistrationStore();

const startTime = ref(props.hourRegistration.startTime)
const endTime = ref(props.hourRegistration.endTime)
const date = ref(props.hourRegistration.startTime)

console.log(props.hourRegistration)

watch(date, (newValue) => {
  startTime.value = setDate(startTime.value)
  endTime.value = setDate(endTime.value)
})

function setDate(dateTime) {
  let updateDateTime = new Date(dateTime);
  let newDate = new Date(date.value);
  updateDateTime.setDate(newDate.getDate())
  dateTime = updateDateTime;
  return dateTime;
}

async function saveEntry() {
  await hourRegistrationStore.UpdateHourRegistration({
    Id: props.hourRegistration.id,
    UserId: props.hourRegistration.user.id,
    ProjectId: props.hourRegistration.project.id,
    StartTime: GetIsoTime(startTime.value),
    EndTime: GetIsoTime(endTime.value)
  });
}

function GetIsoTime(dateTime) {
  let date = new Date(dateTime);
  return date.toISOString();
}

function SetNewStartTime(newTime) {
  startTime.value = SetNewTime(newTime);
}

function SetNewEndTime(newTime) {
  endTime.value = SetNewTime(newTime);
}

function SetNewTime(timeString) {
  let dateTime = new Date(date.value);
  dateTime.setHours(timeString.split(":")[0], timeString.split(":")[1], 0, 0);
  return dateTime;
}


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
          <DatePicker @update:date="(newdate) => {date = newdate}" :date="date"></DatePicker>
          <h4>Start tijd</h4>
          <TimePicker @updateTime="(newtime) => {SetNewStartTime(newtime)}" :Value="DateToTimeOnly(startTime)"></TimePicker>
          <h4>End tijd</h4>
          <TimePicker @updateTime="(newtime) => {SetNewEndTime(newtime)}" :Value="DateToTimeOnly(endTime)"></TimePicker>
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
              @click="async () => {await saveEntry(); $emit('itemChanged'); isActive.value = false;}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>