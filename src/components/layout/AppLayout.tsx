import React from 'react'
import Sidebar from './Sidebar'
import HeaderApp from './HeaderApp'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col  bg-base">
      
      <HeaderApp />
      
      <div className="flex-1 flex flex-row  max-h-screen overflow-y-hidden" >
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 pt-6 overflow-y-auto" style={{ height: 'calc(100vh - 69px)' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout;