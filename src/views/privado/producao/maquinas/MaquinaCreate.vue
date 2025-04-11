<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Nova Máquina</h1>

        <MaquinaForm :maquina="maquina" submitButtonText="Criar Máquina" @submit="createMaquina" @cancel="cancel" />
    </div>
</template>

<script>
import MaquinaForm from '@/components/maquinas/MaquinaForm.vue'
export default {
    name: 'MaquinaCreate',
    components: {
        MaquinaForm
    },
    data() {
        return {
            maquina: {
                nome: '',
                descricao: '',
                preco: 0,
                icon: '',
                datas: {
                    data_cadastro: new Date().toISOString().split('T')[0],
                    autor_cadastro: 1,
                    nome_autor_cadastro: 'ADMIN',
                    data_alteracao: null,
                    autor_alteracao: null,
                    nome_autor_alteracao: null,
                    data_exclusao: null,
                    autor_exclusao: null,
                    nome_autor_exclusao: null,
                    motivo_exclusao: null,
                    excluido: false
                }
            }
        }
    },
    methods: {
        async createMaquina() {
            console.log('Criando máquina:', this.maquina)
            // Aqui você faria a chamada para a API para criar a máquina
            this.$router.push('/maquinas');
        },
        async cancel() {
            this.$router.push('/maquinas');
        }
    }
}
</script>