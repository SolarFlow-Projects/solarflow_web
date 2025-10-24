import React, { createContext, useState, useContext, useEffect } from 'react'
import Api from '../utils/Api'
import type { AuthContextType, AuthProviderProps, User, UpdateProfileData, UpdateProfileResponse } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          // Configura o header de autorização
          Api.defaults.headers.Authorization = `Bearer ${token}`
          
          // Busca os dados do usuário do localStorage
          const userData = localStorage.getItem('userData')
          
          if (userData) {
            const parsedUser: User = JSON.parse(userData)
            setUser(parsedUser)
            setIsAuthenticated(true)
          } else {
            // Se não tiver dados salvos, limpa o token inválido
            localStorage.removeItem('token')
            Api.defaults.headers.Authorization = ''
          }
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error)
          // Token inválido, remove do localStorage
          localStorage.removeItem('token')
          localStorage.removeItem('userData')
          Api.defaults.headers.Authorization = ''
        }
      }
      
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userData', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    Api.defaults.headers.Authorization = `Bearer ${token}`
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setIsAuthenticated(false)
    setUser(null)
    Api.defaults.headers.Authorization = ''
  }

  const updateProfile = async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
    try {
      const response = await Api.post<UpdateProfileResponse>('users/update-profile', data)

      if (response.data.success && response.data.user) {
        // Mescla os dados antigos (roles) com os novos dados atualizados
        const updatedUser: User = {
          ...user,
          ...response.data.user,
          // Preserva roles se não vieram na resposta
          roles: response.data.user.roles || user?.roles
        }

        // Atualiza o estado do usuário
        setUser(updatedUser)
        // Atualiza o localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUser))
      }

      return response.data
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao atualizar perfil'
      throw new Error(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="animate-spin fixed transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full h-10 w-10 border-[6px] border-main border-t-transparent"></div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}