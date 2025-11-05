import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import { createPinia } from "pinia";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
