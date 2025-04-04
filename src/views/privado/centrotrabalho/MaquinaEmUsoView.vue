<template>
    <div class="grid grid-cols-4 gap-4 mx-4">
        <div class="bg-white shadow-md rounded-lg p-4" v-for="(maquina, index) in data" :key="index">
            <div class="flex justify-start">
                <img :src="maquina.icon" class="object-cover w-10 h-10 animate__animated animate__bounce" />
                <div class="ms-3">
                    <h3>{{ maquina.nome }}</h3>
                    <p>{{ maquina.produto }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { maquina_uso } from '@/dados/EstruturaMaquinaUso.json';
export default {
    data() {
        return {
            data: maquina_uso
        }
    }

}
</script>

<style></style>