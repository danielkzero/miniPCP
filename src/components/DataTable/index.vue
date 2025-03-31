<template>
    <div>
        <!-- Search and Add Button -->
        <div class="flex justify-between mb-4">
            <input v-model="search" type="text" placeholder="Pesquisar..." class="border p-2 rounded w-1/3" />
            <button @click="$emit('create')" class="bg-blue-500 text-white px-4 py-2 rounded">
                Cadastrar
            </button>
        </div>

        <!-- Table -->
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                    <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer" @click="sortBy(col.key)">
                        {{ col.label }}
                    </th>
                    <th class="px-6 py-3">Ações</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="item in filteredData" :key="item.id" class="odd:bg-white even:bg-gray-50">
                    <td v-for="col in columns" :key="col.key" class="px-6 py-4 whitespace-nowrap">
                        {{ formatData(item, col.key) }}
                    </td>
                    <td class="px-6 py-4 flex space-x-2">
                        <button @click="$emit('edit', item)" class="bg-yellow-500 text-white px-2 py-1 rounded">
                            Editar
                        </button>
                        <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-2 py-1 rounded">
                            Excluir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        data: Array,
        columns: Array,
    },
    data() {
        return {
            search: "",
            sortKey: "id",
            sortOrder: "asc",
        };
    },
    computed: {
        /**
         * Filters and sorts the data based on the search term and sort settings.
         */
        filteredData() {
            return this.data
                .filter(item => this.searchPredicate(item))
                .sort((a, b) => this.sortPredicate(a, b));
        },
    },
    methods: {
        /**
         * Predicate function for filtering data.
         * @param {Object} item - The item to filter.
         * @returns {boolean} - Whether the item matches the search term.
         */
        searchPredicate(item) {
            const searchTerm = this.search.toLowerCase();
            return this.columns.some(col => {
                const value = String(item[col.key]).toLowerCase();
                return value.includes(searchTerm);
            });
        },

        /**
         * Predicate function for sorting data.
         * @param {Object} a - First item.
         * @param {Object} b - Second item.
         * @returns {number} - Comparison result (-1, 0, or 1).
         */
        sortPredicate(a, b) {
            let valueA = a[this.sortKey];
            let valueB = b[this.sortKey];

            // Handle numeric sorting
            if (typeof valueA === "number" && typeof valueB === "number") {
                return this.sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }

            // Handle string sorting
            return this.sortOrder === "asc"
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
        },

        /**
         * Formats a value for display in the table.
         * @param {Object} item - The item containing the value.
         * @param {string} key - The key of the value to format.
         * @returns {string} - The formatted value.
         */
        formatData(item, key) {
            const value = item[key];
            if (key.includes("data") && value) {
                return moment(value).format("DD/MM/YYYY");
            }
            return value;
        },

        /**
         * Sorts the table by the specified key.
         * @param {string} key - The key to sort by.
         */
        sortBy(key) {
            this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
            this.sortKey = key;
        },

        /**
         * Deletes an item.
         * @param {number} id - The ID of the item to delete.
         */
        deleteItem(id) {
            if (confirm("Tem certeza que deseja excluir este item?")) {
                this.$emit("delete", id); // Emit the delete event to the parent component
            }
        },
    },
};
</script>