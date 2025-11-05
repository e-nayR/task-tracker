<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-user'])

const props = defineProps({
    stack: {
        type: Array,
        required: true
    },
})

const email = ref('')
const username = ref('')
const stack_selected = ref([])

function onSubmit() {
    emit('add-user', {
        id: Math.floor(Math.random() * 100000),
        username: username.value,
        email: email.value,
        stack: stack_selected.value
    })

    email.value = ''
    username.value = ''
    stack_selected.value = []
}
</script>

<template>
    <div class="container mb-3 mt-3">
        <form @submit.prevent="onSubmit">
            <div class="row mb-3">
                <label for="username" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="username" v-model="username">
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Stack de Tecnologias</legend>
                <div class="col-sm-10">
                    <div class="form-check form-check-inline" v-for="stack_item,item_idx in stack" :key="stack_item">
                        <input class="form-check-input" type="checkbox" name="stack_item" :id="stack_item" :value="item_idx" v-model="stack_selected">
                        <label class="form-check-label" :for="stack_item">{{ stack_item }}</label>
                    </div>
                </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>
