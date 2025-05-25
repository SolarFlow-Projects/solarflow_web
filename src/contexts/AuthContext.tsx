import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import Api from '../components/Api';


type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setIsAuthenticated(true)
      Api.defaults.headers.Authorization = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    Api.defaults.headers.Authorization = `Bearer ${token}` // Já coloca no headers: { Authorization: `Bearer ${token}`, aqui envia o token no cabeçalho
    // Buscar informações do usuário e atualizar estado
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  if(loading) {
    return<div className="animate-spin fixed  transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full h-10 w-10 border-[6px] border-main border-t-transparent"></div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
