<template>
    <DataTable :data="clientes" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :pagination="true" />
</template>

<script>
import { clientes } from '@/dados/EstruturaClientes.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            clientes, // Define os dados diretamente
            columns: [
                { key: "codigo", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "razao", label: "Razão", type: "text" },
                { key: "cnpj", label: "cnpj", type: "text", },
                { key: "cidade", label: "Cidade", type: "text", },
                { key: "estado", label: "Estado", type: "text", },
                { key: "cadastrado_em", label: "Cadastro", type: "date" }
            ]
        };
    },
    methods: {
        handleDeleteItem(id) {
            console.log(`Cliente ${id}`);
        },
        handleEditItem(id) {
            console.log(`Cliente ${id} editado`);
        },
        handleCreateItem(id) {
            console.log(`Novo Cliente ${id} criado`);
        },
        handleGetItems() {
            let _this = this;
            axios.get('/api/clientes')
                .then(response => {
                    _this.clientes = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }

    },
    mounted() {
        this.handleGetItems(); // Chama a função para obter os itens ao montar o componente
    }
}
</script>
