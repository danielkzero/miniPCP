<template>
    <div>
        <DataTable :data="maquinas" :columns="columns" classTable="text-xs" @deleteItem="handleDeleteItem"
            :pesquisar="true" @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true"
            :loading="loader" :pagination="true" :itemsInPage="[20, 50, 100]" />
    </div>
</template>
<script>
import DataTable from "@/components/DataTable/index.vue";
import axios from "@/axios.js"; // Importa o Axios para requisições HTTP
export default {
    name: 'MaquinasView',
    components: { DataTable },
    data() {
        return {
            loader: false, // Variável para controle do loader
            maquinas: [],
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
        },
        handleViewItem(id) {
            console.log(`Máquina ${id} visualizada`);
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Inicia o loader
            axios.get('/api/maquinas')
                .then(response => {
                    setTimeout(() => {
                        _this.loader = false; // Para o loader
                        _this.maquinas = response.data.maquinas; // Atualiza os setores após 2 segundos
                    }, 2000); // Espera 2 segundos para mostrar os dados
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    //_this.loader = false; // Para o loader
                });
        }
    },
    mounted() {
        this.handleGetItems(); // Chama a função para obter os itens ao montar o componente
    },
}
</script>