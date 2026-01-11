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
  
  const hourStore = useHourRegistrationStore();
  const userStore = useUserStore();
  
  onMounted(async () => {
    let result = await hourStore.GetHourRegistrationDetails(); 
    result.data.then((data) => {
      console.log(data);
      registrations.value = data;
    });
  })

  function getCleanDateTimeString(dateString) {
    let date = new Date(dateString);
    let toBeReturned = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)
        + " " + date.getHours() + ":" + date.getMinutes();
    return toBeReturned;
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
      
      <v-table>
        <thead>
        <tr>
          <th class="text-left">
            Gebruiker
          </th>
          <th class="text-left">
            Project
          </th>
          <th class="text-left">
            Start tijd
          </th>
          <th class="text-left">
            Eind tijd
          </th>
          <th class="text-left">

          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in registrations"
            :key="item.id"
        >
          <td>{{ item.user.firstName + " " + item.user.lastName }}</td>
          <td>{{ item.project.name }}</td>
          <td>{{ getCleanDateTimeString(item.startTime) }}</td>
          <td>{{ getCleanDateTimeString(item.endTime) }}</td>
        </tr>
        </tbody>
      </v-table>
      
    </div>
  </div>
</template>

<style scoped>

</style>