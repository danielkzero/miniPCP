<template>
    <header>
        <Navbar :menu-data="menuData" />
    </header>
    <div class="pt-16 overflow-hidden bg-gray-100 h-screen dark:bg-gray-900">
        <sidebar-menu :SidebarData="SidebarData"></sidebar-menu>
        <main class="p-0 sm:ml-64">
            <div class="">
                <BreadCrumbComponente></BreadCrumbComponente>
                <router-view />
            </div>
        </main>
    </div>

</template>

<script>
import Navbar from '@/components/padrao/NavBar.vue';
import menuData from '@/dados/MenuData.json';
import SidebarMenu from '@/components/padrao/SidebarMenu.vue';
import SidebarData from '@/dados/SidebarData.json';
import BreadCrumbComponente from '@/components/BreadCrumb/index.vue';

export default {
    components: {
        Navbar,
        SidebarMenu,
        BreadCrumbComponente,
    },
    data() {
        return {
            menuData,
            SidebarMenu,
            SidebarData,
        };
    },
}
</script>