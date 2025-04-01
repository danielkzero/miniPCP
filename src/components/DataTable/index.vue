<template>
    <div>
        <!-- Search and Add Button -->
        <div class="flex justify-between mb-4 mx-4" v-if="pesquisar">
            <div class="relative mt-1 lg:w-90">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input v-model="search" type="text" id="topbar-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Procurar...">
            </div>
            <button @click="$router.push(urlCriar)" class="bg-indigo-500 text-white px-4 py-2 rounded" v-if="urlCriar">
                Cadastrar
            </button>
        </div>

        <!-- Table -->
        <table class="min-w-full divide-y divide-gray-200" :class="classTable">
            <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                    <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer" @click="sortBy(col.key)">
                        {{ col.label }}
                        <i v-if="sortKey === col.key"
                            :class="sortOrder === 'asc' ? 'bx bx-sort-up text-indigo-500' : 'bx bx-sort-down text-fuchsia-600'"></i>
                    </th>
                    <th class="px-6 py-3" v-if="actions">Ações</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="item in paginatedData" :key="item.id" class="odd:bg-white even:bg-gray-50">
                    <td v-for="col in columns" :key="col.key" class="px-6 py-2 whitespace-nowrap">
                        <template v-if="vetifyType(item, col)?.isHtml">
                            <span v-html="vetifyType(item, col).content">
                            </span>
                        </template>
                        <template v-else>
                            {{ vetifyType(item, col) }}
                        </template>
                    </td>
                    <td class="px-6 py-2 flex space-x-1" v-if="actions">
                        <button @click="$router.push(urlEditar + '/' + item.id)"
                            class="bg-yellow-500 text-white px-2 py-1 rounded" v-if="urlEditar">
                            <i class="bx bxs-edit"></i>
                        </button>
                        <button @click="hideItem(item.id)" class="bg-gray-500 text-white px-2 py-1 rounded"
                            v-if="$attrs.onHideItem">
                            <i class='bx bxs-hide'></i>
                        </button>
                        <button @click="commentItem(item.id)" class="bg-blue-500 text-white px-2 py-1 rounded"
                            v-if="$attrs.onCommentItem">
                            <i class="bx bx-message-square-dots"></i>
                        </button>
                        <button @click="printItem(item.id)" class="bg-indigo-500 text-white px-2 py-1 rounded"
                            v-if="$attrs.onPrintItem">
                            <i class="bx bx-printer"></i>
                        </button>
                        <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-2 py-1 rounded"
                            v-if="$attrs.onDeleteItem">
                            <i class="bx bx-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-center space-x-2 mt-4" v-if="pagination">
            <button @click="previousPage" :disabled="currentPage === 1"
                class="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50">
                Anterior
            </button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
                class="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50">
                Próximo
            </button>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    inheritAttrs: false,
    props: {
        data: Array,
        columns: Array,
        actions: Boolean,
        pesquisar: Boolean,
        pagination: Boolean,
        urlCriar: String,
        urlEditar: String,
        classTable: String
    },
    data() {
        return {
            search: "",
            sortKey: "id",
            sortOrder: "asc",
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        /**
         * Filtra e ordena os dados antes de paginar
         */
        filteredData() {
            return this.data
                .filter(item => this.searchPredicate(item))
                .sort((a, b) => this.sortPredicate(a, b));
        },
        /**
         * Retorna os dados paginados
         */
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        },
        /**
         * Calcula o total de páginas
         */
        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage);
        }
    },
    methods: {
        searchPredicate(item) {
            const searchTerm = this.search.toLowerCase();
            return this.columns.some(col => {
                const value = String(item[col.key]).toLowerCase();
                return value.includes(searchTerm);
            });
        },

        sortPredicate(a, b) {
            const getNestedValue = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
            let valueA = getNestedValue(a, this.sortKey);
            let valueB = getNestedValue(b, this.sortKey);

            if (typeof valueA === "number" && typeof valueB === "number") {
                return this.sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }

            return this.sortOrder === "asc"
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
        },

        vetifyType(item, col) {
            const keys = col.key.split(".");
            let value = item;

            for (const k of keys) {
                if (value && typeof value === "object") {
                    value = value[k];
                } else {
                    return "";
                }
            }

            switch (col.type) {
                case "text":
                    return value ?? "";
                case "number":
                    return value ?? 0;
                case "date":
                    return this.formatData(value);
                case "currency":
                    return this.formatCurrency(value);
                case "image":
                    return { isHtml: true, content: `<img src="${value}" alt="${value}" class="h-10 w-10 p-1" />` };
                default:
                    return value ?? "";
            }
        },

        formatData(value) {
            return moment(value).format("DD/MM/YYYY");
        },

        formatCurrency(value) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        },

        sortBy(key) {
            this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
            this.sortKey = key;
        },

        deleteItem(id) {
            this.$swal.fire({
                title: "Tem certeza?",
                text: "Você deseja excluir esse item permanentemente?",
                icon: "warning",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Não, cancelar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit("delete", id);
                }
            });
        },

        previousPage() {
            if (this.currentPage > 1) this.currentPage--;
        },

        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        }
    }
};
</script>
