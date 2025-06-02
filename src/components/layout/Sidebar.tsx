import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// Seus ícones personalizados
import menuIcon from '../../assets/icons/aside/menu.svg'
import homeIcon from '../../assets/icons/aside/home.svg'        // painel
import personIcon from '../../assets/icons/aside/person.svg'     // perfil
import peopleIcon from '../../assets/icons/aside/people.svg'     // clientes
import tasksIcon from '../../assets/icons/aside/tasks.svg'       // tarefas
import stockIcon from '../../assets/icons/aside/stock.svg'       // estoque
import reportIcon from '../../assets/icons/aside/report.svg'     // relatórios
import mapIcon from '../../assets/icons/aside/map.svg'           // mapa
import configIcon from '../../assets/icons/aside/config.svg'     // configurações
import exitIcon from '../../assets/icons/aside/exit.svg'         // sair

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)

// Interface para os itens do menu
interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  hasSubmenu?: boolean
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  // Itens do menu baseados nas suas rotas
  const menuItems: MenuItem[] = [
    {
      id: 'painel',
      label: 'Painel',
      icon: <img src={homeIcon} alt="Painel" width="25" height="25" />,
      path: '/painel'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <img src={personIcon} alt="Perfil" width="25" height="25" />,
      path: '/profile'
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: <img src={peopleIcon} alt="Clientes" width="25" height="25" />,
      path: '/clientes',
      hasSubmenu: true
    },
    {
      id: 'tarefas',
      label: 'Tarefas',
      icon: <img src={tasksIcon} alt="Tarefas" width="25" height="25" />,
      path: '/tarefas',
      hasSubmenu: true
    },
    {
      id: 'estoque',
      label: 'Estoque',
      icon: <img src={stockIcon} alt="Estoque" width="25" height="25" />,
      path: '/estoque',
      hasSubmenu: true
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: <img src={reportIcon} alt="Relatórios" width="25" height="25" />,
      path: '/relatorios',
      hasSubmenu: true
    },
    {
      id: 'mapa',
      label: 'Mapa',
      icon: <img src={mapIcon} alt="Mapa" width="25" height="25" />,
      path: '/mapa'
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: <img src={configIcon} alt="Configurações" width="25" height="25" />,
      path: '/configuracoes'
    }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    // Fechar sidebar em telas pequenas após navegação
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Overlay para fechar sidebar em mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 bg-white m-[25px] shadow-block rounded-[10px] border border-light-blue transition-all duration-500 ease-in-out ${isOpen ? 'w-[18.75rem]' : 'w-[75px]'} lg:relative flex flex-col`} style={{ height: 'calc(100vh - 119px)' }}>
        {/* Header da Sidebar */}
        <div className="flex items-center justify-between px-[15px] mt-[15px] mb-[30px] flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2 rounded-lg transition-colors duration-200 border-2 border-transparent
              ${isOpen ? 'bg-blue text-white border-2 !border-main' : 'hover:bg-gray-100'}
              `}

          >
            <img
              src={menuIcon}
              alt="Menu"
              width="25"
              height="25"
              style={{ minWidth: 25, minHeight: 25 }}
              className={isOpen ? 'brightness-0 invert' : ''}
            />
          </button>
        </div>

        {/* Menu Items - Container com scroll */}
        <nav className="px-[15px] flex flex-col flex-1 min-h-0">
          {/* Área scrollável */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none">
            <div className="flex flex-col gap-2.5">
              {/* Home */}
              <button
                onClick={() => handleNavigation(menuItems[0].path)}
                className={`
                  w-full flex items-center gap-3 p-2 rounded-lg
                  transition-all duration-200 group
                  ${isActiveRoute(menuItems[0].path)
                    ? 'bg-blue text-white border-2 border-main'
                    : 'text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <span className={`flex-shrink-0 ${isActiveRoute(menuItems[0].path) ? 'brightness-0 invert' : ''}`}>
                  {menuItems[0].icon}
                </span>
                {isOpen && (
                  <span className="font-medium text-sm">
                    {menuItems[0].label}
                  </span>
                )}
              </button>

              {/* Perfil */}
              <button
                onClick={() => handleNavigation(menuItems[1].path)}
                className={`
                  w-full flex items-center gap-3 p-2 rounded-lg
                  transition-all duration-200 group
                  ${isActiveRoute(menuItems[1].path)
                    ? 'bg-blue text-white border-2 border-main'
                    : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <span className={`flex-shrink-0 ${isActiveRoute(menuItems[1].path) ? 'brightness-0 invert' : ''}`}>
                  {menuItems[1].icon}
                </span>
                {isOpen && (
                  <span className="font-medium text-sm">
                    {menuItems[1].label}
                  </span>
                )}
              </button>
            </div>

            {/* Seção Aplicações */}
            <div className={`pt-5 pb-2.5  ${isOpen ? 'px-2.5' : 'px-0 text-center'}`}>
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {isOpen ? 'Aplicações' : 'apps'}
              </h3>
            </div>

            {/* Itens do menu */}
            <div className="flex flex-col gap-2.5 pb-4">
              {menuItems.slice(2).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center justify-between p-2 rounded-lg
                    transition-all duration-200 group
                    ${isActiveRoute(item.path)
                      ? 'bg-blue text-white border-2 border-main'
                      : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 ${isActiveRoute(item.path) ? 'brightness-0 invert' : ''}`}>
                      {item.icon}
                    </span>
                    {isOpen && (
                      <span className="font-medium text-sm">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {isOpen && item.hasSubmenu && (
                    <ChevronRightIcon />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer - Botão de Sair */}
          <div className="flex-shrink-0 pt-3 pb-[15px]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-200 group"
            >
              <span className="flex-shrink-0 transition-all duration-200 group-hover:[filter:invert(32%)_sepia(99%)_saturate(7492%)_hue-rotate(357deg)_brightness(97%)_contrast(107%)]">
                <img src={exitIcon} alt="Sair" width="25" height="25" />
              </span>
              {isOpen && (
                <span className="font-medium text-sm">
                  Sair
                </span>
              )}
            </button>
          </div>
        </nav>
      </aside>

      {/* Botão para abrir sidebar em mobile (quando fechada) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg border border-gray-200 lg:hidden"
        >
          <img src={menuIcon} alt="Menu" width="25" height="25" />
        </button>
      )}
    </>
  )
}

export default Sidebar