<script setup>
import { computed } from "vue";
import UserPerfil from '../components/UserPerfil.vue';
import TaskList from '../components/TaskList.vue';
import { useAuthStore } from '../stores/authStore'
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser) || null
const tasks = computed(() => {
    if (!user.value) return []
    return taskStore.tasksByUser(user.value.id)
})

</script>
<template>
    <div class="mb-3">
        <UserPerfil :stack="authStore.stack" :user="user" />
    </div>
    <TaskList :tasks="tasks" :status_list="taskStore.status_list" @update-task="taskStore.updateTask" @remove-task="taskStore.removeTask" />
</template>
