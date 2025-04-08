<template>
    <DataTable :data="estoque" :columns="columns" classTable="text-xs" :pesquisar="true"
        @createItem="handleCreateItem" />
</template>

<script>
import { estoque } from '@/dados/EstruturaEstoque.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            estoque, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "codigo_produto", label: "Código", type: "text" },
                { key: "descricao", label: "Descrição", type: "text" },
                { key: "estoque", label: "Estoque", type: "number" },
                { key: "estoque_minimo", label: "Mínimo", type: "number" },
                { key: "estoque_maximo", label: "Máximo", type: "number" },
                { key: "unidade_medida", label: "Un.", type: "text" },
                { key: "localizacao", label: "Localização", type: "text" },
                { key: "descricao_local", label: "Setor", type: "text" },
                { key: "data_validade", label: "Validade", type: "date" },
                { key: "lote", label: "Lote", type: "text" },
                { key: 'datas.data_cadastro', label: 'Cadastro', type: 'date' }
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
        }

    }
}
</script>
