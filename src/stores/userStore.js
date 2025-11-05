import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const users = ref([])
    const currentUser = ref(null)
    const stack = ref(['JavaScrip', 'Python', 'Java', 'React', 'Vue', 'Django', 'SQL'])

    function addUser(data) {
        users.value.push(data)
        console.log(users.value)
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