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
        console.log(tasks.value)
    }

    function updateTask(data) {
        tasks.value[data.index] = data.task
    }

    function removeTask(data) {
        tasks.value.splice(data.index, 1)
    }

    return {
        tasks,
        status_list,
        addTask,
        updateTask,
        removeTask,
    };
})