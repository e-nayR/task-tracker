<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TaskForm from './components/TaskForm.vue'
import TaskBoard from './components/TaskBoard.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])

const status_list = [
  "A fazer",
  "Em progresso",
  "Concluído"
]

function addTask(data) {
  tasks.value.push(data)
}

function updateTask(data){
  tasks.value[data.index] = data.task
  console.log(tasks.value[data.index])
}

</script>

<template>
  <div class="d-flex">
    <Header />
    <div class="p-4 flex-grow-1">
      <TaskForm @add-task="addTask" :status_list="status_list"/>
      <!-- <TaskBoard /> -->
      <TaskList :tasks="tasks" @update-task="updateTask" :status_list="status_list" />
    </div>
  </div>

</template>


