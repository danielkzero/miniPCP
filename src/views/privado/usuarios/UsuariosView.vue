<template>
    <DataTable :data="usuarios" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { usuarios } from '@/dados/EstruturaUsuarios.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            usuarios, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "avatar", label: "Avatar", type: "image" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "login", label: "Login", type: "text" },
                { key: "nome_nivel_acesso", label: "Nível Acesso", type: "text" },
                { key: "ativo", label: "Ativo", type: "boolean" },
                { key: 'datas.data_cadastro', label: 'Cadastro', type: 'date' }
            ]
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

<style></style>