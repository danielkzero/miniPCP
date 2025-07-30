import { createRouter, createWebHistory } from 'vue-router'
import authGuard from './authGuard' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/publico/PrincipalView.vue'),
      beforeEnter: authGuard,
      redirect: '/principal',
      children: [
        {
          path: '/principal',
          name: 'Principal',
          component: () => import('@/views/privado/principal/PrincipalView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/producao/maquinas',
          name: 'Máquinas',
          component: () => import('@/views/privado/producao/maquinas/MaquinasView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/maquinas/novo', 
          name: 'Nova Máquina',
          component: () => import('@/views/privado/producao/maquinas/MaquinaCreate.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/maquinas/editar/:id',
          name: 'Editar Máquina',
          component: () => import('@/views/privado/producao/maquinas/MaquinaEdit.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/pedidos/lista',
          name: 'Pedidos',
          component: () => import('@/views/privado/pedidos/PedidosView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/pedidos/novo',
          name: 'Novo Pedido',
          component: () => import('@/views/privado/pedidos/PedidoCreate.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/producao/ordem_producao',
          name: 'Ordem de produção',
          component: () => import('@/views/privado/producao/OrdemProducaoView.vue'),
          beforeEnter: authGuard
        },
        // visualizador de ordens de produção
        {
          path: '/producao/ordem_servico/:id',
          name: 'Ordem de serviço por ID',
          component: () => import('@/views/privado/producao/OrdermServicoById.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/producao/cadastro_observacao',
          name: 'Cadastro de observações',
          component: () => import('@/views/privado/producao/CadastroObservacaoView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/producao/registro_entrega',
          name: 'Registro de entrega',
          component: () => import('@/views/privado/producao/RegistroEntregaView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/producao/registro_entrega/:id',
          name: 'Protocolo de registro de entrega',
          component: () => import('@/views/privado/producao/ProtocoloRegistroEntregaView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/centro_de_trabalho/maquinas_em_uso',
          name: 'Máquinas em uso',
          component: () => import('@/views/privado/centrotrabalho/MaquinaEmUsoView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/produtos/lista',
          name: 'Meus produtos',
          component: () => import('@/views/privado/produtos/ProdutosView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/produtos/unidades',
          name: 'Unidades',
          component: () => import('@/views/privado/produtos/UnidadesView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/produtos/grupos',
          name: 'Grupos',
          component: () => import('@/views/privado/produtos/GruposView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/produtos/setores',
          name: 'Setores',
          component: () => import('@/views/privado/produtos/SetoresView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/produtos/operacoes',
          name: 'Operações',
          component: () => import('@/views/privado/produtos/OperacoesView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/clientes/lista',
          name: 'Meus clientes',
          component: () => import('@/views/privado/clientes/ClientesView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/estoques/lista',
          name: 'Meus estoques',
          component: () => import('@/views/privado/estoques/EstoquesView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/estoques/historico',
          name: 'Histórico de estoques',
          component: () => import('@/views/privado/estoques/EstoquesHistoricoView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/usuarios/lista',
          name: 'Usuários do sistema',
          component: () => import('@/views/privado/usuarios/UsuariosView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/usuarios/nivel',
          name: 'Nível de acesso',
          component: () => import('@/views/privado/usuarios/UsuariosNivelView.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/menus/gerenciar',
          name: 'Menus do sistema',
          component: () => import('@/views/privado/menus/MenusView.vue'),
          beforeEnter: authGuard
        }
      ],
    },
    {
      path: '/login',
      name: 'Login do sistema',
      component: () => import('@/views/publico/LoginView.vue')
    },
    {
      path: '/operador',
      component: () => import('@/views/publico/Operador/PrincipalOperadorView.vue')
    },
    {
      path: '/operador/registros/:id',
      component: () => import('@/views/publico/Operador/RegistroOperadorView.vue')
    },
    {
      path: "/sair",
      name: "Logout",
      beforeEnter: async (to, from, next) => {
        localStorage.clear();
        next("/login");
      },
    },
  ],
})

export default router
