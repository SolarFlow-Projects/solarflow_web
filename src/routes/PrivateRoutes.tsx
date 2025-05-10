import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()

  // Redireciona para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default PrivateRoutes
