<script setup>
import { ref } from "vue";
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

function logout() {
  authStore.logout()
}
</script>
<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100" style="width: 280px;">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-4">Task Tracker</span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <router-link to="/page/tasks" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#grid"></use>
          </svg>
          Tarefas
        </router-link>
      </li>
      <template v-if="authStore.currentUser">
        <li>
          <router-link to="/page/perfil" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Perfil
          </router-link>
        </li>
        <li>
          <router-link to="/page/dashboard" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#table"></use>
            </svg>
            Painel
          </router-link>
        </li>
        <li>
          <div class="nav-link text-white" @click.prevent="logout">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Sair
          </div>
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/page/auth" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Entrar
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<style>
.nav-link:hover {
  background-color: rgb(78, 111, 157);
}

.router-link-active {
  background-color: rgb(78, 111, 157) !important;
}

.router-link-exact-active {
  background-color: rgb(78, 111, 157) !important;
}
</style>
