<script setup>
const props = defineProps(["variant", "buttonText", "icon", "buttonVariant", "color", "cardText", "cardTitle"])
</script>

<template>
  <v-dialog max-width="500">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          :color="props.color"
          :text="props.buttonText"
          :icon="props.icon"
          :variant="props.buttonVariant"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.cardTitle">
        <v-card-text>
          {{props.cardText}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Annuleren"
              @click="isActive.value = false"
          ></v-btn>
          <v-btn
              text="Verwijder"
              color="red"
              @click="$emit('onDeleteConfirm'), isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>