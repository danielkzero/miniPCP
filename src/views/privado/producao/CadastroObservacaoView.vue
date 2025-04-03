<template>
    <div>
        <DataTable :data="observacao" :columns="columns" :actions="true" :pesquisar="true" urlCriar="/pedidos/novo"
            @editItem="handleEditItem" @createItem="handleCreateItem" @deleteItem="handleDeleteItem"
            classTable="text-xs" />
    </div>
</template>

<script>
import { observacao } from '@/dados/EstruturaObservacao.json'; // Importing order data from JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component

export default {
    components: { DataTable },
    data() {
        return {
            observacao, // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "id", label: "#", type: "text" },
                { key: "observacao", label: "Observação", type: "number" },
                { key: "parada", label: "É uma parada?", type: "YesOrNo" },
                { key: "datas.data_cadastro", label: "Cadastrado em", type: "date" },
            ],
            fields: [
                { key: "codigo", label: "Código", required: true },
                { key: "id_pedido", label: "Pedido", type: "date", required: true },
                { key: "datas.data_cadastro", label: "Cadastrado em", type: "date", required: true },
                { key: "datas.data_alteracao", label: "Alterado em", required: true },
            ]
        };
    },
    methods: {
        abrirOrdemServico(item) {
            this.$router.push('/producao/ordem_servico/' + item.codigo);
        },
        handleEditItem() {

        },
        handleCreateItem() {

        },
        handleDeleteItem(id) {
            this.ordem_producao = this.pedidos.filter(pedido => pedido.id !== id);
        },
    },
};
</script>