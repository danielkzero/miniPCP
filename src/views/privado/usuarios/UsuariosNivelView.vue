<template>
    <DataTable :data="usuarios_nivel" :columns="columns" classTable="text-xs" :pesquisar="true" :subcolumns="subcolumns"
        :subcolumn_name="subcolumn_name" @deleteItem="handleDeleteItem" @editItem="handleEditItem"
        @createItem="handleCreateItem" :actions="true" :filhos="true" />
</template>

<script>
import { usuarios_nivel } from '@/dados/EstruturaUsuariosNivel.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            usuarios_nivel, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "descricao", label: "Descrição", type: "text" },
                { key: 'datas.data_cadastro', label: 'Cadastro', type: 'date' }
            ],
            subcolumn_name: "liberado",
            subcolumns: [
                { key: "id", label: "#", type: "number" },
                { key: "pagina", label: "página", type: "text" },
                { key: "visualizar", label: "Visualizar", type: "YesOrNo" },
                { key: "incluir", label: "Incluir", type: "YesOrNo" },
                { key: "alterar", label: "Alterar", type: "YesOrNo" },
                { key: "excluir", label: "Excluir", type: "YesOrNo" },
            ],
        };
    },
    methods: {
        handleDeleteItem(id) {
            console.log(`Usuário ${id}`);
        },
        handleEditItem(id) {
            console.log(`Usuário ${id} editado`);
        },
        handleCreateItem(id) {
            console.log(`Novo Usuário ${id} criado`);
        }
    }
}
</script>
