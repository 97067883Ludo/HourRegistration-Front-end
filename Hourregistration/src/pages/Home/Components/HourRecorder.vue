<script setup>
import {computed, onMounted, ref} from "vue";
import { storeToRefs } from 'pinia';
import {useProjectState} from "@/state/ProjectState.js";
import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
import {useHourRecorderState} from "@/state/HourRecorderState.js";

const projects = ref([]);
const LoadingProjects = ref(false)
const projectStore = useProjectState();
const HourRecorderStore = useHourRecorderState();
const {StartTime, EndTime, Running} = storeToRefs(HourRecorderStore);
const selectedProject = ref(null)
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
  StartTime.value = new Date(time);
}

function SaveEndTime(time) {
  if (time === "" || time === undefined) {
    EndTime.value = "";
    return;
  }
  EndTime.value = new Date(time);
}

function Record() {
  let date = new Date(Date.now());

  if (Running) {
    StartTime.value = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } else {
    EndTime.value = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    SaveRecording();
  }

  Running.value = !Running.value;
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
      v-model="selectedProject"
  ></v-autocomplete>
  
  <TimePicker @update-time="Time => SaveStartTime(Time)"  :Disabled="selectedProject === null || selectedProject === undefined" Label="Start tijd" :Value="StartTime"></TimePicker>

  <TimePicker @update-time="time => SaveEndTime(time)" :Disabled="selectedProject === null || selectedProject === undefined" Label="End tijd" :Value="EndTime"></TimePicker>
  
  <v-btn v-if="StartAndEndTimeAreFilled || Running" @click="Record" :disabled="selectedProject === null || selectedProject === undefined" color="primary" style="margin-left: 10px">
    <span >{{Running ? "Stop": "Start"}}</span>
  </v-btn>

  <v-btn v-if="!StartAndEndTimeAreFilled && !Running" @click="" :disabled="selectedProject === null || selectedProject === undefined || StartTime === '' || EndTime === ''" color="primary" style="margin-left: 10px">
    <span>Save</span>
  </v-btn>
  
</template>


<style scoped>

</style>