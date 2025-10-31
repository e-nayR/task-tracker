<template>
  <div class="container mt-3">
    <ul class="list-group">
      <li v-for="(tarefa, index) in tarefas" :key="index" class="list-group-item d-flex align-items-center justify-content-between">
        <div>
          <strong>{{ tarefa.nome }}</strong>
          <div v-if="tarefa.data" class="text-muted small">Data: {{ tarefa.data }}</div>
        </div>

        <div>
          <!-- Se o input estiver visível -->
          <div v-if="tarefa.editando" class="d-flex align-items-center">
            <input 
              type="date"
              v-model="tarefa.data"
              class="form-control form-control-sm me-2"
              style="width: 160px;"
            />
            <button class="btn btn-sm btn-success" @click="salvarData(index)">
              <i class="bi bi-check"></i>
            </button>
          </div>

          <!-- Se o input não estiver visível -->
          <button 
            v-else 
            class="btn btn-sm btn-outline-primary"
            @click="editarData(index)"
          >
            <i class="bi bi-calendar"></i> Data
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tarefas = ref([
  { nome: 'Estudar Vue', data: null, editando: false },
  { nome: 'Fazer exercícios', data: null, editando: false },
  { nome: 'Enviar relatório', data: null, editando: false }
])

function editarData(index) {
  tarefas.value[index].editando = true
}

function salvarData(index) {
  tarefas.value[index].editando = false
}
</script>
