<template>
    <div>
        <DataTable :data="maquinas" :columns="columns" classTable="text-xs" @deleteItem="handleDeleteItem"
            :pesquisar="true" @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" />
    </div>
</template>
<script>
import { maquinas } from "@/dados/EstruturaMaquina.json";
import DataTable from "@/components/DataTable/index.vue";
export default {
    name: 'MaquinasView',
    components: { DataTable },
    data() {
        return {
            maquinas,
            columns: [
                { key: "id", label: "ID", type: "number" },
                { key: "icon", label: "Ícone", type: "image" },
                { key: "nome", label: "Nome", type: "Text" },
                { key: "descricao", label: "Descrição", type: "Text" },
                { key: "preco", label: "Preço", type: "currency" },

            ]
        }
    },
    methods: {
        toggleStatus(maquina) {
            maquina.datas.excluido = !maquina.datas.excluido
            console.log(`Máquina ${maquina.id} status alterado para ${maquina.datas.excluido ? 'inativo' : 'ativo'}`)
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        },
        handleDeleteItem(id) {
            console.log(`Máquina ${id}`);
        },
        handleEditItem(id) {
            console.log(`Máquina ${id} editada`);
        },
        handleCreateItem(id) {
            console.log(`Nova Máquina ${id} criada`);
        }
    },
}
</script>