<template>
    <div>
        <!-- NAV -->
        <nav class="bg-gray-700 text-white px-2 py-4 flex items-center space-x-4 text-4xl">
            <a href="/operador" class="text-white">
                <h2><i class="bx bx-chevron-left"></i></h2>
            </a>
            <h2 class="text-white uppercase">Registro de Operações</h2>
        </nav>

        <!-- CARD -->
        <div class="p-4 mt-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                <div class="col-span-2">
                    <label for="ordem_producao" class="block text-sm font-medium">Nº OP</label>
                    <input type="text" id="ordem_producao"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div class="col-span-2">
                    <label for="pedido" class="block text-sm font-medium">Pedido</label>
                    <input type="text" id="pedido"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div class="col-span-2">
                    <label for="cliente" class="block text-sm font-medium">Cliente</label>
                    <input type="text" id="cliente"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div>
                    <label for="codigo_produto" class="block text-sm font-medium">Código</label>
                    <input type="text" id="codigo_produto"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div class="col-span-3">
                    <label for="descricao" class="block text-sm font-medium">Descrição</label>
                    <input type="text" id="descricao"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div>
                    <label for="quantidade_lote" class="block text-sm font-medium">Qtd. Lote</label>
                    <input type="text" id="quantidade_lote"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div>
                    <label for="quantidade_pronta" class="block text-sm font-medium">Pronto/Entregue</label>
                    <input type="text" id="quantidade_pronta"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>
                <div>
                    <label for="operacao" class="block text-sm font-medium">Operação</label>
                    <input type="text" id="operacao"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        disabled />
                </div>

                <div class="col-span-2">
                    <label for="centro_trabalho" class="block text-sm font-medium">Equipamento</label>
                    <select id="centro_trabalho"
                        class="sm:text-xl w-full bg-white disabled:bg-gray-500 disabled:text-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">

                        <option v-for="(maquina, index) in maquinas" :key="index" :value="maquina.id">
                            {{ maquina.id }} - {{ maquina.nome }}
                        </option>
                    </select>
                </div>

                <div class="col-span-2">
                    <label for="observacao" class="block text-sm font-medium">Observação</label>
                    <select id="observacao"
                        class="sm:text-xl w-full bg-yellow-400 disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                        <option disabled value="null">Selecione uma observação</option>
                        <option v-for="(obs, index) in observacao" :key="index" :value="obs.id">{{ obs.observacao }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="quantidade_produzida" class="block text-sm font-medium">Qtd. Produzida</label>
                    <input type="number" id="quantidade_produzida"
                        class="sm:text-xl w-full bg-yellow-400 disabled:bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>
            </div>

            <div class="mt-6 flex flex-col items-center gap-4">
                <div class="flex items-center">
                    <div class="relative inline-block w-11 h-5 ">
                        <input checked id="teve_almoco" type="checkbox"
                            class="peer appearance-none w-11 h-5 bg-gray-200 rounded-full checked:bg-gray-600 cursor-pointer transition-colors duration-300" />
                        <label for="teve_almoco"
                            class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-gray-500 cursor-pointer">
                        </label>
                    </div>
                    <label for="teve_almoco" class="sm:text-xl ms-2">TEVE ALMOÇO?</label>
                </div>
            </div>


            <div class="mt-6 flex flex-col items-center gap-4" v-if="!toggleIdOperador">
                <button class="sm:text-xl bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
                    @click="toggleIdOperador = !toggleIdOperador">
                    SALVAR
                </button>
            </div>
            <div class="relative mt-6 mb-10" v-if="toggleIdOperador">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="bx bx-barcode text-gray-600 text-2xl"></i>
                </div>
                <input type="text" id="topbar-search"
                    class="sm:text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-12 p-2.5">
            </div>

        </div>
    </div>
</template>

<script>
import { maquinas } from "@/dados/EstruturaMaquina.json";
import { observacao } from "@/dados/EstruturaObservacao.json";
export default {
    name: 'RegistroOperacoes',
    data() {
        return {
            maquinas,
            observacao,
            toggleIdOperador: false,
        }
    }
}
</script>