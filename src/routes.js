import TaskPage from "./pages/TaskPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PerfilPage from "./pages/PerfilPage.vue";

const routes = [
  { path: '/page/tasks', component: TaskPage },
  { path: '/page/auth', component: LoginPage },
  { path: '/page/perfil', component: PerfilPage }
]

export default routes