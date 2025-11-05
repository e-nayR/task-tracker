<script setup>
import Header from './components/Header.vue'
// import TaskPage from './pages/TaskPage.vue'
</script>

<template>
  <div class="d-flex">
    <Header />
    <div class="p-4 flex-grow-1">
      <router-view />
    </div>
  </div>

</template>


