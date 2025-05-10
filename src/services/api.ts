// Configuração base da API
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.seuservidor.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = Bearer 
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api

