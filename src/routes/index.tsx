import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../features/landing'
import Login from '../features/auth/login'
import PrivateRoutes from './PrivateRoutes'
import Dashboard from '../features/dashboard/Dashboard'
import Profile from '../features/profile/Profile'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* A landing page fica na raiz */}
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        
        {/* Rotas protegidas do sistema */}
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/profile/*' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
