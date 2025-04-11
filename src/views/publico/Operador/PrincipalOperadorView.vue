<template>
    <div class="p-6">
        <div class="flex justify-between border-b pb-4 mb-4 border-gray-300">
            <span class="text-xl md:text-2xl lg:text-3xl text-gray-600 uppercase">Registro de Operações</span>
        </div>
        <div class="text-center text-xl uppercase text-gray-600 mt-10">
            ORDEM DE SERVIÇO
        </div>
        <div class="relative mt-2 mb-10">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="bx bx-barcode text-gray-600 text-2xl"></i>
            </div>
            <input type="text" id="topbar-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-12 p-2.5"
                placeholder="Procurar...">
        </div>
        <div class="text-gray-400 mb-2 ms-3">
            EM ABERTO
        </div>
        <div class="p-4 border border-gray-200 shadow rounded-xl bg-white mb-3" v-for="(item, index) in historico"
            :key="index">
            <div class="grid grid-cols-1 md:grid-cols-7 text-gray-700">
                <div class="md:mb-0 mb-3">
                    <p class="text-gray-500 text-xs">ordem de serviço</p>
                    <p>{{ item.numero_os }}</p>
                </div>
                <div class="md:col-span-3">
                    <p class="text-gray-500 text-xs">100800206</p>
                    <p>{{ item.produto }}</p>
                </div>
                <div class="md:mb-0 mb-3">
                    <p class="text-gray-500 text-xs">colaborador</p>
                    <p>{{ item.datas.nome_autor_cadastro }}</p>
                </div>
                <div class="md:mb-0 mb-3">
                    <p class="text-gray-500 text-xs">cadastrado em</p>
                    <p>{{ item.datas.data_cadastro }}</p>
                </div>
                <div>
                    <button class="bg-indigo-500 text-white px-4 py-2 rounded-xl w-full h-full">
                        Fechar OS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            historico: [
                {
                    id: 7,
                    id_maquina: 2,
                    numero_os: "OS-001454",
                    id_observacao: 1,
                    observacao: "INICIO DE LOTE",
                    produto: "SEPARADOR DIREITO PARALAMA NISSAN (25*35*1832 2 INJEÇÕES)",
                    quantidade: 0,
                    parada_almoco: false,
                    datas: {
                        data_cadastro: "2021-01-01 15:00:00",
                        autor_cadastro: 2,
                        codigo: "900100005",
                        nome_autor_cadastro: "REGINALDO"
                    }
                },
                {
                    id: 7,
                    id_maquina: 2,
                    numero_os: "OS-001457",
                    id_observacao: 1,
                    observacao: "INICIO DE LOTE",
                    produto: "PORTA ETIQUETAS PARA CANTO PADRÃO TOYOTA (CINZA CLARO)",
                    quantidade: 0,
                    parada_almoco: false,
                    datas: {
                        data_cadastro: "2021-01-01 15:00:00",
                        autor_cadastro: 2,
                        codigo: "900100005",
                        nome_autor_cadastro: "JHONNY"
                    }
                }
            ],
        }
    }
}
</script>

<style></style>