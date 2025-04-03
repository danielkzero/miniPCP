<template>
    <div>
        <div class="flex justify-between mb-4">
            <input v-model="search" type="text" placeholder="Pesquisar..." class="border p-2 rounded w-1/3" />
            <button @click="openModal(null)" class="bg-blue-500 text-white px-4 py-2 rounded">Cadastrar</button>
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
                                <div
                                    class="bg-indigo-200 hover:bg-indigo-100 cursor-pointer p-1 rounded text-indigo-600">
                                    <i class='bx bxs-truck text-xl'></i><i class="bx bx-chevron-right text-xl"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Itens do Grupo -->
                    <tr v-for="item in grupo" :key="item.id" class="odd:bg-white even:bg-gray-50">
                        <td v-for="col in columns" :key="col.key" class="px-6 py-2 whitespace-nowrap">
                            {{ formatData(item, col.key) }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

    </div>
</template>

<script>

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
        formatData(item, key) {
            return key.includes("data") ? new Date(item[key]).toLocaleDateString("pt-BR") : item[key];
        },
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
    },
};
</script>