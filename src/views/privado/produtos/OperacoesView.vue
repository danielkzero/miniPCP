<template>
    <DataTable :data="operacoes" :columns="columns" classTable="text-xs" :pesquisar="true"
        @deleteItem="handleDeleteItem" @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { operacoes } from '@/dados/EstruturaOperacoes.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            operacoes, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "datas.data_cadastro", label: "Cadastro", type: "date" },
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