<template>
    <div>
        <DataTable :data="ordem_producao" :columns="columns" :actions="true" :pesquisar="true" urlCriar="/pedidos/novo"
            @hideItem="handleHideItem" @commentItem="handleCommentItem" @printItem="handlePrintItem"
            @deleteItem="handleDeleteItem" classTable="text-xs" />
    </div>
</template>

<script>
import { ordem_producao } from '@/dados/EstruturaOrdemProducao.json'; // Importing order data from JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component

export default {
    components: { DataTable },
    data() {
        return {
            ordem_producao, // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "codigo", label: "Ord. produção", type: "text" },
                { key: "codigo_pedido", label: "Pedido", type: "number" },
                { key: "nome_cliente", label: "Cliente", type: "text" },
                { key: "codigo_produto", label: "Código", type: "text" },
                { key: "descricao_produto", label: "Descrição", type: "text" },
                { key: "quantidade_pedida", label: "Qtd.", type: "number" },
                { key: "quantidade_produzida", label: "Ent.", type: "number" },
                { key: "datas.data_previsao_entrega", label: "Prev. Entrega", type: "date" },
            ],
            fields: [
                { key: "codigo", label: "Código", required: true },
                { key: "id_pedido", label: "Pedido", type: "date", required: true },
                { key: "datas.data_cadastro", label: "Cadastrado em", type: "date", required: true },
                { key: "datas.data_alteracao", label: "Alterado em", required: true },
            ],
        };
    },
    methods: {
        handleHideItem() {

        },
        handleCommentItem() {

        },
        handlePrintItem() {

        },
        handleDeleteItem(id) {
            this.ordem_producao = this.pedidos.filter(pedido => pedido.id !== id);
        },
    },
};
</script>