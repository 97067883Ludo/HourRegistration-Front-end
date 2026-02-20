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
      
      <div style="display: flex; flex-wrap: wrap; margin-top: 20px; margin-bottom: 20px;">
        <HourRegistrationCard v-for="(registration, index) in RecordedItems" :key="index" :registration="registration" :index="index" style="min-width: 267px; max-width: 267px; margin: 5px;" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>