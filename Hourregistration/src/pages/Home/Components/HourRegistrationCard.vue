<script setup>
  
  import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
  import {onMounted, ref} from 'vue'

  const EditDialog = ref(false)
  const DeleteDialog = ref(false)
  const savingInProgress = ref(false)
  const showMenu = ref(false)
  const startTime = ref(null)
  const endTime = ref(null)
  const showMenuEndTime = ref(false)

  const hourRegistration = useHourRegistrationStore();

  import { defineProps } from 'vue';
  import TimePicker from "@/pages/GobalComponents/TimePicker.vue";
  const props = defineProps({
    registration: {
      type: Object,
      default: 0,
      required: true // If set to true, Vue warns if not provided
    },
    index: {
      type: Number,
      default: 0,
      required: true
    }
  });
  
  async function SaveItem() {
    savingInProgress.value = true;
    let result = await hourRegistration.CreateHourRegistration(props.index);
    if (result.status === 200) {
      hourRegistration.DeleteItem(props.index);
      savingInProgress.value = false;
    }
    savingInProgress.value = false;
    // let user know something is wrong.
  }
  
  function DeleteItem(itemIndex) {
    hourRegistration.DeleteItem(itemIndex);
  }

  function EditItem() {
    hourRegistration.EditItem(props.index, startTime.value, endTime.value);
    EditDialog.value = false
  }
  
  function CleanTime(time) {
    let toBeReturned = "";
    let date = new Date(time)
    let now = new Date();
    
    if (date.getDate() === now.getDate()) {
      toBeReturned = "vandaag, "
    } else {
      toBeReturned = date.toLocaleDateString() + " "
    }
    
    toBeReturned += date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
    return toBeReturned;
  }
  
  onMounted(() => {
    console.log(props.registration)
    let StartTime = new Date(props.registration.StartTime)
    let EndTime = new Date(props.registration.EndTime)
    startTime.value = StartTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    endTime.value = EndTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  })
</script>

<template>
  <v-card :title="hourRegistration.getProjectNameById(props.registration.ProjectId)" style="margin: 1%">
    <v-card-text>
      <div>
        {{CleanTime(props.registration.StartTime)}} tot
      </div>
      <div>
        {{CleanTime(props.registration.EndTime)}}
      </div>
    </v-card-text>
    <v-card-actions>
      
      <v-dialog
          v-model="DeleteDialog"
          max-width="350"
          persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps">
            Delete
          </v-btn>
        </template>

        <v-card
            prepend-icon="mdi-delete"
            title="Weet u het zeker?"
        >
          <template v-slot:actions>
            
            <v-spacer></v-spacer>

            <v-btn @click="DeleteDialog = false">
              Anuleren
            </v-btn>

            <v-btn @click="() => {DeleteItem(props.index); DeleteDialog = false}">
              Verwijderen
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
      
      <v-btn @click="SaveItem()" :loading="savingInProgress">Opslaan</v-btn>
      <v-dialog
          v-model="EditDialog"
          max-width="400"
          persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps">
            Edit
          </v-btn>
        </template>

        <v-card
            prepend-icon="mdi-pencil"
            title="Edit Item"
        >
          <div style="padding-left: 10px; padding-right: 10px">
            <h4>start tijd</h4>
            <TimePicker @update-time="args => startTime = args" :Value="startTime"></TimePicker>
            
            <h4>eind tijd</h4>
            <TimePicker @update-time="args => endTime = args" :Value="endTime"></TimePicker>

          </div>
          <template v-slot:actions>
            
            <v-spacer></v-spacer>

            <v-btn @click="EditDialog = false">
              Anuleren
            </v-btn>

            <v-btn @click="EditItem">
              Opslaan
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>