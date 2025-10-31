<script setup>
import { ref } from 'vue'
import { isToday, format } from 'date-fns'
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

const new_end = ref(null)

function formatDate(date) {
  if (isToday(date)) {
    return 'Hoje'
  }

  const date_diference = date.getDate() - today.getDate()
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

function changeDataEnd(task_index){
  
}

function newDataEnd(task_index){
  const task = props.tasks[task_index]
  console.log(new_end.value)
  // emit('update-task', {
  //   index: task_index,
  //   task: {
  //     ...task,
  //     date_end: new_end.value
  //   }
  // })
}

</script>

<template>
  <div class="container">
    <div class="col-md-12 col-12 col-sm-12">
      <div class="card">
        <div class="table-responsive" style="overflow-y: visible;">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Tarefa</th>
                <th>Status</th>
                <th>Data Início</th>
                <th>Data Término</th>
              </tr>
              <tr v-for="task, t_index in tasks" :key="t_index">
                <td>{{ task.text }}</td>
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
                <td>{{ task.date_start != null ? formatDate(task.date_start) : '' }}</td>
                <td>
                  <span id="data_end" @click="changeDataEnd(t_index)">{{ task.date_end != null ? formatDate(task.date_end) : '' }}</span>
                  <div id="new_date_end" class="d-none">
                    <input type="date" v-model="new_end" />
                    <button type="submit" @submit.prevent="newDataEnd{t_index}">+</button>
                  </div>
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