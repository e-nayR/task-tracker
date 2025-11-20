import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([
        {
            date_end: "2025-12-01",
            date_start: "2025-11-20",
            owner: 88700,
            status: 0,
            text: "Pesquisar novas tecnologias para o backend"
        },
        {
            date_end: "2025-11-19",
            date_start: "2025-11-17",
            owner: 14477,
            status: 0,
            text: "Configurar o ambiente de desenvolvimento local"
        },
        {
            date_end: "2025-11-25",
            date_start: "2025-11-18",
            owner: 88700,
            status: 1,
            text: "Implementar a funcionalidade de login com OAuth"
        }
    ])

    const status_list = [
        "A fazer",
        "Em progresso",
        "Concluído"
    ]

    function addTask(data) {
        tasks.value.push(data)
    }

    function updateTask(data) {
        tasks.value[data.index] = data.task
    }

    function removeTask(data) {
        tasks.value.splice(data.index, 1)
    }

    function tasksByUser(id){
        return tasks.value.filter(obj => obj.owner === id)
    }

    function tasksByStatus(status, tasks){
        const arr = tasks.filter(task => task.status == status)
        return arr.length
    }

    return {
        tasks,
        status_list,
        addTask,
        updateTask,
        removeTask,
        tasksByUser,
        tasksByStatus
    };
})