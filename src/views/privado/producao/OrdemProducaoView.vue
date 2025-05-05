<template>
    <div>
        <DataTable :data="ordem_producao" :columns="columns" :actions="true" :pesquisar="true" urlCriar="/pedidos/novo"
            @hideItem="handleHideItem" @commentItem="handleCommentItem" @printItem="handlePrintItem"
            @deleteItem="handleDeleteItem" :subcolumns="subcolumns" :subcolumn_name="subcolumn_name" :filhos="true"
            classTable="text-xs" :loading="loader" :pagination="true" />
    </div>
</template>

<script>
import { ordem_producao } from '@/dados/EstruturaOrdemProducao.json'; // Importing order data from JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importing Axios for HTTP requests
export default {
    components: { DataTable },
    data() {
        return {
            loader: false, // Loader state for data fetching
            ordem_producao: [], // Order data loaded from JSON
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
                { key: "percentual_produzido", label: "progresso", type: "progressbar" }
            ],
            subcolumn_name: "ordem_servico",
            subcolumns: [
                { key: "codigo", label: "Ordem de serviço", type: "text", onClick: this.abrirOrdemServico },
                { key: "operacao", label: "Operacao", type: "text" },
                { key: "pronto", label: "Pronto", type: "number" },
                { key: "tempo", label: "Tempo gasto", type: "time" }
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
        handleHideItem() {

        },
        handleCommentItem() {

        },
        handlePrintItem() {

        },
        handleDeleteItem(id) {
            this.ordem_producao = this.pedidos.filter(pedido => pedido.id !== id);
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Start loader
            axios.get('/api/ordemproducao')
                .then(response => {
                    setTimeout(() => {
                        _this.loader = false; // Stop loader
                        _this.ordem_producao = response.data.ordem_producao; // Update orders after 2 seconds
                    }, 2000); // Wait 2 seconds to show data
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    //_this.loader = false; // Stop loader
                });
        }
    },
    mounted() {
        this.handleGetItems(); // Call function to get items when component is mounted
    }
};
</script>