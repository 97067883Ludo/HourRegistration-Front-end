<script setup>
import { useUserStore } from "@/state/UserState.js";
import {ref} from "vue";
import router from "@/router/index.js";

const store = useUserStore();
Me();
async function Me() {
  await store.Me();
}

const drawer = ref(true)
const rail = ref(true)
</script>

<template>
  
  <div v-if="router.currentRoute.value.name === 'Login'">
    <router-view/>
  </div>
  
  <v-card v-else>
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
              :title="store.FirstName + ' ' + store.LastName"
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

        <v-list nav>
          <RouterLink to="/" style="text-decoration: none; color: inherit;">
            <v-list-item
                prepend-icon="mdi-home-city"
                title="Home"
                value="home"
            >
            </v-list-item>
          </RouterLink>
          <RouterLink to="/account" style="text-decoration: none; color: inherit;">
            <v-list-item
                prepend-icon="mdi-account"
                title="My Account"
                value="account"
            ></v-list-item>
          </RouterLink>
          <RouterLink to="/projects" style="text-decoration: none; color: inherit;">
            <v-list-item
                prepend-icon="mdi-briefcase-outline"
                title="Projects"
                value="Projects"
            ></v-list-item>
          </RouterLink>
          <RouterLink to="/hours" style="text-decoration: none; color: inherit;">
            <v-list-item
                prepend-icon="mdi-clock-outline"
                title="Hours"
                value="hours"
            ></v-list-item>
          </RouterLink>
          <v-spacer></v-spacer>
            <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Logout"
                value="Logout"
                @click="store.Logout()"
            ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view/>
      </v-main>
    </v-layout>
  </v-card>
</template>