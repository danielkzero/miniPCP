<template>
    <DataTable :data="produtos" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { produtos } from '@/dados/EstruturaProduto.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            produtos, // Define os dados diretamente
            columns: [
                { key: "codigos.CODIGO", label: "Código", type: "text" },
                { key: 'anexos', label: 'anexo', type: "array", typeArray: "anexo", keyArray: "base64" },
                { key: "descricoes.nome", label: "Descrição", type: "text" },
                { key: "nome_unidade", label: "Un.", type: "text" },

                { key: "dimensoes.largura", label: "Largura", type: "number" },
                { key: "dimensoes.comprimento", label: "Comprimento", type: "number" },
                { key: "dimensoes.altura", label: "Altura", type: "number" },

                { key: "precos.preco_compra", label: "R$ compra", type: "currency" },
                { key: "precos.preco_venda", label: "R$ venda", type: "currency" },
                { key: "datas.data_cadastro", label: "Cadastro", type: "date" }
            ]
        };
    },
    methods: {
        handleDeleteItem(id) {
            console.log(`Máquina ${id}`);
        },
        handleEditItem(id) {
            console.log(`Máquina ${id} editada`);
        },
        handleCreateItem(id) {
            console.log(`Nova Máquina ${id} criada`);
        }
    }
}
</script>

<style></style>