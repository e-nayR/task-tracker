import TaskPage from "./pages/TaskPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PerfilPage from "./pages/PerfilPage.vue";
import DasboardPage from "./pages/DasboardPage.vue";

const routes = [
  { path: '/', component: LoginPage },
  { path: '/page/tasks', component: TaskPage },
  { path: '/page/auth', component: LoginPage },
  { path: '/page/perfil', component: PerfilPage },
  { path: '/page/dashboard', component: DasboardPage }
]

export default routes