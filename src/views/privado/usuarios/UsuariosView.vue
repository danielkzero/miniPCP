<template>
    <DataTable :data="usuarios" :columns="columns" classTable="text-xs" :pesquisar="true" @deleteItem="handleDeleteItem"
        @editItem="handleEditItem" @createItem="handleCreateItem" :actions="true" :pagination="true" />
</template>

<script>
import DataTable from '@/components/DataTable/index.vue'; // Table component
import axios from '@/axios.js'; // Importa o Axios para requisições HTTP
export default {
    components: {
        DataTable
    },
    data() {
        return {
            usuarios: [], // Define os dados diretamente
            columns: [
                { key: "id", label: "ID", type: "text" },
                { key: "avatar", label: "Avatar", type: "image" },
                { key: "codigo", label: "Código", type: "text" },
                { key: "nome", label: "Nome", type: "text" },
                { key: "login", label: "Login", type: "text" },
                { key: "nome_nivel", label: "Nível Acesso", type: "text", uppercase: true },
                { key: "ativo", label: "Ativo", type: "YesOrNo" },
                { key: 'data_cadastro', label: 'Cadastro', type: 'datetime' }
            ]
        };
    },
    methods: {
        handleDeleteItem(id) {
            const response = axios.delete(`/api/usuarios/${id}`);
            if (response.status === 200) {
                this.$swal.fire({
                    title: 'Sucesso!',
                    text: `Usuário ${id} deletado com sucesso!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                this.usuarios = this.usuarios.filter(usuario => usuario.id !== id); // Remove o usuário da lista
            } else {
                this.$swal.fire({
                    title: 'Erro!',
                    text: `Erro ao deletar usuário ${id}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        handleEditItem(id) {
            console.log(`Usuário ${id}`);
            this.$router.push({ name: 'usuarios.nivel.edit', params: { id } });
        },
        handleCreateItem() {
            console.log(`Novo Usuário criado`);
            this.$router.push({ name: 'usuarios.nivel.create' });
        },
        async handleGetItems() {
            let _this = this;
            axios.get('/api/usuarios')
                .then(response => {
                    _this.usuarios = response.data.usuarios;
                })
                .catch(error => {
                    console.error('Erro ao buscar usuários:', error);
                    this.$swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao buscar usuários',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
    },
    created() {
        this.handleGetItems(); // Chama a função para buscar os usuários ao montar o componente
    }
}
</script>

<style></style>