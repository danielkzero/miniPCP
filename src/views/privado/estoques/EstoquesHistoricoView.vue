<template>
    <DataTable :data="historico_estoque" :columns="columns" classTable="text-xs" :pesquisar="true" :pagination="true" />
</template>

<script>
import DataTable from '@/components/DataTable/index.vue';
import axios from '@/axios.js';
export default {
    components: {
        DataTable
    },
    data() {
        return {
            historico_estoque: [],
            columns: [
                { key: "codigo_produto", label: "ID Produto", type: "text" },
                { key: "produto", label: "Nome Produto", type: "text" },
                { key: "tipo_operacao_estoque", label: "Tipo Operação", type: "text" },
                { key: "quantidade", label: "Quantidade", type: "number" },
                { key: "usuario", label: "Usuário", type: "text" },
                { key: "cadastrado_em", label: "Autor", type: "date" },
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
            axios.get('/api/historico_estoque')
                .then(response => {
                    _this.historico_estoque = response.data.historico_estoque;
                    console.log(response);
                })
                .catch(error => {
                    console.error('Erro ao buscar histórico de estoque:', error);
                });
        }

    },
    mounted() {
        this.handleGetItems(); // Chama a função para obter os itens ao montar o componente
    },
}
</script>
