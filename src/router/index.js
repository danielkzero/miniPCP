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
          path: '/maquinas_em_uso',
          name: 'Máquinas em uso',
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
        }
      ],
    },
  ],
})

export default router
