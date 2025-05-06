<template>
    <DataTable :data="menu" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :filhos="true"
        :subcolumn_name="subcolumn_name" :subcolumns="subcolumns" :pagination="true" />
</template>

<script>
import { menu } from '@/dados/SidebarData.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            menu, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "icon", label: "Icone", type: "text" },
                { key: "link", label: "Link", type: "text" },
                { key: "description", label: "Descrição", type: "text" },
                { key: 'datas.data_cadastro', label: 'Cadastro', type: 'date' }
            ],
            subcolumn_name: "submenu",
            subcolumns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "link", label: "Link", type: "text" },
                { key: "description", label: "Descrição", type: "text" }
            ]
        };
    },
    methods: {
        handleDeleteItem(id) {
            console.log(`Menu ${id}`);
        },
        handleEditItem(id) {
            console.log(`Menu ${id} editado`);
        },
        handleCreateItem(id) {
            console.log(`Novo Menu ${id} criado`);
        }
    }
}
</script>

<style></style>