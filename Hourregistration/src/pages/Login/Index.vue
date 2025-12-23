<script setup>
import { useUserStore } from "@/state/UserState.js";
import { ref } from "vue";

const store = useUserStore();
// Note: Usually you wouldn't login immediately on setup 
// but rather inside a function called by the button click.

const loginButtonState = ref(false);
const visible = ref(false); // Fixes the password toggle error
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  loginButtonState.value = true;
  try {
    await store.Login(email.value, password.value);
  } finally {
    loginButtonState.value = false;
  }
};
</script>

<template>
  <div style="margin-top: 20px;">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-img
          class="mx-auto my-6"
          max-width="228"
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      ></v-img>
      
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        variant="outlined"
        v-model="email"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Wachtwoord
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        variant="outlined"
        v-model="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
      </v-card>
      <div style="width: 100%; text-align: right">
      <v-btn
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        :loading="loginButtonState"
        @click="() => {handleLogin()}">
        Log In
      </v-btn>
      </div>
    </v-card>
  </div>
</template>