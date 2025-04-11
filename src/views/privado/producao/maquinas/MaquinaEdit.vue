<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Editar Máquina</h1>

        <MaquinaForm v-if="maquina" :maquina="maquina" submitButtonText="Atualizar Máquina" @submitEvent="updateMaquina"
            @cancel="cancel" />
        <div v-else class="text-center py-10">
            Carregando...
        </div>
    </div>
</template>

<script>
import MaquinaForm from '@/components/maquinas/MaquinaForm.vue';
import { maquinas } from '@/dados/EstruturaMaquina.json';
export default {
    components: { MaquinaForm },
    data() {
        return {
            maquina: null,
            maquinas
        };
    },
    methods: {
        updateMaquina(retornoJson) {
            console.log('Atualizando máquina:', retornoJson, this.maquina);
            this.maquina = retornoJson,
                this.maquinas.find((item) => {
                    item.id === this.maquina.id ? item = this.maquina : item
                    this.maquina.datas.data_alteracao = new Date().toISOString().split('T')[0]
                    this.maquina.datas.autor_alteracao = 1
                    this.maquina.datas.nome_autor_alteracao = 'ADMIN'
                })
            this.retornar();
        },
        cancel() {
            this.retornar();
        },
        found() {
            console.log('Procurando máquina com ID:', this.$route.params.id);
            const found = maquinas.find(m => m.id === parseInt(this.$route.params.id));
            if (found) {
                this.maquina = { ...found };
            } else {
                this.retornar();
            }
        },
        retornar() {
            this.$router.push('/maquinas')
        }
    },
    mounted() {
        this.found()
    },

}

</script>