<template>
    <DataTableRegistroEntrega :data="data" :columns="columns" :pesquisar="true" @createItem="createItem">
    </DataTableRegistroEntrega>
</template>

<script>
import DataTableRegistroEntrega from "@/components/DataTable/RegistroEntrega.vue";
import { registro_entrega } from '@/dados/EstruturaRegistroEntrega.json';

export default {
    components: {
        DataTableRegistroEntrega
    },
    data() {
        return {
            data: registro_entrega, // Define os dados diretamente
            columns: [
                { key: 'id', label: 'id', type: "number" },
                { key: "codigo_pedido", label: "Código Pedido", type: "text" },
                { key: "codigo_ordem_producao", label: "Ordem Produção", type: "text" },
                { key: "codigo", label: "Código", type: "text" },
                { key: "nome_produto", label: "Descrição", type: "text" },
                { key: "quantidade_emitida", label: "Qtd Emitida", type: "number" },
                { key: "peso", label: "Peso", type: "number" },
                { key: "datas.data_cadastro", label: "cadastro", type: "date" }
            ]
        };
    },
    methods: {
        createItem() {
            this.$router.push('/producao/registro_entrega/novo');
        }
    }
};
</script>