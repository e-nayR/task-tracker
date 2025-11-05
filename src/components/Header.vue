<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100" style="width: 280px;">
    <router-link to="/page/tasks/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Task Tracker</span>
    </router-link>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Início
        </a>
      </li>
      <li>
        <router-link to="/page/users/" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Perfil
        </router-link>
      </li>
      <li>
        <router-link to="/page/tasks/" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
          Tarefas
        </router-link>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          Configurações
        </a>
      </li>
    </ul>
  </div>
</template>

<script></script>
