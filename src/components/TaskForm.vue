<<<<<<< HEAD
=======
<script setup>
import { ref } from 'vue'
import { parseISO, } from 'date-fns'

const text = ref('')
const date_start = ref(null)
const date_end = ref(null)
const status = ref(null)

const emit = defineEmits(['add-task'])

function onSubmit() {
  let start = date_start.value
  let end = date_end.value
  if (start != null) {
    start = parseISO(start)
  }
  if (end != null) {
    end = parseISO(end)
  }

  emit('add-task', {
    finish: (status.value == 2 ? true : false),
    text: text.value,
    date_start: start,
    date_end: end,
    status: status.value
  })

  // Limpar campos
  text.value = ''
  date_start.value = null
  date_end.value = null
  status.value = null
}
</script>

>>>>>>> 9408a7b (mudou-se estrutura: agora é com Vue 3)
<template>
  <div class="container mb-3 mt-3">
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label for="taskText" class="form-label">Tarefa</label>
            <input type="text" id="taskText" v-model="text" class="form-control" placeholder="Adicionar tarefa" required
              aria-required="true" />
          </div>
        </div>
<<<<<<< HEAD
        <div class="col-sm-12 mb-3">
          <div class="form-group">
            <input type="checkbox" id="taskReminder" v-model="reminder" class="form-check-input" />
            <label for="taskReminder" class="form-check-label">Definir lembrete</label>
=======
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-select" v-model="status">
              <option selected value="0">Para Fazer</option>
              <option value="1">Em progresso</option>
              <option value="2">Concluída</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Data de Início:</label>
            <input type="date" id="taskStart" v-model="date_start" class="form-control" />
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="form-label">Data de Término:</label>
            <input type="date" id="taskEnd" v-model="date_end" class="form-control" />
>>>>>>> 9408a7b (mudou-se estrutura: agora é com Vue 3)
          </div>
        </div>
        <div class="col-sm-12 mb-3">
          <button type="submit" class="btn btn-primary">Salvar Tarefa</button>
        </div>
      </div>
    </form>
<<<<<<< HEAD
    <div class="col-md-4">
      <section>
        <strong>
          {{ //tempoEmSegundos
            tempoDecorrido
          }}
        </strong>
      </section>
      <button class="btn btn-success me-2" @click="iniciar">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>play</span>
      </button>
      <button class="btn btn-danger" @click="finalizar">
        <span class="icon">
          <i class="fas fa-stop"></i>
        </span>
        <span>stop</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Formulario',
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      text: '',
      reminder: false,
      duration: 0
    }
  },
  computed: {
    // Adicione propriedades computadas aqui, se necessário
    tempoDecorrido() {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);

    }
  },
  methods: {
    iniciar() {
      // Lógica de inicialização, se necessário
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);


    },
    finalizar() {
      // Lógica de finalização, se necessário
      
      clearInterval(this.cronometro);
      this.duration = this.tempoEmSegundos
    },
    formatTime(segundos) {
      console.log(segundos)
      const mins = Math.floor(segundos / 60).toString().padStart(2, '0')
      const secs = (segundos % 60).toString().padStart(2, '0')
      return `${mins}:${secs}`
    },
    onSubmit() {
      // Adicione aqui a lógica para lidar com o envio do formulário
      // Por exemplo, emitir um evento ou atualizar um array de tarefas
      // Exemplo:
      this.$emit('add-task', {
        text: this.text,
        reminder: this.reminder,
        duration: this.formatTime(this.duration)
      });
      // Limpar o formulário após o envio
      this.text = '';
      this.reminder = false;
    }
  }
};
</script>
=======
  </div>
</template>
>>>>>>> 9408a7b (mudou-se estrutura: agora é com Vue 3)
