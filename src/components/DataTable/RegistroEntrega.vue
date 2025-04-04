<template>
    <div>
        <div class="flex justify-between mb-4 mx-4">
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

        <table class="min-w-full divide-y divide-gray-200 text-xs">
            <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                    <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer" @click="sortBy(col.key)">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <template v-for="(grupo, codigo) in groupedData" :key="codigo">
                    <!-- Cabeçalho do Grupo -->
                    <tr class="bg-indigo-200 text-black font-bold">
                        <td :colspan="columns.length" class="px-6 py-2">
                            <div class=" flex justify-between">
                                <span class="text-xl">Nº Série: {{ codigo }}</span>
                                <router-link :to="'/producao/registro_entrega/' + codigo"
                                    class="bg-indigo-200 hover:bg-indigo-100 cursor-pointer p-1 rounded text-indigo-600">
                                    <i class='bx bxs-truck text-xl'></i><i class="bx bx-chevron-right text-xl"></i>
                                </router-link>
                            </div>
                        </td>
                    </tr>

                    <!-- Itens do Grupo -->
                    <tr v-for="item in grupo" :key="item.id" class="odd:bg-white even:bg-gray-50">
                        <td v-for="col in columns" :key="col.key" class="px-6 py-2 whitespace-nowrap">
                            {{ vetifyType(item, col) }}
                        </td>
                    </tr>
                </template>
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
        pesquisar: Boolean,
    },
    data() {
        return {
            search: "",
            sortKey: "id",
            sortOrder: "asc",
            showModal: false,
            selectedItem: null
        };
    },
    computed: {
        filteredData() {
            if (!this.data) {
                return true;
            }
            return this.data
                .filter(item => JSON.stringify(item).toLowerCase().includes(this.search.toLowerCase()))
                .sort((a, b) => {
                    let valueA = a[this.sortKey];
                    let valueB = b[this.sortKey];
                    return this.sortOrder === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
                });
        },
        groupedData() {
            if (!this.data) {
                return true;
            }
            return this.filteredData.reduce((acc, item) => {
                const grupo = item.codigo_registro_entrega;
                if (!acc[grupo]) acc[grupo] = [];
                acc[grupo].push(item);
                return acc;
            }, {});
        },
    },
    methods: {
        sortBy(key) {
            this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
            this.sortKey = key;
        },

        openModal(item) {
            this.selectedItem = item;
            this.showModal = true;
        },

        deleteItem(id) {
            this.$emit("delete", id);
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

        createItem() {
            this.$emit("createItem");
        },
    },
};
</script>