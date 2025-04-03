<template>
    <DataTableRegistroEntrega :data="data" :columns="columns"></DataTableRegistroEntrega>
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
                { key: 'id', label: 'id' },
                { key: "codigo_pedido", label: "Código Pedido" },
                { key: "codigo_ordem_producao", label: "Ordem Produção" },
                { key: "codigo", label: "Código" },
                { key: "nome_produto", label: "Descrição" },
                { key: "quantidade_emitida", label: "Qtd Emitida" },
                { key: "peso", label: "Peso" },
                { key: "datas.data_cadastro", label: "cadastro" }
            ]
        };
    }
};
</script>