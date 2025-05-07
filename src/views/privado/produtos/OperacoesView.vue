<template>
    <DataTable :data="operacoes" :columns="columns" classTable="text-xs" :pesquisar="true" :pagination="true"
        @deleteItem="handleDeleteItem" @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true"
        :loading="loader" />
</template>

<script>
import { operacoes } from '@/dados/EstruturaOperacoes.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            loader: false,
            operacoes: [], // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome_operacao", label: "Operação", type: "text" },
                { key: "data_cadastro", label: "Cadastro", type: "datetime" },
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
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Inicia o loader
            axios.get('/api/operacao')
                .then(response => {
                    _this.operacoes = response.data.operacoes;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    _this.loader = false; // Para o loader
                });
        }

    },
    mounted() {
        this.handleGetItems();
    }
}
</script>

<style></style>