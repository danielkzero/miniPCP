<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
        <div class="shadow-md rounded-lg p-4 "
            :class="maquina.status == 'ATIVO' ? 'bg-white animate__animated animate__bounce' : 'bg-gray-50 text-gray-500'"
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
import { maquina_uso } from '@/dados/EstruturaMaquinaUso.json';
export default {
    data() {
        return {
            data: maquina_uso
        }
    }

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
</style>