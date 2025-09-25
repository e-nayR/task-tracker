<template>
  <div class="d-flex">
    <Header />
    <div class="p-4 flex-grow-1">
      <TaskForm @add-task="addTask" />
      <TaskList :tasks="tasks" />
    </div>
  </div>

</template>

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

