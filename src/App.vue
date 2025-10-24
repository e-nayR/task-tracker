<<<<<<< HEAD
=======
<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])

function addTask(data) {
  tasks.value.push(data)
}
</script>

>>>>>>> 9408a7b (mudou-se estrutura: agora é com Vue 3)
<template>
  <div class="d-flex">
    <Header />
    <div class="p-4 flex-grow-1">
      <TaskForm @add-task="addTask" />
      <TaskList :tasks="tasks" />
    </div>
  </div>

</template>

<<<<<<< HEAD
<script>
import Header from './components/Header.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    Header,
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    addTask(data) {
      this.tasks.push(data)
    }
  }
}
</script>
=======

>>>>>>> 9408a7b (mudou-se estrutura: agora é com Vue 3)

