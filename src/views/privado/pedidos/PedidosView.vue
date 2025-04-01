<template>
    <div>
        <DataTable :data="pedidos" :columns="columns" :pesquisar="true" urlCriar="/pedidos/novo" :actions="true"
            urlEditar="/pedidos/editar" @deleteItem="handleDelete" :classTable="'text-xs'" />
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
                { key: "datas.status", label: "Status", type: "text" },
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
    },
};
</script>