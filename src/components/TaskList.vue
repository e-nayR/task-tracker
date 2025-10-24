<script setup>
import {computed} from 'vue'
import { isToday, format } from 'date-fns'
const today = new Date()

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

function formatDate(date){
  if (isToday(date)){
    return 'Hoje'
  }

  const date_diference = date.getDate() - today.getDate()
  if (date_diference == (-1))  return 'Ontem'
  if (date_diference == 1)  return 'Amanhã'

  return format(date, 'dd/MM/yyyy')
}

function statusInfo(val) {
  switch(val) {
    case '0':
      return { text: 'Para Fazer', class: 'badge rounded-pill text-bg-danger' }
    case '1':
      return { text: 'Em andamento', class: 'badge rounded-pill text-bg-warning' }
    case '2':
      return { text: 'Concluída', class: 'badge rounded-pill text-bg-success' }
    default:
      return { text: '-', class: 'badge rounded-pill text-bg-light' }
  }
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
                <th></th>
                <th>Tarefa</th>
                <th>Status</th>
                <th>Data Início</th>
                <th>Data Término</th>
              </tr>
              <tr v-for="task, index in tasks" :key="index">
                <td><input type="checkbox" :checked="task.finish"></td>
                <td>{{ task.text }}</td>
                <td><span :class="statusInfo(task.status).class">{{ statusInfo(task.status).text }}</span></td>
                <td>{{ task.date_start != null ? formatDate(task.date_start) : '-' }}</td>
                <td>{{ task.date_end != null ? formatDate(task.date_end) : '-'}}</td>
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
