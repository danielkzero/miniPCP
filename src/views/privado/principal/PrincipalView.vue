<template>
    <div class="p-6 pt-0 space-y-6">

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="bg-white rounded-2xl shadow p-4" v-for="(item, index) in infoCard" :key="index">
                <div :class="`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white mb-2`">
                    <i :class="`text-2xl ${item.icon}`"></i>
                </div>
                <div class="text-sm text-gray-500">{{ item.title }}</div>
                <div :class="`text-3xl font-bold ${item.colorValue}`">{{ item.value }}</div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <!-- Weekly Overview -->
            <div class=" bg-white rounded-2xl shadow p-4">
                <div class="font-semibold text-gray-800 mb-2">Últimos 15 dias</div>

                <apexchart width="100%" height="170" type="bar" :options="grafico15Dias.options"
                    :series="grafico15Dias.series" />
                <p class="text-sm text-gray-500 mt-6">Foram {{(graficoMes.series[0].data.reduce((acc, val) => acc +
                    val,
                    0) / 3).toFixed(0)}} 😎 pedidos nos últimos dias.</p>
                <button class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold">
                    Criar novo pedido?
                </button>
            </div>

            <!-- Total Earning -->
            <div class=" bg-white rounded-2xl shadow p-4">
                <div class="font-semibold text-gray-800 mb-4">Produção atual</div>
                <div class="text-2xl font-bold">1.518 <span class="text-gray-500 text-sm">peças</span></div>
                <p class="text-sm text-gray-500 mb-6">Ativos produzidos até o momento</p>

                <div class="space-y-4 pt-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <span>Peugeot SA</span>
                        </div>
                        <span>818 de 1000</span>
                    </div>
                    <div class="h-1 bg-indigo-200 rounded-full">
                        <div class="w-4/5 h-full bg-indigo-500 rounded-full"></div>
                    </div>

                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <span>Renault SA</span>
                        </div>
                        <span>550 de 700</span>
                    </div>
                    <div class="h-1 bg-blue-200 rounded-full">
                        <div class="w-2/3 h-full bg-blue-500 rounded-full"></div>
                    </div>

                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <span>Volkswagen AG</span>
                        </div>
                        <span>150 de 700</span>
                    </div>
                    <div class="h-1 bg-gray-200 rounded-full">
                        <div class="w-1/4 h-full bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <!-- Total Profit Line Chart -->
                <div class="bg-white rounded-2xl shadow p-4">
                    <div class="text-xl font-semibold">{{profitChart.series[0].data.reduce((acc, val) => acc + val, 0)}}
                    </div>
                    <div class="text-sm text-gray-500 mb-2">Total de pedidos</div>
                    <apexchart width="100%" height="80" type="line" :options="profitChart.options"
                        :series="profitChart.series" />
                </div>

                <!-- Total Profit Card -->
                <div class="bg-white rounded-2xl shadow p-4">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <i class="bx bx-pie-chart text-gray-700 text-2xl"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <div>
                            <div class="text-sm font-semibold">Média atual</div>
                            <div class="text-sm text-indigo-500">Diário</div>
                        </div>
                    </div>
                    <div class="mt-4 text-xl font-bold">100 <span class="text-indigo-500 text-sm">peças</span></div>
                </div>

                <!-- New Project -->
                <div class="bg-white rounded-2xl shadow p-4">
                    <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-2">
                        <i class="bx bxs-time text-2xl"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <div>
                            <div class="text-sm font-semibold">Produzindo</div>
                            <div class="text-sm text-gray-500">Mensalmente</div>
                        </div>
                    </div>
                    <div class="mt-4 text-xl font-bold">2.560 <span class="text-gray-500 text-sm">peças</span></div>
                </div>

                <!-- Sessions Chart -->
                <div class="bg-white rounded-2xl shadow p-4">
                    <div class="text-xl font-bold">286</div>
                    <div class="text-sm text-gray-500 mb-2">Ordens de serviço</div>
                    <apexchart width="100%" height="80" type="bar" :options="sessionChart.options"
                        :series="sessionChart.series" />
                </div>
            </div>

        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <!-- HISTÓRICO DE FABRICAÇÃO -->
            <di class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Histórico de Fabricação</h2>
                <DataTable :data="historicoFabricacao" :columns="columnenthistoricoFabricacao" :classTable="'text-xs'"
                    :pesquisar="false" :actions="false" />
            </di>

            <!-- ÚLTIMOS 10 REGISTROS DE ENTREGA -->
            <div class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Últimos 10 Registros de Entrega</h2>
                <DataTable :data="entregasRecentes" :columns="columnentregasrecentes" :classTable="'text-xs'"
                    :pesquisar="false" :actions="false" />
            </div>
        </div>
    </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts'
import DataTable from '@/components/DataTable/index.vue'; // Table component

export default {
    components: {
        apexchart: ApexChart,
        DataTable
    },
    name: 'PrincipalView',
    data() {
        return {
            usuario: 'Administrador', // Nome do usuário logado
            infoCard: [
                {
                    color: "bg-green-600",
                    icon: "bx bx-basket",
                    title: "Pedidos de hoje",
                    value: 6,
                    colorValue: "text-green-600"
                },
                {
                    color: "bg-blue-600",
                    icon: "bx bxs-factory",
                    title: "Máquinas em Uso",
                    value: 3,
                    colorValue: "text-blue-600"
                },
                {
                    color: "bg-orange-600",
                    icon: "bx bx-file",
                    title: "Ordens de serviços ativa",
                    value: 3,
                    colorValue: "text-orange-600"
                },
                {
                    color: "bg-indigo-600",
                    icon: "bx bx-user",
                    title: "Clientes ativos",
                    value: 2,
                    colorValue: "text-indigo-600"
                }
            ],
            grafico15Dias: {
                options: {
                    chart: {
                        id: 'grafico15Dias',
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    colors: ['var(--color-indigo-500)'],
                    plotOptions: {
                        bar: {
                            borderRadius: 5,
                            columnWidth: 10,
                        }
                    },
                    yaxis: {
                        labels: { show: false },
                        axisTicks: { show: false },
                        axisBorder: { show: false }
                    },
                    dataLabels: { enabled: false },
                    xaxis: {
                        labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false },
                        categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
                    },
                    grid: {
                        show: true,
                        borderColor: '#ddd',
                        strokeDashArray: 4,
                        xaxis: {
                            lines: { show: false }
                        },
                        yaxis: {
                            lines: { show: true }
                        }
                    },
                },
                series: [{
                    name: 'Pedidos',
                    data: [10, 15, 12, 18, 14, 9, 11]
                }]
            },
            graficoMes: {
                options: {
                    chart: {
                        id: 'graficoMes',
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    colors: ['var(--color-indigo-500)'],
                    plotOptions: {
                        bar: {
                            borderRadius: 20
                        }
                    },
                    xaxis: {
                        categories: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04', '08/04', '09/04', '10/04'],
                        labels: { show: false },
                        axisTicks: { show: false },
                        axisBorder: { show: false }
                    },
                    yaxis: {
                        labels: { show: false },
                        axisTicks: { show: false },
                        axisBorder: { show: false }
                    },
                    grid: {
                        show: true,
                        borderColor: '#ddd',
                        strokeDashArray: 4,
                        xaxis: {
                            lines: { show: true }
                        },
                        yaxis: {
                            lines: { show: false }
                        }
                    },
                    dataLabels: { enabled: false },
                    legend: { show: false },
                    markers: {
                        size: [8, 8],
                        colors: ['var(--color-indigo-500)'],
                        strokeColors: '#ffffff',
                        strokeWidth: 2
                    },
                    stroke: {
                        width: [4, 8]
                    },
                },
                series: [{
                    name: 'Pedidos',
                    data: [0, 15, 5, 25, 12, 29, 18, 32, 29, 38]
                }]
            },

            pedidosHoje: 12,
            maquinasEmUso: 4,
            ordensServicoAtivas: 7,
            historicoFabricacao: [
                { id: 1, data: '09/04/2025', ordem_de_servico: 'OS-000018', descricao: 'Fabricação de Produto A', progresso: 50 },
                { id: 2, data: '08/04/2025', ordem_de_servico: 'OS-000023', descricao: 'Fabricação de Produto B', progresso: 75 },
                { id: 3, data: '07/04/2025', ordem_de_servico: 'OS-000012', descricao: 'Fabricação de Produto C', progresso: 30 },
                { id: 4, data: '06/04/2025', ordem_de_servico: 'OS-000015', descricao: 'Fabricação de Produto D', progresso: 90 },
                { id: 5, data: '05/04/2025', ordem_de_servico: 'OS-000010', descricao: 'Fabricação de Produto E', progresso: 60 },
                { id: 6, data: '04/04/2025', ordem_de_servico: 'OS-000020', descricao: 'Fabricação de Produto F', progresso: 80 },
                { id: 7, data: '03/04/2025', ordem_de_servico: 'OS-000017', descricao: 'Fabricação de Produto G', progresso: 40 },
                { id: 8, data: '02/04/2025', ordem_de_servico: 'OS-000014', descricao: 'Fabricação de Produto H', progresso: 70 },
                { id: 9, data: '01/04/2025', ordem_de_servico: 'OS-000019', descricao: 'Fabricação de Produto I', progresso: 20 },
                { id: 10, data: '31/03/2025', ordem_de_servico: 'OS-000016', descricao: 'Fabricação de Produto J', progresso: 85 }
            ],
            columnenthistoricoFabricacao: [
                { key: 'ordem_de_servico', label: 'OS', onClick: this.abrirOrdemServico },
                { key: 'data', label: 'Data' },
                { key: 'descricao', label: 'Descrição' },
                { key: 'progresso', label: 'Progresso', type: 'progressbar' }
            ],
            entregasRecentes: [
                { id: 1, data: '09/04/2025', cliente: 'Empresa XPTO', numero_serie: 800100450 },
                { id: 2, data: '08/04/2025', cliente: 'Peugeot SA', numero_serie: 800100449 },
                { id: 3, data: '07/04/2025', cliente: 'Renault SA', numero_serie: 800100448 },
                { id: 4, data: '06/04/2025', cliente: 'Fiat Chrysler', numero_serie: 800100447 },
                { id: 5, data: '05/04/2025', cliente: 'Volkswagen AG', numero_serie: 800100446 },
                { id: 6, data: '04/04/2025', cliente: 'Ford Motor Company', numero_serie: 800100445 },
                { id: 7, data: '03/04/2025', cliente: 'General Motors', numero_serie: 800100444 },
                { id: 8, data: '02/04/2025', cliente: 'Honda Motor Co.', numero_serie: 800100443 },
                { id: 9, data: '01/04/2025', cliente: 'Toyota Motor Corporation', numero_serie: 800100442 },
                { id: 10, data: '31/03/2025', cliente: 'Nissan Motor Co.', numero_serie: 800100441 }
            ],
            columnentregasrecentes: [
                { key: 'numero_serie', label: 'Número de série', onClick: this.abrirRegistroEntrega },
                { key: 'data', label: 'Data de entrega' },
                { key: 'cliente', label: 'Cliente' }
            ],

            weeklyChart: {
                options: {
                    chart: {
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    grid: {
                        borderColor: '#eee',
                        strokeDashArray: 4,
                    },
                    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
                    yaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
                    dataLabels: { enabled: false },
                    plotOptions: {
                        bar: {
                            borderRadius: 8,
                            columnWidth: '45%',
                        },
                    },
                    colors: ['#a78bfa'],
                },
                series: [
                    {
                        data: [30, 40, 45, 70, 40, 30, 60]
                    }
                ]
            },
            profitChart: {
                options: {
                    chart: { toolbar: { show: false }, zoom: { enabled: false }, sparkline: { enabled: true } },
                    stroke: { curve: 'smooth', width: 2 },
                    grid: { show: false },
                    xaxis: { labels: { show: false } },
                    yaxis: { labels: { show: false } },
                    dataLabels: { enabled: false },
                    colors: ['var(--color-indigo-400)']
                },
                series: [{
                    name: 'Pedidos',
                    data: [0, 15, 5, 25, 12, 29, 18, 32, 29, 38]
                }]
            },
            sessionChart: {
                options: {
                    chart: { toolbar: { show: false }, zoom: { enabled: false }, sparkline: { enabled: true } },
                    plotOptions: { bar: { columnWidth: 10, borderRadius: 5 } },
                    grid: { show: false },
                    xaxis: { labels: { show: false } },
                    yaxis: { labels: { show: false } },
                    dataLabels: { enabled: false },
                    colors: ['var(--color-indigo-400)', 'var(--color-indigo-600)']
                },
                series: [
                    {
                        name: 'Ordens de serviço',
                        data: [10, 20, 15, 25, 20, 15, 18]
                    }
                ]
            },
        }
    },
    methods: {
        goToPedido() {
            this.$router.push({ path: '/pedidos/lista' });
        },
        abrirRegistroEntrega(item) {
            this.$router.push('/producao/registro_entrega/' + item.numero_serie);
        },
        abrirOrdemServico(item) {
            this.$router.push('/producao/ordem_servico/' + item.ordem_de_servico);
        }
    },
}
</script>