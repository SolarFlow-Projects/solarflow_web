import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Landing from '../features/landing'
import Login from '../features/auth/login'
import PrivateRoutes from './PrivateRoutes'
import Dashboard from '../features/dashboard/Dashboard'
import Profile from '../features/profile/Profile'
import App from '../App'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* A landing page fica na raiz */}

        <Route path='/login' element={<Login />} />
        <Route path='/recuperar-senha' element={<App />} />

        
        {/* Rotas protegidas do sistema */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<App />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/profile/*' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
