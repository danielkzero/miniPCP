<template>
    <div>
        <!-- Search and Add Button -->
        <div class="flex justify-between mb-4 mx-4" v-if="pesquisar || $attrs.onCreateItem">
            <div class="relative mt-1 lg:w-90" v-if="pesquisar">
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
            <button @click="createItem" class="bg-indigo-500 text-white px-4 py-2 rounded" v-if="$attrs.onCreateItem">
                Novo
            </button>
        </div>

        <div class="overflow-auto">
            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200" :class="classTable">
                <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3" v-if="filhos">
                            <i class='bx bx-plus text-xl text-gray-300'></i>
                        </th>
                        <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer"
                            @click="sortBy(col.key)">
                            {{ col.label }}
                            <i v-if="sortKey === col.key"
                                :class="sortOrder === 'asc' ? 'bx bx-sort-up text-indigo-500' : 'bx bx-sort-down text-fuchsia-600'"></i>
                        </th>
                        <th class="px-6 py-3" v-if="actions">Ações</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <template v-for="item in paginatedData" :key="item.id">
                        <tr class="odd:bg-white even:bg-gray-50">
                            <td class="px-6 py-2 whitespace-nowrap w-1 h-1" v-if="filhos"
                                @click="toggleChildren(item.id)">
                                <i class='bx bx-plus text-xl text-indigo-600 hover:text-indigo-700 cursor-pointer'></i>
                            </td>
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
                                <button @click="editItem(item.id)" class="bg-yellow-500 text-white px-2 py-1 rounded"
                                    v-if="$attrs.onEditItem">
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
                        <Transition enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-150 ease-in"
                            enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                            <tr v-if="expandedRows[item.id]">
                                <td :colspan="columns.length + (filhos ? 1 : 0) + (actions ? 1 : 0)" class="ps-6 pb-2">

                                    <table class="min-w-full divide-y divide-gray-300 rounded-2xl" :class="classTable">
                                        <thead
                                            class="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <tr>
                                                <th v-for="col in subcolumns" :key="col.key"
                                                    class="px-6 py-3 cursor-pointer">
                                                    {{ col.label }}
                                                </th>
                                                <th class="px-6 py-3" v-if="$attrs.onGerarOP">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 text-gray-500">
                                            <template v-for="subItem in item[subcolumn_name]" :key="subItem.id">
                                                <tr class="odd:bg-gray-50 even:bg-gray-50">
                                                    <td v-for="col in subcolumns" :key="col.key"
                                                        class="px-6 py-2 whitespace-nowrap">
                                                        <span v-if="col.onClick" @click="col.onClick(subItem)">
                                                            <template v-if="vetifyType(subItem, col)?.isHtml">
                                                                <span v-html="vetifyType(subItem, col).content">
                                                                </span>
                                                            </template>
                                                            <template v-else>
                                                                <span
                                                                    class="underline text-indigo-500 hover:text-indigo-700 cursor-pointer">{{
                                                                        vetifyType(subItem, col) }}</span>
                                                            </template>
                                                        </span>

                                                        <span v-else>
                                                            <template v-if="vetifyType(subItem, col)?.isHtml">
                                                                <span v-html="vetifyType(subItem, col).content">
                                                                </span>
                                                            </template>
                                                            <template v-else>
                                                                {{ vetifyType(subItem, col) }}
                                                            </template>
                                                        </span>
                                                    </td>
                                                    <td class="px-6 py-2 flex space-x-1" v-if="$attrs.onGerarItem">
                                                        <button @click="gerarItem(subItem.id)"
                                                            class="bg-indigo-500 text-white px-2 py-1 rounded">
                                                            Gerar ordem de produção <i class='bx bx-chevron-right'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </Transition>
                    </template>
                </tbody>
            </table>
        </div>


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
        subcolumns: Array,
        subcolumn_name: String,
        actions: Boolean,
        filhos: Boolean,
        pesquisar: Boolean,
        pagination: Boolean,
        classTable: String
    },
    data() {
        return {
            search: "",
            sortKey: "id",
            sortOrder: "asc",
            currentPage: 1,
            itemsPerPage: 10,
            expandedRows: {} // Armazena o estado de expansão
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
        toggleChildren(rowId) {
            this.expandedRows[rowId] = !this.expandedRows[rowId];
        },


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


            if (Array.isArray(value)) {
                // Verifica o tipo desejado
                if (col.type === "array") {

                    if (col.typeArray == "anexo") {
                        // exemplo: retorna os tipos com ícones
                        if (value.length == 1)
                            return { isHtml: true, content: `<div><i class='bx bx-paperclip bx-rotate-90 text-2xl text-gray-500'></i></div>` };
                        else if (value.length > 1)
                            return {
                                isHtml: true, content: `
                        <div class="relative w-fit">
                            <i class='bx bx-paperclip bx-rotate-90 text-2xl text-gray-500'></i>
                            <span class="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            ${value.length}
                            </span>
                        </div>` };
                        else
                            return null;
                    } else {
                        const type = col.typeArray.split("=")[1].trim(); // Exemplo: "tipo = cnpj"
                        const key = col.keyArray.trim(); // Exemplo: "numero"
                        const filteredValue = value.find((item) => {
                            if (item.tipo.toLowerCase() === type.toLowerCase()) {
                                return item[key];
                            }
                        });
                        return filteredValue ? filteredValue[key] : null;
                    }
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
                case "time":
                    return this.formatDuration(value);
                case "YesOrNo":
                    return value ? { isHtml: true, content: `<i class="bx bx-check text-xl text-green-500"></i>` } : { isHtml: true, content: `<i class="bx bx-x text-xl text-red-500"></i>` };
                case "progressbar":
                    return {
                        isHtml: true, content: `
                        <div class="w-full bg-gray-200 rounded-full h-2 relative bg-amber-500">
                            <div class="${this.formatPercentProgress(value)} h-2 rounded-full text-center text-white font-bold flex items-center justify-center"
                                style="width: ${value ?? 0}%;">
                            </div>
                        </div>` };
                case "status":
                    let className = "text-gray-700";
                    if (value.toLowerCase() == 'entregue') {
                        className = "text-green-700";
                    }
                    return { isHtml: true, content: `<div class="${className}">${value}</div>` }
                case "image":
                    return { isHtml: true, content: `<img src="${value}" alt="${value}" class="h-10 w-10 p-1" />` };
                default:
                    return value ?? "";
            }
        },

        formatPercentProgress(value) {
            switch (true) {
                case value < 30:
                    return "bg-red-500";
                case value < 50:
                    return "bg-amber-500";
                case value < 70:
                    return "bg-yellow-500";
                case value < 90:
                    return "bg-blue-500";
                case value < 100:
                    return "bg-indigo-500";
                default: "bg-indigo-500";
            }
        },

        formatData(value) {
            return moment(value).format("DD/MM/YYYY");
        },

        formatDuration(seconds) {
            const duration = moment.duration(seconds, 'seconds');
            const parts = [];

            const days = duration.days();
            if (days > 0) parts.push(`${days} ${days > 1 ? 'dias' : 'dia'}`);

            const hours = duration.hours();
            if (hours > 0) parts.push(`${hours} ${hours > 1 ? 'horas' : 'hora'}`);

            const minutes = duration.minutes();
            if (minutes > 0) parts.push(`${minutes} ${minutes > 1 ? 'minutos' : 'minuto'}`);

            const secs = duration.seconds();
            if (secs > 0) parts.push(`${secs} ${secs > 1 ? 'segundos' : 'segundo'}`);

            if (parts.length === 0) return '0 segundos';
            if (parts.length === 1) return parts[0];

            // Junta os elementos com vírgulas e adiciona "e" antes do último
            return parts.slice(0, -1).join(', ') + ' e ' + parts[parts.length - 1];
        },

        formatCurrency(value) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        },

        sortBy(key) {
            this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
            this.sortKey = key;
        },

        gerarItem(id) {
            this.$emit("gerarItem", id);
        },
        createItem() {
            this.$emit("createItem");
        },

        editItem(id) {
            this.$emit("editItem", id);
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
