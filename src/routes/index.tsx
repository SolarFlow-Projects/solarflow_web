import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AppLayout from '../components/layout/AppLayout'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/recuperar-senha' element={<Login />} />

        {/* Rotas protegidas do sistema */}
        <Route element={<PrivateRoutes />}>

          <Route path='/' element={<App />} />
          
          {/* Rotas com sidebar */}
          <Route path='/painel' element={
            <AppLayout>
              <Painel />
            </AppLayout>
          } />
          
          <Route path='/profile' element={
            <AppLayout>
              <Profile />
            </AppLayout>
          } />
          
          <Route path='/clientes' element={
            <AppLayout>
              <Clientes />
            </AppLayout>
          } />
          
          <Route path='/tarefas' element={
            <AppLayout>
              <Tarefas />
            </AppLayout>
          } />
          
          <Route path='/estoque' element={
            <AppLayout>
              <Estoque />
            </AppLayout>
          } />
          
          <Route path='/relatorios' element={
            <AppLayout>
              <Relatorios />
            </AppLayout>
          } />
          
          <Route path='/mapa' element={
            <AppLayout>
              <Mapa />
            </AppLayout>
          } />
          
          <Route path='/configuracoes' element={
            <AppLayout>
              <Configuracoes />
            </AppLayout>
          } />
          
          <Route path='/dashboard' element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
        </Route>
        
        {/* Página 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes