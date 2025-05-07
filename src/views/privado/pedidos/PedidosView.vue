<template>
    <div>
        <DataTable :data="pedidos" :columns="columns" :pesquisar="true" @createItem="handleCreateItem"
            @editItem="handleEditItem" :actions="true" :subcolumns="subcolumns" :subcolumn_name="subcolumn_name"
            urlEditar="/pedidos/editar" @deleteItem="handleDelete" @gerarItem="handleGerarItem" :classTable="'text-xs'"
            :filhos="true" :loading="loader" :pagination="true" :itemsInPage="[20, 50, 100]" />
    </div>
</template>

<script>
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Axios for HTTP requests
export default {
    components: { DataTable },
    data() {
        return {
            loader: false, // Loader control variable
            pedidos: [], // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "id", label: "ID", type: "number" },
                { key: "nome_cliente", label: "Cliente", type: "text" },
                { key: "data_cadastro", label: "Emitido em", type: "date" },
                { key: "data_previsao_entrega", label: "Previsão de entrega", type: "date" },
                { key: "status", label: "Status", type: "YesOrNo" },
            ],
            subcolumn_name: "itens",
            subcolumns: [
                { key: "id", label: "#", type: "number" },
                { key: "codigo_produto", label: "Código", type: "text" },
                { key: "nome_produto", label: "Descrição", type: "text" },
                { key: "quantidade", label: "Qtd.", type: "number" },
                { key: "entregue", label: "Entregue", type: "number" },
            ],
        };
    },
    methods: {
        handleDelete(id) {
            this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
        },
        handleGerarItem(id) {
            console.log("Gerar item: " + id);
        },
        handleCreateItem(item) {
            console.log("Create item: " + item);
        },
        handleEditItem(item) {
            console.log("Edit item: " + item);
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Start loader
            axios.get('/api/pedidos')
                .then(response => {
                    _this.pedidos = response.data.pedidos;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    _this.loader = false; // Stop loader
                });
        },
    },
    mounted() {
        this.handleGetItems(); // Load data when component is mounted
    },
};
</script>