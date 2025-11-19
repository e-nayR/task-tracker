import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([
        {
            date_end: "2025-11-15",
            date_start: "2025-11-10",
            owner: 14477,
            status: 2,
            text: "Enviar email de acompanhamento para clientes"
        },
        {
            date_end: "2025-12-01",
            date_start: "2025-11-20",
            owner: 88700,
            status: 0,
            text: "Pesquisar novas tecnologias para o backend"
        },
        {
            date_end: "2025-11-21",
            date_start: "2025-11-19",
            owner: 14477,
            status: 0, // A fazer
            text: "Configurar o ambiente de desenvolvimento local"
        },
        {
            date_end: "2025-11-25",
            date_start: "2025-11-18",
            owner: 88700,
            status: 1, // Em progresso
            text: "Implementar a funcionalidade de login com OAuth"
        },
        {
            date_end: "2025-11-15",
            date_start: "2025-11-10",
            owner: 57682,
            status: 2, // Concluído
            text: "Criar a documentação inicial da API"
        },
        {
            date_end: "2025-12-01",
            date_start: "2025-11-20",
            owner: 14477,
            status: 1, // Em progresso
            text: "Revisar o código dos colegas para a 'Sprint 1'"
        },
        {
            date_end: "2025-11-30",
            date_start: "2025-11-25",
            owner: null, // Sem proprietário atribuído
            status: 0, // A fazer
            text: "Definir a estrutura final do banco de dados"
        }
    ])

    const status_list = [
        "A fazer",
        "Em progresso",
        "Concluído"
    ]

    function addTask(data) {
        tasks.value.push(data)
        console.log(tasks.value)
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