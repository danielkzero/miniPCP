<template>
    <DataTable :data="registro_entrega" :columns="columns" :pesquisar="true" :subcolumns="subcolumns"
        @createItem="createItem" :actions="true" @editItem="handleEditItem" :subcolumn_name="subcolumn_name"
        :filhos="true" classTable="text-xs" :loading="loader" :pagination="true" :itemsInPage="[20, 50, 100]"
        sortKey="id" sortOrder="desc" />
</template>

<script>
import DataTable from '@/components/DataTable/index.vue'; // Importa o componente DataTable
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            loader: false, // Variável para controle do loader
            registro_entrega: [], // Define os dados diretamente
            columns: [
                { key: 'id', label: 'Nº', type: "number" },
            ],
            subcolumn_name: "itens",
            subcolumns: [
                { key: 'id_filho', label: 'id', type: "number" },
                { key: "codigo_pedido", label: "Código Pedido", type: "text" },
                { key: "codigo_ordem_producao", label: "Ordem Produção", type: "text" },
                { key: "codigo", label: "Código", type: "text" },
                { key: "nome_produto", label: "Descrição", type: "text" },
                { key: "quantidade_emitida", label: "Qtd Emitida", type: "number" },
                { key: "peso", label: "Peso", type: "number", decimal: 3 },
                { key: "data_cadastro", label: "cadastro", type: "datetime" }
            ],
        };
    },
    methods: {
        createItem() {
            this.$router.push('/producao/registro_entrega/novo');
        },
        handleEditItem(item) {
            console.log("Edit item: " + item);
            this.$router.push(`/producao/registro_entrega/editar/${item}`);
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Inicia o loader
            axios.get('/api/registroentrega')
                .then(response => {
                    _this.registro_entrega = response.data.registro_entrega;
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
};
</script>