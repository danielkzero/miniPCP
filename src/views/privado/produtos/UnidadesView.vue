<template>
    <DataTable :data="unidades" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :loading="loader" />
</template>

<script>
import { unidades } from '@/dados/EstruturaUnidade.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            loader: false,
            unidades: [], // Define os dados diretamente
            columns: [
                { key: "id", label: "#", type: "text" },
                { key: "unidade", label: "Unid.", type: "text" },
                { key: "descricao", label: "Descrição", type: "text", uppercase: true },
                { key: "data_cadastro", label: "Cadastro", type: "datetime" }
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
            axios.get('/api/unidade')
                .then(response => {
                    _this.unidades = response.data.unidades;
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
        this.handleGetItems(); // Chama a função para obter os itens ao montar o componente
    }
}
</script>

<style></style>