<script setup>
import { computed, ref } from "vue";
import { differenceInDays } from 'date-fns';
import { useAuthStore } from '../stores/authStore'
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();

const users = computed(() => {
    if (authStore.users) {
        return authStore.users
    } else {
        return []
    }
})
const users_board = ref([])
const tasks = computed(() => {
    if (taskStore.tasks) {
        return taskStore.tasks
    } else {
        return []
    }
})


let total_tasks
let doing_tasks
let finished_tasks
let todo_tasks
if (tasks.value) {
    const arr_tasks = tasks.value
    total_tasks = arr_tasks.length
    doing_tasks = taskStore.tasksByStatus(1, arr_tasks)
    finished_tasks = taskStore.tasksByStatus(2, arr_tasks)
    todo_tasks = taskStore.tasksByStatus(0, arr_tasks)

    if (users.value) {
        users.value.forEach(user => {
            const user_tasks = taskStore.tasksByUser(user.id)
            const finished = taskStore.tasksByStatus(2, user_tasks)
            const incompleted_tasks = user_tasks.length - finished
            const progress_bar = incompleted_tasks / user_tasks.length * 100
            users_board.value.push({
                id: user.id,
                name: user.username,
                email: user.email,
                total_tasks: user_tasks.length,
                todo_tasks: taskStore.tasksByStatus(0, user_tasks),
                finished_tasks: finished,
                doing_tasks: taskStore.tasksByStatus(1, user_tasks),
                progress: `${progress_bar}%`
            })
        });
    }
} else {
    total_tasks = 0
    doing_tasks = 0
    finished_tasks = 0
    todo_tasks = 0
}

const metrics = [
    { title: "Total de Tarefas", icon_class: "bi bi-list-check text-primary", value: total_tasks, value_class: "text-primary mb-3" },
    { title: "Pendentes", icon_class: "bi bi-exclamation-circle text-secondary", value: todo_tasks, value_class: "text-secondary mb-3" },
    { title: "Em Progresso", icon_class: "bi bi-arrow-clockwise text-warning", value: doing_tasks, value_class: "text-warning mb-3" },
    { title: "Concluídas", icon_class: "bi bi-check-circle text-success", value: finished_tasks, value_class: "text-success mb-3" }
]

function numberLateTasks(){
    const today = new Date()
    console.log(today)
    console.log(tasks.value[0])
}
</script>
<template>
    <div class="container-fluid">
        <div class="row mb-5">
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4" v-for="metric, index in metrics" :key="index">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <p class="text-muted mb-2">{{ metric.title }}</p>
                                <h2 :class="metric.value_class">{{ metric.value }}</h2>
                            </div>
                            <i :class="metric.icon_class" style="font-size: 2.5rem; opacity: 0.8;"></i>
                        </div>
                        <!-- <small class="text-muted">
                            <i class="bi bi-arrow-up text-success"></i> +5 esta semana
                        </small> -->
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <p class="text-muted mb-2">Atrasadas</p>
                                <h2 class="text-danger mb-3">3</h2>
                            </div>
                            <i class="bi bi-alarm text-danger" style="font-size: 2.5rem; opacity: 0.8;"></i>
                        </div>
                        <small class="text-muted">
                            <i class="bi bi-exclamation-triangle text-danger"></i> Requerem atenção
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <div class="card border-0 shadow-sm">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Responsável</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Em Progresso</th>
                                <th class="text-center">Concluídas</th>
                                <th class="text-center">Pendentes</th>
                                <th>Progresso</th>
                                <th>Próxima Tarefa Vence</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users_board" :key="user.id">
                                <td>
                                    <div class="d-flex align-items-center gap-3">
                                        <div>
                                            <div class="fw-bold">{{ user.name }}</div>
                                            <small class="text-muted">{{ user.email }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-primary">{{ user.total_tasks }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-warning text-dark">{{ user.doing_tasks }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-success">{{ user.finished_tasks }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-secondary">{{ user.todo_tasks }}</span>
                                </td>
                                <td>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-success" :style="{ width: user.progress }"></div>
                                    </div>
                                </td>
                                <td>
                                    <small class="text-muted">
                                        <i class="bi bi-calendar-alt me-1"></i>em 3 dias
                                    </small>
                                </td>
                                <td>
                                    <small class="text-secondary">
                                        <i class="bi bi-exclamation-circle me-1"></i>Atrasada
                                    </small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>