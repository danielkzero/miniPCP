<template>
    <DataTable :data="usuarios_nivel" :columns="columns" classTable="text-xs" :pesquisar="true" :subcolumns="subcolumns"
        :subcolumn_name="subcolumn_name" @deleteItem="handleDeleteItem" @editItem="handleEditItem"
        @createItem="handleCreateItem" :actions="true" :filhos="true" :pagination="true" />
</template>

<script>
import { usuarios_nivel } from '@/dados/EstruturaUsuariosNivel.json'; // Importa os dados diretamente do JSON
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            usuarios_nivel, // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "nome", label: "Nome", type: "text", uppercase: true },
                { key: 'data_cadastro', label: 'Cadastro', type: 'datetime' }
            ],
            subcolumn_name: "liberado",
            subcolumns: [
                { key: "id", label: "#", type: "number" },
                { key: "pagina", label: "página", type: "text" },
                { key: "visualizar", label: "Visualizar", type: "YesOrNo" },
                { key: "submenus", label: "Níveis", type: "array", typeArray: "arvore_nivel" },
            ]
        };
    },
    methods: {
        ///api/usuarios/niveis
        handleDeleteItem(id) {
            const response = axios.delete(`/api/niveis/${id}`);
            if (response.status === 200) {
                this.$swal.fire({
                    title: 'Sucesso!',
                    text: `Nivel de usuário ${id} deletado com sucesso!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                this.usuarios_nivel = this.usuarios_nivel.filter(usuario => usuario.id !== id); // Remove o usuário da lista
            } else {
                this.$swal.fire({
                    title: 'Erro!',
                    text: `Erro ao deletar nível usuário ${id}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        handleEditItem(id) {
            console.log(`Usuário ${id} editado`);
        },
        handleCreateItem(id) {
            console.log(`Novo Usuário ${id} criado`);
        },
        handleGetItems() {
            let _this = this;
            axios.get('/api/niveis')
                .then(response => {
                    _this.usuarios_nivel = response.data.niveis;
                    console.log(response);
                })
                .catch(error => {
                    console.error('Erro ao buscar usuários:', error);
                });
        }
    },
    mounted() {
        this.handleGetItems(); // Chama a função para buscar os dados ao montar o componente
    },
}
</script>
