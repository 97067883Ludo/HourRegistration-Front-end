<script setup>

import {onMounted, ref} from "vue";
  import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {useUserStore} from "@/state/UserState.js";

  const test = [
    {
      align: 'start',
      key: 'User',
      sortable: false,
      title: 'Gebruiker',
    },
    {
      align: 'start',
      key: 'name',
      sortable: false,
      title: 'Dessert (100g serving)',
    },
  ];
  const registrations = ref([]);
  const loadingData = ref(false)
  
  const hourStore = useHourRegistrationStore();
  const userStore = useUserStore();
  
  onMounted(async () => {
    loadingData.value = true;
    let result = await hourStore.GetHourRegistrationDetails(); 
    result.data.then((data) => {
      console.log(data);
      registrations.value = data;
    });
    loadingData.value = false;
  })

// Helper function to pad a single number with a leading zero
function pad(number) {
  // String(number) converts the number to a string
  // .padStart(2, '0') ensures the string is at least 2 characters long,
  // padding with '0' at the start if it's not.
  return String(number).padStart(2, '0');
}

  function getCleanDateTimeString(dateString) {
    let date = new Date(dateString);
  
    // --- IMPORTANT CORRECTION FOR DATE PARTS ---
    // Month: getMonth() is 0-indexed (Jan=0), so you must add 1.
    // Date: getDate() returns the day of the month. Adding 1 is usually incorrect 
    // unless you have a specific requirement to advance the day. 
    // I have removed the + 1 from getDate() as it is likely a bug.
  
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
</script>

<template>
  <div style="width:100%; display: flex; justify-content: center;">
    <div style="width: 80%;">
      <div style="width: 100%; display: flex;">
        <v-autocomplete
            style="margin:10px"
            label="Gebruiker"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-autocomplete>
        <v-autocomplete
            style="margin:10px"
            label="project"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-autocomplete>
      </div>
      
      <v-data-table
          :items="registrations"  
          :headers="[
            { title: 'Gebruiker', key: 'user.firstName' + ' ' + 'user.lastName' },
            { title: 'Project', key: 'project.name' },
            { title: 'Start tijd', key: 'startTime' },
            { title: 'Eind tijd', key: 'endTime' },
            { title: 'subtotaal', key: 'subTotal' },
          ]"
          :loading="loadingData"
      >
<!--        <thead>-->
<!--        <tr>-->
<!--          <th class="text-left">-->
<!--            Gebruiker-->
<!--          </th>-->
<!--          <th class="text-left">-->
<!--            Project-->
<!--          </th>-->
<!--          <th class="text-left">-->
<!--            Start tijd-->
<!--          </th>-->
<!--          <th class="text-left">-->
<!--            Eind tijd-->
<!--          </th>-->
<!--          <th class="text-left">-->
<!--            subtotaal-->
<!--          </th>-->
<!--        </tr>-->
<!--        </thead>-->
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