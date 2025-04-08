<template>
    <DataTable :data="clientes" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
</template>

<script>
import { clientes } from '@/dados/EstruturaClientes.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
export default {
    components: {
        DataTable
    },
    data() {
        return {
            clientes, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "descricoes.nome", label: "Nome", type: "text" },
                { key: "descricoes.razao_social", label: "Razão", type: "text" },
                { key: "documentos", label: "cnpj", type: "array", typeArray: "tipo = cnpj", keyArray: "numero" },
                { key: "enderecos", label: "Cidade", type: "array", typeArray: "tipo = principal", keyArray: "cidade" },
                { key: "enderecos", label: "Estado", type: "array", typeArray: "tipo = principal", keyArray: "estado" },
                { key: "datas.data_cadastro", label: "Cadastro", type: "date" }
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
