<template>
  <Header />
  <TaskForm />
  <TaskList />
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    Header,
    TaskForm,
    TaskList
  }
}
</script>

