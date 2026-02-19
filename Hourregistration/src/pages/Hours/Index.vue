<script setup>

import {onMounted, ref} from "vue";
  import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {useUserStore} from "@/state/UserState.js";

  const headers = [
    { key: 'data-table-group', title: 'week' },
    { title: 'Gebruiker', key: 'user.username' },
    { title: 'Project', key: 'project.name' },
    { title: 'Start tijd', key: 'startTime' },
    { title: 'Eind tijd', key: 'endTime' },
    { title: 'subtotaal', key: 'subTotal' },
  ]

  const groupBy = ref([{ key: 'weekno', order: 'asc' }, { key: 'status', order: 'asc' }])

  const registrations = ref([]);
  const loadingData = ref(false)
  
  const hourStore = useHourRegistrationStore();
  const userStore = useUserStore();
  
  const users = ref([]);
  const loadingUsers = ref(false);
  
  onMounted(async () => {
    await LoadHourData();
    await LoadUsers();
  })

// Helper function to pad a single number with a leading zero
function pad(number) {
  // String(number) converts the number to a string
  // .padStart(2, '0') ensures the string is at least 2 characters long,
  // padding with '0' at the start if it's not.
  return String(number).padStart(2, '0');
}

async function LoadUsers() {
  loadingUsers.value = true;
  let response = await userStore.GetUserNames();
  users.value = response.data;
  loadingUsers.value = false;
}

async function LoadHourData () {
  loadingData.value = true;
  let result = await hourStore.GetHourRegistrationDetails();
  result.data.then((data) => {
    for(let i =0; i<data.length; i++)
      data[i].weekno = getISOWeekNumber(data[i].startTime);
    console.log(data);

    registrations.value = data;
  });
  loadingData.value = false;
}

  function getCleanDateTimeString(dateString) {
    let date = new Date(dateString);
  
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 0-indexed, so add 1
    let day = date.getDate();       // Returns the day of the month (1-31)
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    let toBeReturned = year
        + "-" + pad(month)
        + "-" + pad(day)
        + " " + pad(hours)
        + ":" + pad(minutes);
  
    return toBeReturned;
  }

  function getSubTotal(startTimeString, endTimeString) {
    let startTime = new Date(startTimeString);
    let endTime = new Date(endTimeString);
    let diff = endTime - startTime;
  
    // Calculate hours and minutes from the difference in milliseconds
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    // --- FIX APPLIED HERE ---
    // Convert minutes to a string and pad with a leading zero if < 10
    let paddedMinutes = String(minutes).padStart(2, '0');
  
    return hours + ":" + paddedMinutes;
  }

function getISOWeekNumber(dateString) {
  let date = new Date(dateString);
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

  return weekNo;
}

function caclualteTotalTime(items) {
  let totalTime = 0;
  
  for (let i =0; i < items.length; i++) {
    totalTime += (new Date(items[i].columns.endTime) - new Date(items[i].columns.startTime));
  }
  const hours = Math.floor(totalTime / (1000 * 60 * 60));
  let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
  return hours + ":" + minutes;
}

</script>

<template>
  <div style="width:100%; display: flex; justify-content: center;">
    <div style="width: 80%;">
      <div style="width: 100%; display: flex;">
        <v-autocomplete
            :loading="loadingUsers"
            style="margin:10px"
            label="Gebruiker"
            :items="users"
            
        ></v-autocomplete>
        <v-autocomplete
            style="margin:10px"
            label="project"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-autocomplete>
      </div>
      
      <v-data-table
          :items="registrations"  
          :loading="loadingData"
          :group-by="groupBy"
          :headers="headers"
      >
        <!-- i dont know why this is required but if i dont this shity thing is going broken... -->
        <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td
                :colspan="columns.length"
                class="cursor-pointer"
                v-ripple
                @click="toggleGroup(item)"
            >
              <div class="d-flex align-center" style="justify-content: space-between">
                <div>
                <v-btn
                    :icon="isGroupOpen(item) ? '$expand' : '$next'"
                    color="medium-emphasis"
                    density="comfortable"
                    size="small"
                    variant="outlined"
                ></v-btn>

                <span class="ms-4">{{ item.value }}</span>
                </div>
                  <span>Totaal: {{caclualteTotalTime(item.items[0].items)}}</span>
              </div>
            </td>
          </tr>
        </template>
          
        <template v-slot:item.endTime="{ internalItem, isExpanded, toggleExpand }">
          {{ getCleanDateTimeString(internalItem.columns.endTime) }}
        </template>

        <template v-slot:item.startTime="{ internalItem, isExpanded, toggleExpand }">
          {{ getCleanDateTimeString(internalItem.columns.startTime) }}
        </template>

        <template v-slot:item.subTotal="{ internalItem, isExpanded, toggleExpand }">
          {{ getSubTotal(internalItem.columns.startTime, internalItem.columns.endTime) }}
        </template>

<!--        <tbody>-->
<!--        <tr-->
<!--            v-for="item in registrations"-->
<!--            :key="item.id"-->
<!--        >-->
<!--          <td>{{ item.user.firstName + " " + item.user.lastName }}</td>-->
<!--          <td>{{ item.project.name }}</td>-->
<!--          <td>{{ getCleanDateTimeString(item.startTime) }}</td>-->
<!--          <td>{{ getCleanDateTimeString(item.endTime) }}</td>-->
<!--          <td>{{ getSubTotal(item.startTime, item.endTime) }}</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--        -->
        
      </v-data-table>
      
    </div>
  </div>
</template>

<style scoped>

</style>