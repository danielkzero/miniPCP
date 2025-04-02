<template>
    <div>
        <DataTable :data="pedidos" :columns="columns" :pesquisar="true" @createItem="handleCreateItem"
            @editItem="handleEditItem" :actions="true" :subcolumns="subcolumns" :subcolumn_name="subcolumn_name"
            urlEditar="/pedidos/editar" @deleteItem="handleDelete" @gerarItem="handleGerarItem" :classTable="'text-xs'"
            :filhos="true" />
    </div>
</template>

<script>
import { pedidos } from '@/dados/EstruturaPedido.json'; // Importing order data from JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component

export default {
    components: { DataTable },
    data() {
        return {
            pedidos, // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "id", label: "ID", type: "number" },
                { key: "nome_cliente", label: "Cliente", type: "text" },
                { key: "datas.data_cadastro", label: "Emitido em", type: "date" },
                { key: "datas.data_previsao_entrega", label: "Previsão de entrega", type: "date" },
                { key: "datas.status", label: "Status", type: "status" },
            ],
            subcolumn_name: "itens",
            subcolumns: [
                { key: "id", label: "#", type: "number" },
                { key: "codigo_produto", label: "Código", type: "text" },
                { key: "nome_produto", label: "Descrição", type: "text" },
                { key: "quantidade", label: "Qtd.", type: "number" },
                { key: "entregue", label: "Entregue", type: "number" },
            ],
            fields: [
                { key: "nome_cliente", label: "Cliente", required: true },
                { key: "datas.data_cadastro", label: "Emitido em", type: "date", required: true },
                { key: "datas.data_previsao_entrega", label: "Previsão de entrega", type: "date", required: true },
                { key: "datas.status", label: "Status", required: true },
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
        }
    },
};
</script>