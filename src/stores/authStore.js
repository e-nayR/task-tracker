import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const users = ref([
        {
            email: "joao.silva@empresa.com",
            id: 14477,
            stack: [1, 3, 5],
            username: "joaosilva",
        },
        {
            email: "maria.souza@empresa.com",
            id: 88700,
            stack: [0, 2, 6],
            username: "mariasouza",
        },
        {
            email: "pedro.almeida@empresa.com",
            id: 57682,
            stack: [4, 5],
            username: "pedroalmeida",
        }
    ])
    const currentUser = ref(null)
    const stack = ref(['JavaScrip', 'Python', 'Java', 'React', 'Vue', 'Django', 'SQL'])

    function addUser(data) {
        users.value.push(data)
    }

    function login(email){
        const user = users.value.find(attr => attr.email === email) || null
        currentUser.value = user
    }

    function logout(){
        currentUser.value = null
    }

    return {
        users,
        stack,
        addUser,
        login,
        logout,
        currentUser
    };
})