<template>
    <div class="mx-4">
        <div class="bg-white border border-gray-200 rounded-lg">
            <h5 class="py-4 mb-4 border-b px-4 border-gray-200">#000000</h5>

            <div class="inline-flex rounded-md px-4 mb-4" role="group">
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Gerar pedido
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Visualizar
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Enviar por e-mail
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Enviar por WhatsApp
                </button>
            </div>

            <h5 class="pt-3 mb-3 border-t px-4 border-gray-200">Cliente</h5>
            <div class="mb-3 px-4 relative">
                <input type="text" class="form-input w-full border rounded p-2 border-gray-300"
                    placeholder="Digite o nome ou CNPJ/CPF do cliente e selecione" v-model="searchCliente"
                    @input="filtrarClientes" @focus="mostrarDropdown = true" @blur="fecharDropdownComDelay" />

                <!-- Lista suspensa -->
                <ul v-if="mostrarDropdown && clientesFiltrados.length"
                    class="absolute z-10 mt-1 w-1/2 bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto">
                    <li v-for="cliente in clientesFiltrados" :key="cliente.id"
                        @mousedown.prevent="selecionarCliente(cliente)"
                        class="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-sm">
                        {{ cliente.codigo }} - {{ cliente.nome }}
                    </li>
                </ul>

                <div v-if="clienteSelecionado" class="mt-2 text-sm text-gray-600">
                    <strong>Selecionado:</strong> {{ clienteSelecionado.codigo }} - {{ clienteSelecionado.nome }}
                </div>
            </div>

            <h5 class="pt-3 mb-3 border-t px-4 border-gray-200">Produtos</h5>
            <div class="px-4">
                <input type="text" class="form-input w-full border rounded p-2 mb-3 border-gray-300"
                    placeholder="Digite o código ou nome do produto para adicionar ao pedido">
            </div>
            <div>
                <DataTable :actions="true" :data="items" :columns="columns" @deleteItem="handleDeleteItem"
                    :loading="loader" :pagination="true" :itemsInPage="[20, 50, 100]" />

            </div>
            <h5 class="pt-3 border-t px-4 border-gray-200">Detalhes</h5>
            <div class="mb-3">
                <div class="flex justify-between gap-10 mt-3 text-sm px-6 py-3">
                    <div>
                        <label class="text-gray-500">Itens no pedido</label>
                        <div class="text-center">0</div>
                    </div>
                    <div>
                        <label class="text-gray-500">Quantidade total</label>
                        <div class="text-center">0</div>
                    </div>
                    <div>
                        <label class="text-gray-500">Valor total</label>
                        <h4 class="text-lg font-semibold">R$ 0,00</h4>
                    </div>
                </div>
            </div>

            <div class="inline-flex rounded-md pt-4 mb-4 border-t px-4 border-gray-200 w-full" role="group">
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Gerar pedido
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Visualizar
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Enviar por e-mail
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg 
                    hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700">
                    Enviar por WhatsApp
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import DataTable from '@/components/DataTable/index.vue'; // Importando o componente DataTable
export default {
    components: {
        DataTable
    },
    data() {
        return {
            items: [
                { "codigo": 1, "descricao": "Produto A", "quantidade": 10 },
                { "codigo": 2, "descricao": "Produto B", "quantidade": 5 },
                { "codigo": 3, "descricao": "Produto C", "quantidade": 20 }
            ], // Lista de itens do pedido
            columns: [
                { key: "codigo", label: "Código", type: "text" },
                { key: "descricao", label: "Descrição", type: "text" },
                { key: "quantidade", label: "Quantidade", type: "number", input: true, class: "w-32" },
            ],
            // variaveis para o cliente
            searchCliente: '',
            mostrarDropdown: false,
            clienteSelecionado: null,
            clientes: [
                { id: 1, nome: 'João Silva', codigo: 'C001' },
                { id: 2, nome: 'Maria Souza', codigo: 'C002' },
                { id: 3, nome: 'Carlos Lima', codigo: 'C003' },
            ],
            clientesFiltrados: []
        };
    },
    methods: {
        filtrarClientes() {
            const termo = this.searchCliente.toLowerCase();
            this.clientesFiltrados = this.clientes.filter(cliente =>
                cliente.nome.toLowerCase().includes(termo) || cliente.codigo.toLowerCase().includes(termo)
            );
        },
        selecionarCliente(cliente) {
            this.clienteSelecionado = cliente;
            this.searchCliente = `${cliente.codigo} - ${cliente.nome}`;
            this.mostrarDropdown = false;
        },
        fecharDropdownComDelay() {
            setTimeout(() => {
                this.mostrarDropdown = false;
            }, 200);
        },
        handleEditItem(item) {
            // Lógica para editar o item
            console.log("Editando item:", item);
        },
        handleDeleteItem(item) {
            // Lógica para deletar o item
            console.log("Deletando item:", item);
            this.items = this.items.filter(i => i.codigo !== item.codigo);
        },
        handleCreateItem() {
            // Lógica para criar um novo item
            console.log("Criando novo item");
        },
        handleGerarItem() {
            // Lógica para gerar um novo item
            console.log("Gerando novo item");
        }
    }
}
</script>

<style></style>