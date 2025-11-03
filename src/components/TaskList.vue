<script setup>
import { ref } from 'vue'
import { isToday, format, parseISO } from 'date-fns'
const today = new Date()

const emit = defineEmits(['update-task'])

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

// Problema: erro na data, está ficando com um dia a menos do escolhido
function formatDate(date) {
  const iso_date = parseISO(date)
  if (isToday(iso_date)) {
    return 'Hoje'
  }

  const date_diference = iso_date.getDate() - today.getDate()
  if (date_diference == (-1)) return 'Ontem'
  if (date_diference == 1) return 'Amanhã'

  return format(date, 'dd/MM/yyyy')
}

function statusClass(val) {
  switch (val) {
    case 0:
      return 'badge rounded-pill text-bg-danger'
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
  console.log(props.tasks)
}


</script>

<template>
  <div class="container">
    <div class="col-md-12 col-12 col-sm-12">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Tarefa</th>
                <th>Status</th>
                <th>Data Início</th>
                <th>Data Término</th>
              </tr>
              <tr v-for="task, t_index in tasks" :key="t_index">
                <td @click="editField(t_index, 'text')">
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
                <td>
                  <div class="dropdown">
                    <button class="dropdown-toggle btn p-0 border-0 bg-transparent" type="button"
                      data-bs-toggle="dropdown">
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
                <td @click="editField(t_index, 'date_start')">
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
                    {{ task.date_start != null ? formatDate(task.date_start) : '' }}
                  </template>
                </td>
                <td @click="editField(t_index, 'date_end')">
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
                    {{ task.date_end != null ? formatDate(task.date_end) : '' }}
                  </template>
                </td>
                <!-- <td>
                  <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="" data-original-title="Edit"><i
                      class="bi bi-pencil"></i></a>
                  <a class="btn btn-danger btn-action" data-toggle="tooltip" title=""
                    data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?"
                    data-confirm-yes="alert('Deleted')" data-original-title="Delete"><i class="bi bi-trash"></i></a>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>