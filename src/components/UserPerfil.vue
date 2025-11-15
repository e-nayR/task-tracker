<script setup>
const props = defineProps({
    stack: {
        type: Array
    },
    user: {
        type: Object
    },
})
</script>

<template>
    <div class="container mt-4">
      <h3>Informações do Usuário</h3>
  
      <div v-if="user" class="card mt-3 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{{ user.username }}</h5>
          <p class="card-text mb-1"><strong>Email:</strong> {{ user.email }}</p>
  
          <p class="card-text">
            <strong>Stack:</strong>
            <span v-if="user.stack.length">
              <span
                v-for="(tech, i) in user.stack"
                :key="i"
                class="badge bg-primary me-1"
              >
                {{ stack[tech] }}
              </span>
            </span>
            <span v-else class="text-muted">Nenhuma tecnologia selecionada</span>
          </p>
        </div>
      </div>
  
      <div v-else class="alert alert-secondary mt-3">
        Nenhum usuário selecionado ou logado.
      </div>
    </div>
</template>
  