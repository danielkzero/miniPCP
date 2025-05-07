<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
        <!-- SKELETON LOADING -->
        <div v-if="loader" v-for="n in 8" :key="'skeleton-' + n"
            class="shadow-md rounded-lg p-4 bg-gray-50 animate-pulse">
            <div class="flex justify-start">
                <div class="w-14 h-14 bg-gray-300 rounded"></div>
                <div class="ms-3 w-full space-y-2">
                    <div class="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div class="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
            </div>
        </div>
        <div v-else
            class="shadow-md rounded-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
            :class="maquina.status == 'ATIVO' ? 'bg-indigo-100 animate__animated animate__bounce animate-green-glow' : 'bg-gray-50 text-gray-500'"
            v-for="(maquina, index) in data" :key="index">

            <div class="flex justify-start">
                <div>
                    <img :src="maquina.icon" class="object-cover w-14"
                        :class="{ 'animate-processo': maquina.status === 'ATIVO', 'grayscale': maquina.status === 'INATIVO' }" />
                </div>

                <div class="ms-3 grid grid-col-1 gap-y-1 w-full">
                    <div>
                        <div class="text-xl">{{ maquina.nome }}</div>
                        <div class="text-1xl text-gray-500 bg-gray-100 p-1 rounded-lg flex items-center border border-gray-300"
                            v-if="maquina.ordem_servico">
                            <router-link :to="'/producao/ordem_servico/' + maquina.ordem_servico"
                                class="flex items-center text-gray-500 hover:text-gray-700"
                                v-if="maquina.status == 'ATIVO'">
                                <i class="bx bx-file me-1"></i> {{ maquina.ordem_servico }}
                            </router-link>
                            <template v-else>
                                <i class="bx bx-file me-1"></i> {{ maquina.ordem_servico }}
                            </template>
                        </div>
                        <div v-if="maquina.avatar_usuario"
                            class="flex items-center text-gray-500 text-1xl mt-1 bg-gray-100 px-1 rounded-lg border border-gray-300">
                            <img :src="maquina.avatar_usuario" alt="" class="h-8 w-8 p-1" />
                            {{ maquina.nome_usuario }}
                        </div>
                    </div>

                    <div>
                        <div class="text-1xl" v-if="maquina.produto">{{ maquina.produto }}</div>
                        <div class="text-xs" v-if="maquina.quantidade > 0">
                            {{ maquina.fabricado }} de {{ maquina.quantidade }}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import { maquina_uso } from '@/dados/EstruturaMaquinaUso.json';
import axios from '@/axios.js'; // Axios for HTTP requests
export default {
    data() {
        return {
            loader: false, // Loader control variable
            data: []
        }
    },
    methods: {
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Start loader
            axios.get('/api/maquinasemuso')
                .then(response => {
                    _this.data = response.data.maquina_uso;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    _this.loader = false; // Stop loader
                });
        },
    },
    mounted() {
        this.handleGetItems(); // Load data when component is mounted
    },

}
</script>

<style>
@keyframes pulse-gear {
    0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }

    50% {
        transform: scale(1.1) rotate(10deg);
        opacity: 0.7;
    }

    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

.animate-processo {
    animation: pulse-gear 1s infinite ease-in-out;
}

@keyframes greenGlow {
    0% {
        box-shadow: 0 0 0px var(--color-indigo-500);
    }

    50% {
        box-shadow: 0 0 10px var(--color-indigo-500);
    }

    100% {
        box-shadow: 0 0 0px var(--color-indigo-500);
    }
}

.animate-green-glow {
    animation: greenGlow 1.5s ease-in-out infinite;
}
</style>