import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/output.css'
import AppRoutes from './routes/index.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> {/*É aquele console quando da erro em uma página*/}
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
