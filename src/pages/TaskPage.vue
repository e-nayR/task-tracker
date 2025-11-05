<script setup>
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
</script>

<template>
  <TaskForm :status_list="taskStore.status_list" @add-task="taskStore.addTask" />
  <TaskList :tasks="taskStore.tasks" :status_list="taskStore.status_list" @update-task="taskStore.updateTask" @remove-task="taskStore.removeTask" />
</template>
