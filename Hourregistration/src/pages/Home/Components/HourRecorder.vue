<script setup>
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from 'pinia';
import {useProjectState} from "@/state/ProjectState.js";
import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
import {useHourRecorderState} from "@/state/HourRecorderState.js";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {useUserStore} from "@/state/UserState.js";

const projects = ref([]);
const LoadingProjects = ref(false)
const HourRegistrationStore = useHourRegistrationStore();
const projectStore = useProjectState();
const HourRecorderStore = useHourRecorderState();
const UserStore = useUserStore();
const {Id} = storeToRefs(UserStore);
const {StartTime, EndTime, Running, ProjectId, ProjectName} = storeToRefs(HourRecorderStore);
const StartAndEndTimeAreFilled = computed(() => StartTime.value === "" && EndTime.value === "");

onMounted(async () => {
 await getAllProjects();
})

async function getAllProjects() {
  LoadingProjects.value = true;
  let result = await projectStore.GetAllProjects();
  projects.value = result.data;
  LoadingProjects.value = false;
}

function SaveStartTime(time) {
  if (time === "" || time === undefined) {
    StartTime.value = "";
    return;
  }
  const today = new Date().toISOString().split('T')[0]; // "2026-02-18"
  const dateObject = new Date(`${today}T${time}:00`);
  StartTime.value = dateObject.toString();
}

function SaveEndTime(time) {
  if (time === "" || time === undefined) {
    EndTime.value = "";
    return;
  }
  const today = new Date().toISOString().split('T')[0]; // "2026-02-18"
  const dateObject = new Date(`${today}T${time}:00`);
  EndTime.value = dateObject.toString();
}

function SaveRecording() {
  HourRegistrationStore.SaveRecording(ProjectName.value, ProjectId.value, Id.value, StartTime.value, EndTime.value);
}

function clearFields() {
  ProjectName.value = null;
  StartTime.value = "";
  EndTime.value = "";
  Running.value = false;
  ProjectId.value = "";
}

function Record() {
  let date = new Date(Date.now());
  Running.value = !Running.value;

  if (Running.value) {
    StartTime.value = date.toString();
  } else {
    EndTime.value = date.toString();
    SaveRecording();
    clearFields();
  }
}

function ProjectNameChanged(value) {
  projects.value.forEach(project => {
    if (project.name === value) {
      ProjectId.value = project.id;
    }
  })
}

function getDisplayTime(time) {
  if (time === null || time === undefined || time === "") {
    return "";
  }
  let datetime = new Date(time);
  return datetime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
}

//TODO: Disabled van save knop computed van maken.
</script>

<template>
  <v-autocomplete
      :loading="LoadingProjects"
      :disabled="LoadingProjects || Running"
      clearable
      variant="outlined"
      label="Selecteer project"
      :items="projects.map(project => project.name)"
      v-model="ProjectName"
      @update:modelValue="ProjectNameChanged"
  ></v-autocomplete>
  
  <TimePicker @update-time="Time => SaveStartTime(Time)" :Disabled="ProjectName === null || ProjectName === undefined || Running" Label="Start tijd" :Value="getDisplayTime(StartTime)"></TimePicker>

  <TimePicker @update-time="time => SaveEndTime(time)" :Disabled="ProjectName === null || ProjectName === undefined || Running" Label="Eind tijd" :Value="getDisplayTime(EndTime)"></TimePicker>
  
  <v-btn v-if="StartAndEndTimeAreFilled || Running" @click="Record" :disabled="ProjectName === null || ProjectName === undefined" color="primary" style="margin-left: 10px">
    <span >{{Running ? "Stop": "Start"}}</span>
  </v-btn>

  <v-btn v-if="!StartAndEndTimeAreFilled && !Running" @click="" :disabled="ProjectName === null || ProjectName === undefined || StartTime === '' || EndTime === ''" color="primary" style="margin-left: 10px">
    <span>Save</span>
  </v-btn>
  
</template>

<style scoped>

</style>