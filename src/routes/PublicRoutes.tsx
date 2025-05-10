import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth()

  // Redireciona para dashboard se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return <Outlet />
}

export default PublicRoutes