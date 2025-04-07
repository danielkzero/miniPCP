<template>
    <DataTable :data="unidades" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { unidades } from '@/dados/EstruturaUnidade.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            unidades, // Define os dados diretamente
            columns: [
                { key: "nome_unidade", label: "Código", type: "text" },
                { key: "descricao", label: "Descrição", type: "text" },
                { key: "datas.data_cadastro", label: "Cadastro", type: "date" }
            ]
        };
    },
    methods: {
        handleDeleteItem(id) {
            console.log(`Máquina ${id}`);
        },
        handleEditItem(id) {
            console.log(`Máquina ${id} editada`);
        },
        handleCreateItem(id) {
            console.log(`Nova Máquina ${id} criada`);
        }
    }
}
</script>

<style></style>