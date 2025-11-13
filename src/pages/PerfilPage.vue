<script setup>
import { computed } from "vue";
import UserPerfil from '../components/UserPerfil.vue';
import TaskList from '../components/TaskList.vue';
import { useAuthStore } from '../stores/authStore'
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();
console.log(taskStore.tasks)
console.log(authStore.users)
const user = computed(() => authStore.currentUser)
const tasks = computed(() => taskStore.tasks.filter(attr => attr.owner === user.id) || null)
</script>
<template>
    <UserPerfil :stack="authStore.stack" :user="user" />
    <TaskList :tasks="tasks" :status_list="taskStore.status_list" @update-task="taskStore.updateTask" @remove-task="taskStore.removeTask" />
</template>
