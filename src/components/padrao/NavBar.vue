<template>
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div class=" px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar"
                        class="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
                        <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg id="toggleSidebarMobileClose" class="hidden w-6 h-6" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <a href="/" class="flex ml-2 md:mr-24">
                        <logo-view class="w-10 h-10  mr-1" />
                        <div class="self-center text-xl font-semibold sm:text-xl whitespace-nowrap">
                            <span class="text-indigo-700">Mini</span>PCP
                        </div>
                    </a>
                    <form action="#" method="GET" class="hidden lg:block lg:pl-3.5">
                        <label for="topbar-search" class="sr-only">Procurar</label>
                        <div class="relative mt-1 lg:w-96">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input type="text" id="topbar-search"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
                                placeholder="Procurar...">
                        </div>
                    </form>
                </div>
                <div class="flex items-center">
                    <div class="hidden mr-3 -mb-1 sm:block">
                        <span></span>
                    </div>

                    <button id="toggleSidebarMobileSearch" type="button"
                        class="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100">
                        <span class="sr-only">Procurar</span>

                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <!-- Menu do Usuário -->
                    <div class="flex items-center">
                        <div class="flex items-center ms-3 relative">
                            <!-- Botão do Avatar -->
                            <div>
                                <button @click="toggleUserMenu" ref="userButton"
                                    class="flex text-sm bg-gray-100 rounded-full focus:ring-gray-300"
                                    aria-expanded="false">
                                    <span class="sr-only">Menu de usuário</span>
                                    <i class="bx bxs-user-circle text-3xl text-gray-500"></i>
                                </button>
                            </div>
                            <!-- Dropdown Flutuante -->
                            <transition enter-active-class="transition-all duration-200 ease-out"
                                leave-active-class="transition-all duration-150 ease-in"
                                enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                                <div v-if="isUserMenuOpen"
                                    class="absolute right-0 top-0 mt-11 w-56 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 ring-opacity-5 z-50">
                                    <div class="px-4 py-3 border-b border-gray-200">
                                        <p class="text-sm font-medium text-gray-900">Admin</p>
                                        <p class="text-xs text-gray-500 truncate">
                                            Administrador
                                        </p>
                                    </div>
                                    <ul class="py-1">
                                        <li>
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <i class="bx bxs-dashboard me-2"></i> Perfil
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <i class="bx bx-cog me-2"></i> Configurações
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <i class="bx bx-power-off me-2"></i> Sair
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import LogoView from '@/components/logo/LogoView.vue';
export default {
    components: {
        LogoView
    },
    data() {
        return {
            isUserMenuOpen: false // Controla a visibilidade do menu flutuante
        };
    },
    methods: {
        toggleUserMenu() {
            this.isUserMenuOpen = !this.isUserMenuOpen;
        },
        closeUserMenu() {
            this.isUserMenuOpen = false;
        }
    },
    mounted() {
        // Fecha o menu quando o usuário clica fora dele
        document.addEventListener('click', (event) => {
            if (!this.$refs.userButton.contains(event.target)) {
                this.closeUserMenu();
            }
        });
    }
};
</script>