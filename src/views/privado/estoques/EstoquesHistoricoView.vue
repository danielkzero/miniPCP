<template>
    <DataTable :data="historico_estoque" :columns="columns" classTable="text-xs" :pesquisar="true" />
</template>

<script>
/*
{
    "id": 1,
    "id_produto": 1,
    "nome_produto": "SUPORTE PLACA DE MOTO",
    "tipo_operacao": {
        "id": 1,
        "nome": "ENTRADA",
        "natureza": 0
    },
    "quantidade": 10,
    "datas": {
        "data_cadastro": "2021-01-01",
        "autor_cadastro": 1,
        "nome_autor_cadastro": "ADMIN",
        "data_alteracao": "2021-01-01",
        "autor_alteracao": 1,
        "nome_autor_alteracao": "ADMIN",
        "data_exclusao": null,
        "autor_exclusao": null,
        "nome_autor_exclusao": null,
        "motivo_exclusao": null,
        "excluido": false
    }
},
*/
import { historico_estoque } from '@/dados/EstruturaEstoqueHistorico.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            historico_estoque, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "id_produto", label: "ID Produto", type: "text" },
                { key: "nome_produto", label: "Nome Produto", type: "text" },
                { key: "tipo_operacao.nome", label: "Tipo Operação", type: "text" },
                { key: "quantidade", label: "Quantidade", type: "number" },
                { key: "datas.nome_autor_cadastro", label: "Autor", type: "text" },
                { key: 'datas.data_cadastro', label: 'Cadastro', type: 'date' },
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
