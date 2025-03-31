<template>
    <div class="bg-gray-50 py-24 sm:py-32">
        <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <p
                class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
                Controle sua produção com a Aion
            </p>
            <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                <!-- Card 1 - Controle de Produção -->
                <div class="relative lg:row-span-2">
                    <div class="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                    <div
                        class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                        <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Controle
                                de Produção</p>
                            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Gerencie ordens de
                                produção, acompanhe o progresso em tempo real e otimize seus processos industriais.</p>
                        </div>
                        <div class="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                            <div
                                class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                <img class="size-full object-cover object-top"
                                    src="https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                    alt="Painel de controle de produção">
                            </div>
                        </div>
                    </div>
                    <div
                        class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]">
                    </div>
                </div>

                <!-- Card 2 - Gestão de Estoques -->
                <div class="relative max-lg:row-start-1">
                    <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                    <div
                        class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                        <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Gestão
                                de Estoques</p>
                            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Controle de
                                matéria-prima, insumos e produtos acabados com alertas de reposição automáticos.</p>
                        </div>
                        <div
                            class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                            <img class="w-full max-lg:max-w-xs"
                                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Gestão de estoques">
                        </div>
                    </div>
                    <div
                        class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]">
                    </div>
                </div>

                <!-- Card 3 - Rastreabilidade -->
                <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                    <div class="absolute inset-px rounded-lg bg-white"></div>
                    <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                        <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                Rastreabilidade</p>
                            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Histórico completo de
                                cada produto, desde a matéria-prima até o cliente final.</p>
                        </div>
                        <div class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                            <img class="h-[min(152px,40cqw)] object-cover"
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Rastreabilidade">
                        </div>
                    </div>
                    <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
                </div>

                <!-- Card 4 - Business Intelligence -->
                <div class="relative lg:row-span-2">
                    <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
                    </div>
                    <div
                        class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                        <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Business
                                Intelligence</p>
                            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Relatórios e dashboards
                                em tempo real para tomada de decisão estratégica.</p>
                        </div>
                        <div class="relative min-h-[30rem] w-full grow">
                            <div
                                class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                                    <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                                        <div
                                            class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                                            Dashboard.jsx</div>
                                        <div class="border-r border-gray-600/10 px-4 py-2">Relatorios.jsx</div>
                                    </div>
                                </div>
                                <div class="px-6 pt-6 pb-14">
                                    <img class="w-full"
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                        alt="Business Intelligence">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
                    </div>
                </div>
            </div>

            <!-- Seção de outras funcionalidades -->
            <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-xl bg-white p-6 shadow-sm">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <i class="bx bx-calendar text-2xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">Planejamento</h3>
                    <p class="mt-2 text-sm text-gray-600">Capacidade de planejamento de produção com antecedência.</p>
                </div>
                <div class="rounded-xl bg-white p-6 shadow-sm">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <i class="bx bx-trending-up text-2xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">OEE</h3>
                    <p class="mt-2 text-sm text-gray-600">Cálculo automático de eficiência de equipamentos (OEE).</p>
                </div>
                <div class="rounded-xl bg-white p-6 shadow-sm">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <i class="bx bx-barcode text-2xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">Etiquetas</h3>
                    <p class="mt-2 text-sm text-gray-600">Geração automática de etiquetas e códigos de barras.</p>
                </div>
                <div class="rounded-xl bg-white p-6 shadow-sm">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <i class="bx bx-cloud text-2xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">Cloud</h3>
                    <p class="mt-2 text-sm text-gray-600">Acesso remoto seguro a todos os dados da produção.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FuncionalidadesAION'
}
</script>

<style>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
</style>