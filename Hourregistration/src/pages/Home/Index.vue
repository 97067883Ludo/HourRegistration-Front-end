<script setup>

import {useProjectState} from "@/state/ProjectState.js";
import {ref, onMounted, watch} from "vue";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {useUserStore} from "@/state/UserState.js";
import HourRegistrationCard from "@/pages/Home/Components/HourRegistrationCard.vue";
import { storeToRefs } from 'pinia'; // Don't forget to import this!

const projectStore = useProjectState();
const hourRegistrationStore = useHourRegistrationStore();
const userStore = useUserStore();
let projects = [];
const selectedProject = ref(null)
const loadingItems = ref(true)
const startTimeShowMenu = ref(false)
const endTimeShowMenu = ref(false)
const StartTime = ref(null)
const EndTime = ref(null)
const running = ref(false)

const {RecordedItems} = storeToRefs(hourRegistrationStore)


const getAllProjects = async () => {
  let result = await projectStore.GetAllProjects();
  projects = hourRegistrationStore.projects = result.data
  loadingItems.value = false;
}

watch(selectedProject, (newValue, oldValue) => {
  let result = hourRegistrationStore.getProjectByName(newValue)
  if (result === undefined || result === null) {
    return;
  }
  hourRegistrationStore.ProjectId = result.id;
  // You can also place the logic directly here
});

onMounted(() => {
  getAllProjects();
  hourRegistrationStore.UserId = userStore.Id
  running.value = hourRegistrationStore.Running
  let project = hourRegistrationStore.getActiveProject();
  if (project === undefined) {
    console.log("sdf")
  }
  if (project != undefined || project != null) {
    selectedProject.value = project.name ?? ""
    let startTime = new Date( hourRegistrationStore.StartTime);
    let endTime = new Date( hourRegistrationStore.EndTime);
    StartTime.value = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    endTime.value = endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
})

function switchRecordingStatus() {
  let lastRunningState = running.value;
  if (running.value) {
    hourRegistrationStore.Running = false;
    running.value = hourRegistrationStore.Running;
    let date = new Date(Date.now());
    EndTime.value = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    hourRegistrationStore.EndTime = date;
  } else {
    hourRegistrationStore.Running = true;
    running.value = hourRegistrationStore.Running;
    let date = new Date(Date.now());
    StartTime.value = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    hourRegistrationStore.StartTime = date;
  }
  
  if (lastRunningState && !running.value) {
    hourRegistrationStore.extractData()
    clearRecording();
    console.log("recording time is done")
  }
}

function clearRecording() {
  selectedProject.value = null;
  StartTime.value = null;
  EndTime.value = null;
  running.value = false;
}

</script>

<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="width: 66%">
      <h1 style="margin-bottom: 10px">Uren registreren</h1>
      
      <v-autocomplete
          :loading="loadingItems"
          :disabled="loadingItems || running"
          clearable
          variant="outlined"
          label="Selecteer project"
          :items="projects.map(project => project.name)"
          v-model="selectedProject"
      ></v-autocomplete>
      
      <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: flex-end;">
        <div style="width: 50%">
          <v-text-field
              :model-value="StartTime"
              label="Start tijd"
              prepend-icon="mdi-clock-time-four-outline"
              format="24hr"
              :disabled="hourRegistrationStore.Running"
          >
            <v-menu
                v-model="startTimeShowMenu"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
            >
              <v-time-picker v-model="StartTime" format="24hr"></v-time-picker>
            </v-menu>
          </v-text-field>
        </div>

        <div style="width: 50%">
          <v-text-field
              :model-value="EndTime"
              label="Stop tijd"
              prepend-icon="mdi-clock-time-four-outline"
              format="24hr"
              :disabled="hourRegistrationStore.Running"
          >
            <v-menu
                v-model="endTimeShowMenu"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
            >
              <v-time-picker v-model="EndTime" format="24hr"></v-time-picker>
            </v-menu>
          </v-text-field>
        </div>

        <v-btn @click="switchRecordingStatus()" :disabled="selectedProject === null || selectedProject === undefined" color="primary" style="margin-left: 10px">
          <span >{{running ? "Stop": "Start"}}</span>
        </v-btn>
      </div>
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
        <HourRegistrationCard v-for="(registration, index) in RecordedItems" :key="index" :registration="registration" :index="index" style="width: 48%; min-width: 200px;" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>