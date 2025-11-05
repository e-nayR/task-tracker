<script setup>
import UserForm from '../components/UserForm.vue';
import { useAuthStore } from '../stores/userStore'

const userStore = useAuthStore()

function login(email) {
  userStore.login(email)
}

function logout() {
  userStore.logout()
}
</script>
<template>
    <h1>Usuários (falso login)</h1>

    <div v-if="!userStore.currentUser">
      <p>Escolha um usuário para entrar:</p>
      <ul>
        <li v-for="u in userStore.users" :key="u.id">
          {{ u.username }} ({{ u.email }})
          <button class="btn btn-sm btn-primary ms-2" @click="login(u.email)">Entrar como {{ u.username }}</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Logado como: <strong>{{ userStore.currentUser.username }}</strong> ({{ userStore.currentUser.email }})</p>
      <button class="btn btn-sm btn-secondary" @click="logout">Logout</button>

      <hr />
    </div>
    <UserForm :stack="userStore.stack" @add-user="userStore.addUser" />
</template>
