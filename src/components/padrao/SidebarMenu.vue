<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <!-- Renderização dos itens do menu principal -->
                <li v-for="item in SidebarData.menu" :key="item.id">
                    <div>
                        <!-- Botão do menu principal -->
                        <template v-if="item?.link">
                            <a :href="item.link"
                                class="flex items-center w-full p-2 text-gray-500 transition duration-75 rounded-lg group hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-700 dark:hover:bg-indigo-700">

                                <i :class="item.icon" class="bx text-xl flex-shrink-0"></i>
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ item.nome
                                    }}</span>
                            </a>
                        </template>
                        <template v-else>
                            <button type="button" @click="toggleMenu(item.id)"
                                class="flex items-center w-full p-2 cursor-pointer text-gray-600 rounded-lg group hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-700 dark:hover:bg-indigo-700">
                                <i :class="item.icon" class="bx text-xl flex-shrink-0"></i>
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ item.nome
                                    }}</span>
                                <i v-if="item?.submenu" :class="['bx text-xl transition-transform duration-200',
                                    openMenus.includes(item.id) ? 'bx-chevron-down' : 'bx-chevron-right']"></i>
                            </button>
                        </template>
                        <!-- Transição para o submenu -->
                        <transition enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-150 ease-in"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
                            leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                            <ul v-if="item?.submenu && openMenus.includes(item.id)"
                                class="py-2 space-y-2 overflow-hidden">
                                <!-- Renderização dos subitens -->
                                <li v-for="subItem in item.submenu" :key="subItem.id">
                                    <div v-if="subItem.submenu">
                                        <!-- Submenu aninhado -->
                                        <button type="button" @click="toggleMenu(subItem.id)"
                                            class="flex items-center w-full p-2 text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pl-11">
                                            <i :class="subItem.icon" class="bx text-xl flex-shrink-0"></i>
                                            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{
                                                subItem.nome }}</span>
                                            <i v-if="subItem?.submenu"
                                                :class="['bx text-xl transition-transform duration-200',
                                                    openMenus.includes(subItem.id) ? 'bx-chevron-down' : 'bx-chevron-right']"></i>
                                        </button>

                                        <!-- Transição para o submenu aninhado -->
                                        <transition enter-active-class="transition-all duration-200 ease-out"
                                            leave-active-class="transition-all duration-150 ease-in"
                                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
                                            leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                                            <ul v-if="subItem?.submenu && openMenus.includes(subItem.id)"
                                                class="py-2 space-y-2 overflow-hidden">
                                                <li v-for="nestedItem in subItem.submenu" :key="nestedItem.id">
                                                    <a :href="nestedItem.link"
                                                        class="flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-700 dark:hover:bg-indigo-700">
                                                        <span :class="[
                                                            '-m-4 w-2 h-2 rounded-full mr-3 group-hover:bg-indigo-600',
                                                            nestedItem.active ? 'bg-indigo-500' : 'bg-gray-400'
                                                        ]"></span>
                                                        {{ nestedItem.nome }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </transition>
                                    </div>
                                    <a v-else :href="subItem.link"
                                        class="flex items-center w-full p-2 text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-700 dark:hover:bg-indigo-700">
                                        <span :class="[
                                            '-m-4 w-2 h-2 rounded-full mr-3 group-hover:bg-indigo-600',
                                            subItem.active ? 'bg-indigo-500' : 'bg-gray-400'
                                        ]"></span>
                                        {{ subItem.nome }}
                                    </a>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        SidebarData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            openMenus: []
        };
    },
    methods: {
        toggleMenu(menuId) {
            if (this.openMenus.includes(menuId)) {
                this.openMenus = this.openMenus.filter(id => id !== menuId);
            } else {
                this.openMenus.push(menuId);
            }
        }
    },
    created() {
        // Abre automaticamente menus que estão marcados como active ou open
        this.SidebarData.menu.forEach(item => {
            if (item.active || item.open) {
                this.openMenus.push(item.id);
            }

            // Verifica também subitens ativos para abrir o menu pai
            if (item.submenu) {
                const hasActiveChild = item.submenu.some(subItem => subItem.active);
                if (hasActiveChild && !this.openMenus.includes(item.id)) {
                    this.openMenus.push(item.id);
                }
            }
        });
    }
};
</script>