<template>
    <div class="px-4">
        <h1 class="text-2xl font-bold mb-4">Lista de Pedidos</h1>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <tr>
                <th class="px-6 py-3 ">ID</th>
                <th class="px-6 py-3">Cliente</th>
                <th class="px-6 py-3">Emitido em</th>
                <th class="px-6 py-3">Previsão de entrega</th>
                <th class="px-6 py-3">Status</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="pedido in pedidos" :key="pedido.id"
                class="odd:bg-white even:bg-gray-50 odd:hover:bg-gray-100 even:hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap">{{ pedido.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ pedido.nome_cliente }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(pedido.datas.data_cadastro) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(pedido.datas.data_previsao_entrega) }}</td>
                <td class="px-6 py-4"><span
                        class="bg-emerald-500 p-2 rounded-xl text-xs text-white hover:bg-emerald-400">{{
                            pedido.datas.status
                        }}</span></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { pedidos } from '@/dados/EstruturaPedido.json'; // Importando os dados de pedidos do arquivo JSON
import moment from 'moment'; // Importando a biblioteca moment.js para manipulação de datas
export default {
    data() {
        return {
            pedidos
        };
    },
    methods: {
        formatDate(data) {
            return moment(data).format('DD/MM/YYYY'); // Formata a data para o formato desejado
        }
    },
};
</script>