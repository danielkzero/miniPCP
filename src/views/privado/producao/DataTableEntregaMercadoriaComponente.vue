<template>
    <div v-for="(group, codigo) in groupedData" :key="codigo" class="bg-white rounded-lg mb-4">
        <template v-for="(via, index) in vias" :key="index">
            <div class="my-6 border-b border-dashed border-gray-400" v-if="index != 0"></div>
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr class="table-secondary bg-gray-300 border-gray-400 border-b ">
                        <td colspan="5">
                            <div class="flex justify-between py-2 px-4">
                                <div>Protocolo de entrega de mercadoria</div>
                                <div class="text-end text-red-500">Nº {{ codigo }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr class="table-secondary bg-gray-300">
                        <td colspan="5" class="border-0 py-2 px-4">
                            <span v-if="index == 0">Via do Destinatário</span>
                            <span v-else>Via do Remetente</span>
                        </td>
                    </tr>
                    <tr class="table-secondary bg-gray-300">
                        <td colspan="5">
                            <div class="flex justify-between pb-2 px-4">
                                <div>
                                    <div>Empresa</div>
                                    <div class="fw-bolder">BODEMEIER</div>
                                </div>
                                <div>
                                    <div>Endereço</div>
                                    <div class="fw-bolder">R. Ricardo Fracassi</div>
                                </div>
                                <div>
                                    <div>Data</div>
                                    <div class="fw-bolder">04/04/2025</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th class="px-4 py-2">#</th>
                        <th class="px-4 py-2">Nº Pedido</th>
                        <th class="px-4 py-2">Código</th>
                        <th class="px-4 py-2">Descrição</th>
                        <th class="px-4 py-2">Qtde</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in group" :key="item.id" class="odd:bg-white even:bg-gray-50">
                        <td class="px-4 py-2">{{ item.id }}</td>
                        <td class="px-4 py-2">{{ item.codigo_pedido }}</td>
                        <td class="px-4 py-2">{{ item.codigo }}</td>
                        <td class="px-4 py-2">{{ item.nome_produto }}</td>
                        <td class="px-4 py-2 flex justify-between items-center">
                            <span v-if="editarIndex != item.id && index == 0">{{ item.quantidade_emitida
                                }}</span>
                            <input v-else-if="editarIndex == item.id && index == 0" type="number"
                                v-model.number="itemEditado.quantidade_emitida"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 p-1 w-16" />
                            <span v-else>
                                {{ item.quantidade_emitida }}
                            </span>
                            <span class="hidden-on-print">
                                <span v-if="index == 0">
                                    <i class="bx bx-edit text-indigo-700 mx-1 cursor-pointer"
                                        @click="editarItem(item.id)" v-if="editarIndex != item.id"></i>
                                    <i class="bx bx-trash text-red-600 mx-1 cursor-pointer"
                                        v-if="editarIndex != item.id" @click="deletarItem(item.id)"></i>
                                    <i class="bx bx-check text-green-500 mx-1 cursor-pointer" @click="salvarItem(item)"
                                        v-if="editarIndex == item.id"></i>
                                    <i class="bx bx-x text-red-600 mx-1 cursor-pointer" @click="cancelarItem(item.id)"
                                        v-if="editarIndex == item.id"></i>
                                </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="5" class="border-0 pt-2">
                            <div class="flex justify-between">
                                <div class="w-1/3">
                                    <div>Assinatura</div>
                                    <div class="border-b border-gray-500 py-4"></div>
                                </div>
                                <div class="w-1/3">
                                    <div>Data</div>
                                    <div class="border-b border-gray-500 py-4"></div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </template>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    groupedData: any;
    vias: number;
    itemEditado: any;
    showActions: boolean;
    editarItem: (id: any) => void;
    deletarItem: (id: any) => void;
    salvarItem: (item: any) => void;
    cancelarItem: (id: any) => void;
}>()
const editarIndex = defineModel<any>('editarIndex', { required: true })
</script>
<style scoped>
.hidden-on-print {
    display: block;
}

@media print {
    .hidden-on-print {
        display: none !important;
    }

}
</style>
