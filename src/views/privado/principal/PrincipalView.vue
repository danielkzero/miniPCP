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
                <p class="text-sm text-gray-500 mt-6" v-if="totalPedidos15Dias">
                    Foram {{ totalPedidos15Dias }} 😎 pedidos nos
                    últimos dias.</p>
                <button @click="$router.push('/pedidos/lista')"
                    class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold cursor-pointer hover:bg-indigo-700">
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
                    <div class="text-xl font-semibold">
                        {{profitChart.series[0].data.reduce((acc, val) => acc + val, 0)}}
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
import axios from 'axios'; // Axios for API requests

export default {
    components: {
        apexchart: ApexChart,
        DataTable
    },
    name: 'PrincipalView',
    data() {
        return {
            usuario: 'Administrador', // Nome do usuário logado
            infoCard: [],
            grafico15Dias: {},
            totalPedidos15Dias: null,

            pedidosHoje: 12,
            maquinasEmUso: 4,
            ordensServicoAtivas: 7,
            historicoFabricacao: [],
            columnenthistoricoFabricacao: [
                { key: 'ordem_de_servico', label: 'OS', onClick: this.abrirOrdemServico },
                { key: 'data', label: 'Data' },
                { key: 'descricao', label: 'Descrição' },
                { key: 'progresso', label: 'Progresso', type: 'progressbar' }
            ],
            entregasRecentes: [],
            columnentregasrecentes: [
                { key: 'numero_serie', label: 'Número de série', onClick: this.abrirRegistroEntrega },
                { key: 'data', label: 'Data de entrega' },
                { key: 'cliente', label: 'Cliente' }
            ],

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
        },
        async buscarInfoCard() {
            try {
                const response = await axios.get('/api/dashboard/infoCard')
                this.infoCard = response.data.infoCard
            } catch (error) {
                console.error('Erro ao buscar infoCard:', error)
            }
        },
        async buscarGrafico15Dias() {
            try {
                const response = await axios.get('/api/dashboard/grafico15Dias')
                this.grafico15Dias = response.data.grafico15Dias
                this.totalPedidos15Dias = this.grafico15Dias.series[0].data.reduce((acc, val) => acc + val, 0)
            } catch (error) {
                console.error('Erro ao buscar gráfico de 15 dias:', error)
            }
        },
        async buscarHistoricoFabricacao() {
            try {
                const response = await axios.get('/api/dashboard/historicoFabricacao')
                this.historicoFabricacao = response.data.historicoFabricacao
                console.log('Histórico de fabricação:', this.historicoFabricacao)
            } catch (error) {
                console.error('Erro ao buscar histórico de fabricação:', error)
            }
        },
        async buscarRegistroRecentes() {
            try {
                const response = await axios.get('/api/dashboard/entregasRecentes')
                this.entregasRecentes = response.data.entregasRecentes
                console.log('Entregas recentes:', this.entregasRecentes)
            } catch (error) {
                console.error('Erro ao buscar entregas recentes:', error)
            }
        }
    },
    async mounted() {
        this.buscarInfoCard();
        this.buscarGrafico15Dias();
        this.buscarHistoricoFabricacao();
        this.buscarRegistroRecentes();
    }
}
</script>