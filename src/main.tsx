import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/output.css'
import AppRoutes from './routes/index.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
