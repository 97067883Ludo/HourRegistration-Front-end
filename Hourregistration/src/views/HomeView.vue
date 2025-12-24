<script setup>
import { useUserStore } from "@/state/UserState.js";
import {ref, watch} from "vue";

const store = useUserStore();

Me();
async function Me() {
  await store.Me();
}


const drawer = ref(true)
const rail = ref(true)

</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                  icon="mdi-chevron-left"
                  variant="text"
                  @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
              prepend-icon="mdi-home-city"
              title="Home"
              value="home"
          ></v-list-item>
          <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
          ></v-list-item>
          <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px">sdf</v-main>
    </v-layout>
  </v-card>
</template>