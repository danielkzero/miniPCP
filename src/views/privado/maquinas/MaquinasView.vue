<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Lista de Máquinas</h1>
            <router-link to="/maquinas/novo" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Nova Máquina
            </router-link>
        </div>

        <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="maquina in maquinas" :key="maquina.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ maquina.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <img :src="maquina.icon" class="h-10 w-10 p-1" v-if="maquina.icon" />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ maquina.nome }}</td>
                        <td class="px-6 py-4">{{ maquina.descricao }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ formatCurrency(maquina.preco) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="{
                                'bg-green-100 text-green-800': !maquina.datas.excluido,
                                'bg-red-100 text-red-800': maquina.datas.excluido
                            }" class="px-2 py-1 text-xs font-medium rounded-full">
                                {{ maquina.datas.excluido ? 'Inativo' : 'Ativo' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <router-link :to="'/maquinas/editar/' + maquina.id"
                                class="text-blue-600 hover:text-blue-900 mr-3">
                                Editar
                            </router-link>
                            <button @click="toggleStatus(maquina)" class="text-red-600 hover:text-red-900">
                                {{ maquina.datas.excluido ? 'Ativar' : 'Desativar' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { maquinas } from "@/dados/EstruturaMaquina.json";
export default {
    name: 'MaquinasView',
    data() {
        return {
            maquinas,
        }
    },
    methods: {
        toggleStatus(maquina) {
            maquina.datas.excluido = !maquina.datas.excluido
            console.log(`Máquina ${maquina.id} status alterado para ${maquina.datas.excluido ? 'inativo' : 'ativo'}`)
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        },
    },
}
</script>