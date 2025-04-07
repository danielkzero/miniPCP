<template>
    <DataTable :data="grupos" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { grupos } from '@/dados/EstruturaGrupos.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            grupos, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "id_pai", label: "Pai", type: "text" },
                { key: 'sufixo', label: 'Sufixo', type: "array", typeArray: "anexo", keyArray: "base64" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "materia_prima", label: "Matéria prima", type: "YesOrNo" },
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