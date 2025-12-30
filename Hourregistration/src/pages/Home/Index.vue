<script setup>

import {useProjectState} from "@/state/ProjectState.js";
import {ref} from "vue";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";

const projectStore = useProjectState();
const hourRegistrationStore = useHourRegistrationStore();
const projects = ref();
const selectedProject = ref(null)
const loadingItems = ref(true)
const startTimeShowMenu = ref(false)
const endTimeShowMenu = ref(false)
const StartTime = ref(null)
const endTime = ref(null)
const running = ref(false)


const getAllProjects = async () => {
  let result = await projectStore.GetAllProjects();
  projects.value = result.data
  loadingItems.value = false;
}
getAllProjects();

function StartRegistration() {
  let lastRunningState = running.value;
  if (running.value) {
    hourRegistrationStore.Running = false;
    running.value = hourRegistrationStore.Running;
    let date = new Date(Date.now());
    endTime.value = date.toLocaleTimeString();
    hourRegistrationStore.EndTime = date;
  } else {
    hourRegistrationStore.Running = true;
    running.value = hourRegistrationStore.Running;
    let date = new Date(Date.now());
    StartTime.value = date.toLocaleTimeString();
  }
  
  if (lastRunningState && !running.value) {
    console.log("recording time is done")
  }
}

</script>

<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="width: 66%">
      <h1 style="margin-bottom: 10px">Uren registreren</h1>
      
      <v-autocomplete
          :loading="loadingItems"
          :disabled="loadingItems"
          clearable
          variant="outlined"
          label="Selecteer project"
          :items="projects.map(project => project.name)"
          v-model="selectedProject"
      ></v-autocomplete>
      
      <div style="width: 100%; display: flex; justify-content: space-between;">
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
              :model-value="endTime"
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
              <v-time-picker v-model="endTime" format="24hr"></v-time-picker>
            </v-menu>
          </v-text-field>
        </div>

        <v-btn @click="StartRegistration()">
          <span >{{running ? "Stop": "Start"}}</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>