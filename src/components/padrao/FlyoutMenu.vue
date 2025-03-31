<template>
    <div class="relative">
        <!-- Botão principal -->
        <template v-if="item.submenu">
            <button type="button"
                class="cursor-pointer flex items-center gap-x-1 text-sm/6 font-semibold text-indigo-200"
                @click="toggleSubMenu">
                {{ item.label }}
                <i v-if="item.submenu" :class="isSubMenuOpen ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"
                    class="text-xl transition-transform duration-300"></i>
            </button>
        </template>
        <template v-else>
            <router-link :to="item.link" class="text-sm/6 font-semibold text-indigo-200">{{ item.label }}</router-link>
        </template>
        <!-- Submenu com transição -->
        <transition name="submenu">
            <div v-show="item.submenu && isSubMenuOpen"
                class="text-indigo-700 absolute top-full -left-8 z-10 mt-6 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transform origin-top transition-all duration-300 ease-in-out">
                <div class="p-4">
                    <!-- Itens do submenu -->
                    <div v-for="(subItem, index) in item.submenu" :key="index"
                        class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                        <div
                            class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <i :class="subItem.icon" class="text-xl"></i>
                        </div>
                        <div class="flex-auto">
                            <router-link :to="subItem.link" class="block font-semibold text-indigo-700">
                                {{ subItem.title }}
                                <span class="absolute inset-0"></span>
                            </router-link>
                            <p class="mt-1 text-gray-600">{{ subItem.description }}</p>
                        </div>
                    </div>
                </div>
                <!-- Ações no submenu -->
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-indigo-50">
                    <router-link v-for="(action, index) in item.actions" :key="index" :to="action.link"
                        class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-indigo-900 hover:bg-indigo-100">
                        <i :class="action.icon" class="text-xl"></i>
                        {{ action.label }}
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'DropdownItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isSubMenuOpen: false,
        };
    },
    methods: {
        toggleSubMenu() {
            this.isSubMenuOpen = !this.isSubMenuOpen;
        },
    },
};
</script>

<style scoped>
/* Animação do submenu */
.submenu-enter-active,
.submenu-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
    opacity: 0;
    transform: scaleY(0.9);
}

.submenu-enter-to,
.submenu-leave-from {
    opacity: 1;
    transform: scaleY(1);
}
</style>
