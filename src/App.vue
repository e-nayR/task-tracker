<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TaskForm from './components/TaskForm.vue'
// import TaskBoard from './components/TaskBoard.vue'
import TaskList from './components/TaskList.vue'
import { createPopper } from '@popperjs/core'

const tasks = ref([])

const status_list = [
  "A fazer",
  "Em progresso",
  "Concluído"
]

function addTask(data) {
  tasks.value.push(data)
  console.log(tasks.value)
}

function updateTask(data){
  tasks.value[data.index] = data.task
}

function removeTask(data){
  tasks.value.splice(data.index, 1)
}

</script>

<template>
  <div class="d-flex">
    <Header />
    <div class="p-4 flex-grow-1">
      <TaskForm @add-task="addTask" :status_list="status_list"/>
      <TaskList :tasks="tasks" @update-task="updateTask" @remove-task="removeTask" :status_list="status_list" />
    </div>
  </div>

</template>


