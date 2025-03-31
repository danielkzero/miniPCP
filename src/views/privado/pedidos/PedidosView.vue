<template>
    <div>
        <!-- DataTable Component -->
        <DataTable :data="pedidos" :columns="columns" @delete="handleDelete" @edit="handleEdit" />

        <!-- Modal Component -->
        <ModalComponent v-if="showModal" :item="selectedItem" :fields="fields" @save="handleSave" @close="closeModal" />
    </div>
</template>

<script>
import { pedidos } from '@/dados/EstruturaPedido.json'; // Importing order data from JSON
import moment from 'moment'; // Date formatting library
import DataTable from '@/components/DataTable/index.vue'; // Table component
import ModalComponent from '@/components/DataTable/ModalComponent.vue'; // Modal component

export default {
    components: { DataTable, ModalComponent },
    data() {
        return {
            pedidos, // Order data loaded from JSON
            showModal: false, // Controls modal visibility
            selectedItem: null, // Currently selected item for editing
            columns: [
                { key: "id", label: "ID" },
                { key: "nome_cliente", label: "Cliente" },
                { key: "data_cadastro", label: "Emitido em" },
                { key: "data_previsao_entrega", label: "Previsão de entrega" },
                { key: "status", label: "Status" },
            ],
            fields: [
                { key: "nome_cliente", label: "Cliente", required: true },
                { key: "data_cadastro", label: "Emitido em", type: "date", required: true },
                { key: "data_previsao_entrega", label: "Previsão de entrega", type: "date", required: true },
                { key: "status", label: "Status", required: true },
            ],
        };
    },
    methods: {
        /**
         * Deletes an item from the `pedidos` array.
         * @param {number} id - The ID of the item to delete.
         */
        handleDelete(id) {
            this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
        },

        /**
         * Opens the modal for editing an item.
         * @param {Object} item - The item to edit.
         */
        handleEdit(item) {
            this.selectedItem = { ...item }; // Clone the item to avoid direct mutation
            this.showModal = true;
        },

        /**
         * Saves an item (either updates an existing one or adds a new one).
         * @param {Object} item - The item to save.
         */
        handleSave(item) {
            if (item.id) {
                // Update existing item
                this.pedidos = this.pedidos.map(pedido => (pedido.id === item.id ? item : pedido));
            } else {
                // Add new item
                item.id = Date.now(); // Generate a unique ID
                this.pedidos.push(item);
            }
            this.closeModal(); // Close the modal after saving
        },

        /**
         * Closes the modal and resets the selected item.
         */
        closeModal() {
            this.showModal = false;
            this.selectedItem = null;
        },

        /**
         * Formats a date using moment.js.
         * @param {string|Date} data - The date to format.
         * @returns {string} - The formatted date (DD/MM/YYYY).
         */
        formatDate(data) {
            return moment(data).format('DD/MM/YYYY');
        },
    },
};
</script>