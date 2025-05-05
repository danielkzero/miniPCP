<template>
    <DataTable :data="grupos" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :pagination="true"
        :loading="loader" />
</template>

<script>
import { grupos } from '@/dados/EstruturaGrupos.json';
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            loader: false,
            grupos: [], // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "id_pai", label: "Pai", type: "text" },
                { key: 'sufixo_identificacao', label: 'Sufixo', type: 'text' },
                { key: "nome", label: "Nome", type: "text" },
                { key: "materia_prima", label: "Matéria prima", type: "YesOrNo" },
                { key: "data_cadastro", label: "Cadastro", type: "datetime" }
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
        },
        handleGetItems() {
            let _this = this;
            _this.loader = true; // Inicia o loader
            axios.get('/api/grupo')
                .then(response => {
                    // wait for 2 seconds to show the data
                    setTimeout(() => {
                        _this.loader = false; // Para o loader
                        _this.grupos = response.data.grupos; // Atualiza os setores após 2 segundos
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
        this.handleGetItems();
    }
}
</script>

<style></style>