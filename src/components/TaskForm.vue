<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const emit = defineEmits(['add-task'])

const props = defineProps({
  status_list: {
    type: Array,
    required: true
  },
})

const text = ref('')
const date_start = ref(null)
const date_end = ref(null)
const status = ref(0)

function onSubmit() {
  let start = date_start.value
  let end = date_end.value

  emit('add-task', {
    text: text.value,
    date_start: start,
    date_end: end,
    status: status.value,
    owner: authStore.currentUser != null ? authStore.currentUser.id : null
  })

  // Limpar campos
  text.value = ''
  date_start.value = null
  date_end.value = null
  status.value = 0
}

function optionClass(index){
  switch (index) {
    case 0:
      return 'text-secondary'
    case 1:
      return 'text-warning'
    case 2:
      return 'text-success'
  }
}
</script>

<template>
  <div class="container mb-3 mt-3">
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label for="taskText" class="form-label">Tarefa</label>
            <input type="text" id="taskText" v-model="text" class="form-control" placeholder="Adicionar tarefa" required
              aria-required="true" />
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-select" v-model="status" :class="optionClass(status)">
                <option v-for="(name, s_index) in status_list" :value=s_index :class="optionClass(s_index)">{{ name }}</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Data de Início:</label>
            <input type="date" id="taskStart" v-model="date_start" class="form-control" />
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Data de Término:</label>
            <input type="date" id="taskEnd" v-model="date_end" class="form-control" />
          </div>
        </div>
        <div class="col-sm-12 mb-3">
          <button type="submit" class="btn btn-primary">Salvar Tarefa</button>
        </div>
      </div>
    </form>
  </div>
</template>
