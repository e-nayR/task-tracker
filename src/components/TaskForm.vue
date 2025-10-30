<script setup>
import { ref } from 'vue'
import { parseISO, } from 'date-fns'

const emit = defineEmits(['add-task'])

const props = defineProps({
  status_list: {
    type: Array,
    required: true
  },
})

const status_arr = props.status_list.value
const text = ref('')
const date_start = ref(null)
const date_end = ref(null)
const status = ref(null)

function onSubmit() {
  let start = date_start.value
  let end = date_end.value
  if (start != null) {
    start = parseISO(start)
  }
  if (end != null) {
    end = parseISO(end)
  }

  emit('add-task', {
    finish: (status.value == 2 ? true : false),
    text: text.value,
    date_start: start,
    date_end: end,
    status: status.value
  })

  // Limpar campos
  text.value = ''
  date_start.value = null
  date_end.value = null
  status.value = null
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
            <select class="form-select" v-model="status">
              <div v-for="name, index in status_list">
                <option :value=index>{{ name }}</option>
              </div>
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
