<template>
    <DataTable :data="setores" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :pagination="true"
        :loading="loader" />
</template>

<script>
import { setores } from '@/dados/EstruturaSetores.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            loader: false,
            setores: [], // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome_estoque", label: "Nome", type: "text" },
                { key: "descricao", label: "Descrição", type: "text" },
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
            axios.get('/api/setor')
                .then(response => {
                    setTimeout(() => {
                        _this.loader = false; // Para o loader
                        _this.setores = response.data.setores; // Atualiza os setores após 2 segundos
                    }, 2000); // Espera 2 segundos para mostrar os dados
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    //_this.loader = false; // Para o loader
                });
        }
    },
    mounted() {
        this.handleGetItems(); // Chama a função para obter os itens ao montar o componente
    }
}
</script>

<style></style>