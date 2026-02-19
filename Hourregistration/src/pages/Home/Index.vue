<script setup>
import HourRegistrationCard from "@/pages/Home/Components/HourRegistrationCard.vue";
import HourRecorder from "@/pages/Home/Components/HourRecorder.vue";
import {useHourRegistrationStore} from "@/state/HourRegistrationState.js";
import {storeToRefs} from "pinia";

const HourRegistrationStore = useHourRegistrationStore();
const {RecordedItems} = storeToRefs(HourRegistrationStore);

console.log(RecordedItems);

</script>

<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="width: 66%">
      <h1 style="margin-bottom: 10px">Uren registreren</h1>
      
      <HourRecorder></HourRecorder>
      
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
        <HourRegistrationCard v-for="(registration, index) in RecordedItems" :key="index" :registration="registration" :index="index" style="width: 48%; min-width: 200px;" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>