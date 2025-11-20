<script setup>
import { ref } from 'vue'
import { isToday, format, differenceInCalendarDays, parseISO } from 'date-fns'
import { useAuthStore } from '../stores/authStore'

const emit = defineEmits(['update-task', 'remove-task'])

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  status_list: {
    type: Array,
    required: true
  },
})

function formatDate(date) {
  const iso_date = parseISO(date)
  const today = new Date()

  if (isToday(iso_date)) return 'Hoje'

  const diff = differenceInCalendarDays(iso_date, today)
  if (diff === -1) return 'Ontem'
  if (diff === 1) return 'Amanhã'

  return format(iso_date, 'dd/MM/yyyy')
}

function statusClass(val) {
  switch (val) {
    case 0:
      return 'badge rounded-pill text-bg-secondary'
    case 1:
      return 'badge rounded-pill text-bg-warning'
    case 2:
      return 'badge rounded-pill text-bg-success'
    default:
      return 'badge rounded-pill text-bg-light'
  }
}

function updateStatus(task_index, new_status) {
  const task = props.tasks[task_index]
  emit('update-task', {
    index: task_index,
    task: {
      ...task,
      status: new_status
    }
  })
}

const edit_field = ref({ index: null, field: null })

function editField(index, field) {
  edit_field.value = { index, field }
}

function isEditing(index, field) {
  return edit_field.value.index === index && edit_field.value.field === field
}

function saveEditedField() {
  edit_field.value = { index: null, field: null }
}

function removeTask(task_index, ) {
  emit('remove-task', {
    index: task_index
  })
}

function userTask(id){
  const authStore = useAuthStore()
  const user = authStore.users.find(attr => attr.id === id) || null
  return user != null ? user.email : 'Sem responsável'
}


</script>

<template>
  <div class="container">
    <div class="col-md-12 col-12 col-sm-12">
      <div class="card border-0 shadow-sm">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th class="text-center" v-if="$route.name !== 'perfil'">Responsável</th>
                <th class="text-center">Tarefa</th>
                <th class="text-center">Status</th>
                <th class="text-center">Data Início</th>
                <th class="text-center">Data Término</th>
                <th v-if="$route.name !== 'perfil'"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task, t_index in tasks" :key="t_index">
                <td class="text-center" v-if="$route.name !== 'perfil'">{{ userTask(task.owner) }}</td>
                <td class="text-center" @click="editField(t_index, 'text')">
                  <template v-if="isEditing(t_index, 'text')">
                    <input
                      type="text"
                      v-model="task.text"
                      @blur="saveEditedField"
                      @keyup.enter="saveEditedField"
                      class="form-control"
                      autofocus
                      required
                    />
                  </template>
                  <template v-else>
                    {{ task.text }}
                  </template>
                </td>
                <td class="text-center">
                  <div class="dropdown">
                    <button class="dropdown-toggle btn p-0 border-0 bg-transparent" type="button"
                      data-bs-toggle="dropdown" data-bs-display="static">
                      <span :class="statusClass(task.status)">
                        {{ status_list[task.status] }}
                      </span>
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="(name, s_index) in status_list" :key="s_index">
                        <a class="dropdown-item" href="#" @click.prevent="updateStatus(t_index, s_index)">
                          <span :class="statusClass(s_index)">{{ name }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="text-center" @click="editField(t_index, 'date_start')">
                  <template v-if="isEditing(t_index, 'date_start')">
                    <input
                      type="date"
                      v-model="task.date_start"
                      @blur="saveEditedField"
                      @keyup.enter="saveEditedField"
                      class="form-control"
                      autofocus
                      required
                    />
                  </template>
                  <template v-else>
                    {{ task.date_start != null ? formatDate(task.date_start) : '-' }}
                  </template>
                </td>
                <td class="text-center" @click="editField(t_index, 'date_end')">
                  <template v-if="isEditing(t_index, 'date_end')">
                    <input
                      type="date"
                      v-model="task.date_end"
                      @blur="saveEditedField"
                      @keyup.enter="saveEditedField"
                      class="form-control"
                      autofocus
                      required
                    />
                  </template>
                  <template v-else>
                    {{ task.date_end != null ? formatDate(task.date_end) : '-' }}
                  </template>
                </td>
                <td class="text-center" v-if="$route.name !== 'perfil'">
                  <a class="btn btn-sm btn-outline-secondary" data-toggle="tooltip"
                    data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?"
                    data-confirm-yes="alert('Deleted')" @click.prevent="removeTask(t_index)"><i class="bi bi-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.table-responsive {
  overflow: visible !important;
}
</style>