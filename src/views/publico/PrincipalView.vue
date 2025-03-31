<template>
    <header>
        <Navbar :menu-data="menuData" />
    </header>
    <sidebar-menu :SidebarData="SidebarData"></sidebar-menu>

    <main class="p-4 sm:ml-64">
        <router-view />
    </main>
</template>

<script>
import Navbar from '@/components/padrao/NavBar.vue';
import menuData from '@/dados/MenuData.json';
import SidebarMenu from '@/components/padrao/SidebarMenu.vue';
import SidebarData from '@/dados/SidebarData.json';
export default {
    components: {
        Navbar,
        SidebarMenu,

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