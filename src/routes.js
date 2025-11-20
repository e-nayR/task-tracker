import TaskPage from "./pages/TaskPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PerfilPage from "./pages/PerfilPage.vue";
import DasboardPage from "./pages/DasboardPage.vue";

const routes = [
  { path: '/', component: LoginPage, name:'index' },
  { path: '/page/tasks', component: TaskPage, name:'task' },
  { path: '/page/auth', component: LoginPage, name:'login' },
  { path: '/page/perfil', component: PerfilPage, name:'perfil' },
  { path: '/page/dashboard', component: DasboardPage, name:'dashboard' }
]

export default routes