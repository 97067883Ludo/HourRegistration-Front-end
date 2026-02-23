<script setup>

import {ref} from "vue";

const props = defineProps({
  project: Object
})

const name = ref(props.project.name)
const description = ref(props.project.description)

</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          icon="mdi-pencil"
          variant="text"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Project bewerken">
        <v-card-text>
          <v-text-field v-model="name" label="Naam"></v-text-field>
          <v-text-field v-model="description" label="Omschrijving"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
              text="Sluiten"
              @click="isActive.value = false"
          ></v-btn>
          
          <v-btn
              text="Opslaan"
              @click="() => { isActive.value = false; $emit('update', {name: name.value, description: description.value, id: props.project.id}) }"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>