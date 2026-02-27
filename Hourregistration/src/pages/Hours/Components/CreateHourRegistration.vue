<script setup>
import {onMounted, ref, watch} from "vue";
import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
import {DateToTimeOnly} from "@/globalfunctions.js";
import DatePicker from "@/pages/GobalComponents/DatePicker.vue";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {useUserStore} from "@/state/UserState.js";
import {useProjectState} from "@/state/ProjectState.js";

const props = defineProps({
  Project: Object,
  cardTitle: String,
  date: String
})

const hourRegistrationStore = useHourRegistrationStore();
const userStore = useUserStore();
const projectStore = useProjectState();

const startTime = ref("")
const endTime = ref("")
const date = ref(new Date(Date.now()))
const project = ref(null);
const projects = ref([]);

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
  await hourRegistrationStore.CreateHourRegistration({
    ProjectId: projects.value.find(x => x.name === project.value).id,
    UserId: userStore.Id,
    StartTime: GetIsoTime(startTime.value),
    EndTime: GetIsoTime(endTime.value)
  });
  project.value = null;
  projects.value = [];
  startTime.value = "";
  endTime.value = "";
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

onMounted(() => {
  projectStore.GetAllProjects().then(data => {
    console.log(data.data)
    projects.value = data.data;
  });
  
  if(props.date === undefined) {
    return;
  }
  date.value = new Date(props.date)
})

</script>

<template>
  <v-dialog max-width="500">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          variant="text"
          icon="mdi-clock-plus-outline"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.cardTitle">
        <v-card-text>
          <h4>Project</h4>
          <v-autocomplete  prepend-icon="mdi-account-tie" :items="projects.map(x => x.name)" v-model="project" ></v-autocomplete>
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
              @click="async () => {await saveEntry(); $emit('itemCreated'); isActive.value = false;}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>