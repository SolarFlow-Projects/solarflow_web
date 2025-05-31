import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Landing from '../features/landing'
import Login from '../features/auth/login'
import PrivateRoutes from './PrivateRoutes'
import Dashboard from '../features/dashboard/Dashboard'
import Profile from '../features/profile/Profile'
import Painel from '../features/painel/Painel'
import Clientes from '../features/clientes/Clientes'
import Tarefas from '../features/tarefas/Tarefas'
import Estoque from '../features/estoque/Estoque'
import Relatorios from '../features/relatorios/Relatorios'
import Mapa from '../features/mapa/Mapa'
import Configuracoes from '../features/configuracoes/Configuracoes'
import NotFound from '../pages/NotFound'
import App from '../App'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/recuperar-senha' element={<Login />} />

        {/* Rotas protegidas do sistema - todas precisam de login */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<App />} />
          <Route path='/painel' element={<Painel />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/tarefas' element={<Tarefas />} />
          <Route path='/estoque' element={<Estoque />} />
          <Route path='/relatorios' element={<Relatorios />} />
          <Route path='/mapa' element={<Mapa />} />
          <Route path='/configuracoes' element={<Configuracoes />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
        {/* Página 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
