<template>
    <nav class="flex p-4 min-h-14 " aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
                <router-link to="/"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                </router-link>
            </li>
            <li v-for="(route, index) in breadcrumbs" :key="index"
                :aria-current="index === breadcrumbs.length - 1 ? 'page' : null">
                <div class="flex items-center">
                    <template v-if="index > 0">
                        <i class="bx bx-chevron-right text-gray-400 me-1 text-2xl m-0 p-0"></i>
                        <router-link v-if="index !== breadcrumbs.length - 1" :to="route.path"
                            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                            {{ route.meta.title || route.name }}
                        </router-link>
                        <span v-else class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                            {{ route.meta.title || route.name }}
                        </span>
                    </template>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    computed: {
        breadcrumbs() {
            return this.$route.matched.map(route => ({
                path: route.path,
                name: route.name,
                meta: route.meta || {}
            }));
        }
    }
};
</script>