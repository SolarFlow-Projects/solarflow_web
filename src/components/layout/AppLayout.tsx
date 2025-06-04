import Sidebar from './Sidebar'
import HeaderApp from './HeaderApp'
import { SidebarProvider } from '../../contexts/SidebarContext'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col  bg-base">

        <HeaderApp />

        <div className="flex-1 flex flex-row  max-h-screen overflow-y-hidden relative" >
          <Sidebar />

          {/* Conteúdo principal */}
          <main className="flex-1 p-6 md:pl-0 overflow-y-auto h-[calc(100vh-70px)] max-md:h-[calc(100vh-61px)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AppLayout;