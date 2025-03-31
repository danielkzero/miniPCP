import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/publico/PrincipalView.vue'),
      children: [
        {
          path: '/paginas/funcionalidades',
          component: () => import('@/views/publico/FuncionalidadesView.vue'),
        },
        {
          path: '/paginas/planos_e_precos',
          component: () => import('@/views/publico/PlanosPrecosView.vue'),
        },
        {
          path: '/maquinas',
          component: () => import('@/views/privado/maquinas/MaquinasView.vue'),
        },
        {
          path: '/maquinas/novo', 
          component: () => import('@/views/privado/maquinas/MaquinaCreate.vue'),
        },
        {
          path: '/maquinas/editar/:id',
          component: () => import('@/views/privado/maquinas/MaquinaEdit.vue'),
        }
      ],
    },
  ],
})

export default router
