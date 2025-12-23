<script setup>
import { useUserStore } from "@/state/UserState.js";

const store = useUserStore();

Me();
async function Me() {
  await store.Me();
}


</script>

<template>
  <main>
    
  </main>
</template>
