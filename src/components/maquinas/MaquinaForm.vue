<template>
    <form @submit.prevent="submitForm" class="space-y-6">
        <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" id="nome" v-model="maquina.nome" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        </div>

        <div>
            <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea id="descricao" v-model="maquina.descricao" rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
        </div>

        <div>
            <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
            <input type="number" id="preco" v-model="maquina.preco" step="0.01" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        </div>

        <div>
            <label for="icon" class="block text-sm font-medium text-gray-700">Ícone (Base64)</label>
            <textarea id="icon" v-model="maquina.icon" rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Cole aqui a string Base64 da imagem"></textarea>
            <div v-if="maquina.icon" class="mt-2">
                <p class="text-sm text-gray-500">Pré-visualização:</p>
                <img :src="maquina.icon" class="h-20 w-20 rounded" />
            </div>
        </div>

        <div class="flex justify-end space-x-3">
            <button type="button" @click="$emit('cancel')"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancelar
            </button>
            <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                {{ submitButtonText }}
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'MaquinaForm',
    props: {
        maquina: {
            type: Object,
            required: true
        },
        submitButtonText: {
            type: String,
            default: 'Salvar'
        }
    },
    methods: {
        submitForm() {
            this.$emit('submitEvent', this.maquina);
        }
    }
}
</script>