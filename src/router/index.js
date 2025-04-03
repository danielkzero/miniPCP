import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/publico/PrincipalView.vue'),
      children: [
        {
          path: '/producao/maquinas',
          name: 'Máquinas',
          component: () => import('@/views/privado/maquinas/MaquinasView.vue'),
        },
        {
          path: '/maquinas/novo', 
          name: 'Nova Máquina',
          component: () => import('@/views/privado/maquinas/MaquinaCreate.vue'),
        },
        {
          path: '/maquinas/editar/:id',
          name: 'Editar Máquina',
          component: () => import('@/views/privado/maquinas/MaquinaEdit.vue'),
        },
        {
          path: '/pedidos/lista',
          name: 'Pedidos',
          component: () => import('@/views/privado/pedidos/PedidosView.vue'),
        },
        {
          path: '/producao/ordem_producao',
          name: 'Ordem de produção',
          component: () => import('@/views/privado/producao/OrdemProducaoView.vue'),
        },
        {
          path: '/producao/cadastro_observacao',
          name: 'Cadastro de observações',
          component: () => import('@/views/privado/producao/CadastroObservacaoView.vue'),
        },
        {
          path: '/producao/registro_entrega',
          name: 'Registro de entrega',
          component: () => import('@/views/privado/producao/RegistroEntregaView.vue'),
        }
      ],
    },
  ],
})

export default router
