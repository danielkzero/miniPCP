import { jwtDecode } from 'jwt-decode'
import moment from 'moment'

export default function authGuard(to, from, next) {
  const token = localStorage.getItem('token')

  if (to.path === '/login') {
    // Se o usuário já estiver autenticado, redireciona para a página principal
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const expiracao = decoded.exp * 1000
        const agora = Date.now()

        if (expiracao >= agora) {
          return next('/principal') // Token ainda válido, envia para a página principal
        }
      } catch (err) {
        console.error('Erro ao verificar token:', err)
      }
    }
    return next() // Se não tiver token ou token expirado, permite o acesso ao login
  }

  if (!token) {
    return next('/login')
  }

  try {
    const decoded = jwtDecode(token)
    const expiracao = decoded.exp * 1000
    const agora = Date.now()

    if (expiracao < agora) {
      localStorage.removeItem('token')
      return next('/login')
    }

    return next()
  } catch (err) {
    localStorage.removeItem('token')
    return next('/login')
  }
}
