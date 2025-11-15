import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([])

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