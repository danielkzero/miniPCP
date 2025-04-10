<template>
    <div class="p-6 pt-0 space-y-6">
        <section class="bg-white p-6 rounded-xl shadow">
            <div class="flex justify-between">
                <div class="flex flex-col justify-center">
                    <h1 class="text-2xl font-bold text-indigo-500">Olá {{ usuario }}!</h1>
                    <p class="text-gray-600">Bem-vindo ao sistema de gestão de produção.</p>
                    <p class="text-gray-600">Aqui você pode acompanhar o desempenho da produção e as ordens de serviço.
                    </p>
                    <span>
                        <button @click="goToPedido()"
                            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 mt-6">
                            Criar novo pedido
                        </button>
                    </span>
                </div>
                <div>
                    <img src="@/assets/11_Success-1.jpg" alt="Logo" class="h-32 w-32" />

                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- PEDIDOS DO DIA -->
            <div class="bg-white p-4 rounded-xl shadow">
                <h3 class="text-lg font-semibold">Pedidos do Dia</h3>
                <p class="text-3xl font-bold text-green-600">{{ pedidosHoje }}</p>
            </div>

            <!-- MÁQUINAS EM USO -->
            <div class="bg-white p-4 rounded-xl shadow">
                <h3 class="text-lg font-semibold">Máquinas em Uso</h3>
                <p class="text-3xl font-bold text-blue-500">{{ maquinasEmUso }}</p>
            </div>

            <!-- ORDENS DE SERVIÇO ATIVAS -->
            <div class="bg-white p-4 rounded-xl shadow">
                <h3 class="text-lg font-semibold">Ordens de Serviço Ativas</h3>
                <p class="text-3xl font-bold text-yellow-500">{{ ordensServicoAtivas }}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- GRÁFICO 15 ÚLTIMOS DIAS -->
            <section class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Pedidos - Últimos 15 Dias</h2>
                <apexchart type="bar" height="300" :options="grafico15Dias.options" :series="grafico15Dias.series" />
            </section>

            <!-- GRÁFICO DO MÊS -->
            <section class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Pedidos - Mês Corrente</h2>
                <apexchart type="line" height="300" :options="graficoMes.options" :series="graficoMes.series" />
            </section>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <!-- HISTÓRICO DE FABRICAÇÃO -->
            <section class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Histórico de Fabricação</h2>
                <DataTable :data="historicoFabricacao" :columns="columnenthistoricoFabricacao" :classTable="'text-xs'"
                    :pesquisar="false" :actions="false" />
            </section>

            <!-- ÚLTIMOS 10 REGISTROS DE ENTREGA -->
            <section class="bg-white p-4 rounded-xl shadow">
                <h2 class="text-lg font-semibold mb-2">Últimos 10 Registros de Entrega</h2>
                <DataTable :data="entregasRecentes" :columns="columnentregasrecentes" :classTable="'text-xs'"
                    :pesquisar="false" :actions="false" />
            </section>
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
            grafico15Dias: {
                options: {
                    chart: { id: 'grafico15Dias', toolbar: { show: false } },
                    colors: ['var(--color-indigo-500)'],
                    plotOptions: {
                        bar: {
                            borderRadius: 20
                        }
                    },
                    xaxis: {
                        categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
                    }
                },
                series: [{
                    name: 'Pedidos',
                    data: [10, 15, 12, 18, 14, 9, 11]
                }]
            },
            graficoMes: {
                options: {
                    chart: { id: 'graficoMes', toolbar: { show: false } },
                    colors: ['var(--color-indigo-500)'],
                    plotOptions: {
                        bar: {
                            borderRadius: 20
                        }
                    },
                    xaxis: {
                        categories: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04', '08/04', '09/04', '10/04']
                    },
                    markers: {
                        size: [8, 8], // 0 para barras, 8 para "bola"
                        colors: ['var(--color-indigo-500)'], // verde
                        strokeColors: '#ffffff',
                        strokeWidth: 2
                    },
                    stroke: {
                        width: [4, 8]
                    }
                },
                series: [{
                    name: 'Pedidos',
                    data: [
                        0, 15, 5, 25, 12, 29, 18, 32, 29, 38
                    ]
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
            ]
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