<script setup>
import { computed, ref } from "vue";
import { differenceInCalendarDays, parseISO, format } from 'date-fns';
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
        for (const user of users.value) {
            const board_data = {
                id: user.id,
                name: user.username,
                email: user.email,
                total_tasks: 0,
                todo_tasks: 0,
                finished_tasks: 0,
                doing_tasks: 0,
                progress: "0%",
                late: false,
                due_date: null
            }
            const user_tasks = taskStore.tasksByUser(user.id)
            if (user_tasks.length > 0) {
                const finished = taskStore.tasksByStatus(2, user_tasks)
                let progress_bar
                if (finished == 0) {
                    progress_bar = 0
                } else {
                    const incompleted_tasks = user_tasks.length - finished
                    console.log(incompleted_tasks)
                    progress_bar = incompleted_tasks / user_tasks.length * 100
                }
                const sorted = user_tasks.sort((a, b) => {
                    const d1 = a.date_end;
                    const d2 = b.date_end;

                    if (!d1 && !d2) return 0;
                    if (!d1) return 1;
                    if (!d2) return -1;

                    const date1 = new Date(d1);
                    const date2 = new Date(d2);

                    return date2 - date1;
                });
                if (sorted) {
                    if (sorted[0].date_end) {
                        const today = new Date()
                        const iso_date = parseISO(sorted[0].date_end)
                        const diff = differenceInCalendarDays(iso_date, today)
                        if (diff < 0) {
                            board_data.late = true
                        } else {
                            let due_date;
                            if (diff <= 5) {
                                switch (diff) {
                                    case 1:
                                        due_date = 'Amanhã';
                                    case 0:
                                        due_date = 'Hoje';
                                }
                                board_data.due_date = `em ${diff} dias`
                            } else { due_date = format(iso_date, 'dd/MM/yyyy') }
                            board_data.due_date = due_date
                        }
                    }
                }

                board_data.total_tasks = user_tasks.length,
                    board_data.todo_tasks = taskStore.tasksByStatus(0, user_tasks),
                    board_data.finished_tasks = finished,
                    board_data.doing_tasks = taskStore.tasksByStatus(1, user_tasks),
                    board_data.progress = `${progress_bar}%`
            }
            users_board.value.push(board_data)
        };
    }
} else {
    total_tasks = 0
    doing_tasks = 0
    finished_tasks = 0
    todo_tasks = 0
}

function numberLateTasks() {
    let count = 0
    for (const task of tasks.value) {
        if (task.date_end && task.status != 2) {
            const today = new Date()
            const diff = differenceInCalendarDays(parseISO(task.date_end), today)
            if (diff < 0) {
                count++;
            } else {
                continue;
            }
        } else {
            continue;
        }
    }
    return count
}

const metrics = [
    { title: "Total de Tarefas", icon_class: "bi bi-clipboard-data text-primary", value: total_tasks, value_class: "text-primary mb-3" },
    { title: "Atrasadas", icon_class: "bi bi-alarm text-danger", value: numberLateTasks(), value_class: "text-danger mb-3" },
    { title: "Não iniciadas", icon_class: "bi bi-hourglass-top text-secondary", value: todo_tasks, value_class: "text-secondary mb-3" },
    { title: "Em Progresso", icon_class: "bi bi-arrow-repeat text-warning", value: doing_tasks, value_class: "text-warning mb-3" },
    { title: "Concluídas", icon_class: "bi bi-check-circle-fill text-success", value: finished_tasks, value_class: "text-success mb-3" },
]

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
        </div>

        <div class="mt-5">
            <div class="card border-0 shadow-sm">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="text-center">Responsável</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Em Progresso</th>
                                <th class="text-center">Concluídas</th>
                                <th class="text-center">Pendentes</th>
                                <th class="text-center">Progresso</th>
                                <th class="text-center">Próxima Tarefa Vence</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users_board" :key="user.id">
                                <td class="text-left">
                                    <div class="d-flex gap-3 justify-content-center">
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
                                <td class="text-center">
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-success" :style="{ width: user.progress }"></div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <template v-if="user.late">
                                        <small class="text-danger fw-bold">
                                            <i class="bi bi-exclamation-circle-fill me-1"></i>Atrasada
                                        </small>
                                    </template>
                                    <template v-else-if="user.due_date">
                                        <small class="text-muted">
                                            {{ user.due_date }}
                                        </small>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>