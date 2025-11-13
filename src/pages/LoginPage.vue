<script setup>
import UserForm from '../components/UserForm.vue';
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore();

</script>
<template>
    <UserForm :stack="authStore.stack" @add-user="authStore.addUser" />
</template>
