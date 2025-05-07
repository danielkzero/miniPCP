<template>
    <div>
        <DataTable :data="observacao" :columns="columns" :actions="true" :pesquisar="true" urlCriar="/pedidos/novo"
            @editItem="handleEditItem" @createItem="handleCreateItem" @deleteItem="handleDeleteItem"
            classTable="text-xs" :loading="loader" />
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
            observacao: [], // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "id", label: "#", type: "text" },
                { key: "observacao", label: "Observação", type: "number" },
                { key: "parada", label: "É uma parada?", type: "YesOrNo" },
                { key: "data_cadastro", label: "Cadastrado em", type: "datetime" },
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
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Start loader
            axios.get('/api/observacao')
                .then(response => {
                    _this.observacao = response.data.observacao;
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