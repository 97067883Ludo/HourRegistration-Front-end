<script setup>
import {useProjectState} from "@/state/ProjectState.js";
import {onMounted, ref} from "vue";
import router from "@/router/index.js";

const projectState = useProjectState();

const loading = ref(true);
const data = ref([]);
const createButton = ref(null)
const creatingProject = ref(false)
const projectName = ref("")
const projectDescription = ref("");

const rules = [
  value => !!value || 'Required.',
  value => (value && value.length >= 3) || 'Min 3 characters',
]

const showMenu = ref(false)
const menuTarget = ref(null)

async function show (evt) {
  if (showMenu.value) {
    showMenu.value = false
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  menuTarget.value = evt.target.closest('.v-icon-btn')
  showMenu.value = true
}

async function LoadProjects() {
    const result = await projectState.GetAllProjects();
    if (result.success) {
      loading.value = false;
      data.value = result.data;
    }
}

async function DeleteProject(id) {
  const result = await projectState.DeleteProject(id);
  if(result.success) {
    await LoadProjects();
  }
  
}

async function CreateProject() {
  creatingProject.value = true;
  const result = await projectState.CreateProject(projectName.value, projectDescription.value);
  console.log(result)
  if (!result.success) {
    creatingProject.value = false;
    await LoadProjects();
    return;
  }
  creatingProject.value = false;
  await LoadProjects();
}

function clickedRow(projectId) {
  router.push("/projects/" + projectId);
}

onMounted(async () => {
  await LoadProjects();
})

</script>

<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 20px;">
    <div style="width: 66%;">
      <div style="display: flex; justify-content: flex-end;">
        <v-btn ref="createButton">create</v-btn>
        
        <v-dialog :activator="createButton" max-width="340">
          <template v-slot:default="{ isActive }">
            <v-card
              title="Create Project"
              style="padding: 10px"
            >
              <v-text-field
                  :rules="rules"
                  hide-details="auto"
                  label="Project Naam"
                  v-model="projectName"
              ></v-text-field>
              <v-text-field
                  :rules="rules"
                  hide-details="auto"
                  label="Project beschrijving"
                  v-model="projectDescription"
              ></v-text-field>
              <template v-slot:actions>
                <v-btn
                    :loading="creatingProject"
                    text="Create"
                    @click="async () => {await CreateProject(); isActive.value = false}"
                ></v-btn>
                <v-btn
                    text="Close"
                    @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
        
      </div>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            style="cursor: pointer"
            v-for="item in data"
            :key="item.name"
            @click="clickedRow(item.id)"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-btn @click=" (event) => {DeleteProject(item.id); event.stopPropagation();}">Delete</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style scoped>

</style>