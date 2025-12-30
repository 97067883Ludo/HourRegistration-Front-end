//import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import {createPersistedState} from "pinia-plugin-persistedstate";
import router from "@/router/index.js";

const pinia = createPinia()
const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

pinia.use(createPersistedState());
app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
