<template>
    <div class="text-xs w-2xl mx-auto bg-white shadow-md rounded-lg p-4">
        <div class="flex justify-between mb-4">
            <button class="bg-indigo-500 text-white px-4 py-2 rounded">+ ADICIONAR REGISTRO</button>
            <button class="bg-indigo-500 text-white px-4 py-2 rounded" @click="imprimir">
                <i class="bx bxs-printer"></i> IMPRIMIR
            </button>
        </div>
        <div ref="recibo">
            <DataTableEntregaMercadoriaComponente :groupedData="groupedData" :vias="vias" :itemEditado="itemEditado"
                :editarItem="editarItem" :deletarItem="deletarItem" :salvarItem="salvarItem"
                :cancelarItem="cancelarItem" v-model:editarIndex="editarIndex" :show-actions="true" />
        </div>
    </div>
</template>

<script>
import { registro_entrega } from '@/dados/EstruturaRegistroEntrega.json';
import DataTableEntregaMercadoriaComponente from './DataTableEntregaMercadoriaComponente.vue'

export default {
    components: {
        DataTableEntregaMercadoriaComponente
    },
    data() {
        return {
            data: [],
            id: this.$route.params.id,
            vias: 2,
            editarIndex: null,
            itemEditado: null,
        };
    },
    created() {
        // Filtra os dados de acordo com o ID da rota
        this.data = registro_entrega.filter(item => item.codigo_registro_entrega == this.id);
    },
    computed: {
        groupedData() {
            return this.data.reduce((acc, curr) => {
                const codigo = curr.codigo_registro_entrega;
                if (!acc[codigo]) acc[codigo] = [];
                acc[codigo].push(curr);
                return acc;
            }, {});
        }
    },
    methods: {
        imprimir() {
            // lógica de impressão aqui
            const printContents = this.$refs.recibo.innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // recarrega para restaurar o estado original
        },
        editarItem(id) {
            this.editarIndex = id;
            const itemOriginal = this.data.find(item => item.id === id);
            this.itemEditado = { ...itemOriginal }; // clona o item
        },
        deletarItem(id) {
            // lógica de exclusão aqui
            this.data = this.data.filter(item => item.id !== id);
        },
        salvarItem(item) {
            const index = this.data.findIndex(i => i.id === item.id);
            if (index !== -1) {
                this.data[index].quantidade_emitida = this.itemEditado.quantidade_emitida;
            }
            this.editarIndex = null;
            this.itemEditado = null;
        },
        cancelarItem(id) {
            this.editarIndex = null;
            this.itemEditado = null;
        },
    }
};
</script>