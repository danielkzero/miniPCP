<template>
    <div class="p-6 pt-0 space-y-6">
        <section class="bg-white p-6 rounded shadow">
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
            <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold">Pedidos do Dia</h3>
                <p class="text-3xl font-bold text-green-600">{{ pedidosHoje }}</p>
            </div>

            <!-- MÁQUINAS EM USO -->
            <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold">Máquinas em Uso</h3>
                <p class="text-3xl font-bold text-blue-500">{{ maquinasEmUso }}</p>
            </div>

            <!-- ORDENS DE SERVIÇO ATIVAS -->
            <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold">Ordens de Serviço Ativas</h3>
                <p class="text-3xl font-bold text-yellow-500">{{ ordensServicoAtivas }}</p>
            </div>
        </div>

        <!-- GRÁFICO 15 ÚLTIMOS DIAS -->
        <section class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">Pedidos - Últimos 15 Dias</h2>
            <apexchart type="bar" height="300" :options="grafico15Dias.options" :series="grafico15Dias.series" />
        </section>

        <!-- GRÁFICO DO MÊS -->
        <section class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">Pedidos - Mês Corrente</h2>
            <apexchart type="bar" height="300" :options="graficoMes.options" :series="graficoMes.series" />
        </section>

        <!-- HISTÓRICO DE FABRICAÇÃO -->
        <section class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">Histórico de Fabricação</h2>
            <ul class="space-y-2">
                <li v-for="item in historicoFabricacao" :key="item.id" class="border-b pb-2">
                    {{ item.data }} - {{ item.descricao }}
                </li>
            </ul>
        </section>

        <!-- ÚLTIMOS 10 REGISTROS DE ENTREGA -->
        <section class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">Últimos 10 Registros de Entrega</h2>
            <ul class="space-y-2">
                <li v-for="registro in entregasRecentes" :key="registro.id" class="border-b pb-2">
                    {{ registro.data }} - {{ registro.cliente }}
                </li>
            </ul>
        </section>

    </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts'

export default {
    components: {
        apexchart: ApexChart
    },
    name: 'PrincipalView',
    data() {
        return {
            usuario: 'Administrador', // Nome do usuário logado
            grafico15Dias: {
                options: {
                    chart: { id: 'grafico15Dias' },
                    colors: ['var(--color-indigo-500)'],
                    xaxis: {
                        categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
                    }
                },
                series: [{
                    name: 'Produção',
                    data: [10, 15, 12, 18, 14, 9, 11]
                }]
            },
            graficoMes: {
                options: {
                    chart: { id: 'graficoMes' },
                    colors: ['var(--color-indigo-500)'],
                    xaxis: {
                        categories: ['01/04', '02/04', '03/04', '04/04', '05/04']
                    }
                },
                series: [{
                    name: 'Produção',
                    data: [20, 18, 25, 22, 19]
                }]
            },
            pedidosHoje: 12,
            maquinasEmUso: 4,
            ordensServicoAtivas: 7,
            historicoFabricacao: [
                { id: 1, data: '09/04/2025', descricao: 'Fabricação de Produto A' },
                { id: 2, data: '08/04/2025', descricao: 'Fabricação de Produto B' }
            ],
            entregasRecentes: [
                { id: 1, data: '09/04/2025', cliente: 'Empresa XPTO' },
                { id: 2, data: '08/04/2025', cliente: 'Cliente YZ' }
            ]
        }
    },
    methods: {
        goToPedido() {
            this.$router.push({ path: '/pedidos/lista' });
        }
    },
}
</script>