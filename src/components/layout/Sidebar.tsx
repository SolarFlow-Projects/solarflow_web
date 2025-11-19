import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSidebar } from '../../contexts/SidebarContext'
import { menuItems, MenuItem } from '../../config/menuItems'

import menuIcon from '../../assets/icons/aside/menu.svg'
import exitIcon from '../../assets/icons/aside/exit.svg'

// Altura do botão (h-10 = 40px) + gap-1 (4px)
const ITEM_HEIGHT = 40
const ITEM_GAP = 4
const BASE_OFFSET = ITEM_HEIGHT / 2

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [indicator, setIndicator] = useState({ parentId: '', y: 0, visible: false })
  const [isTipExtended, setIsTipExtended] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const { isMobileOpen } = useSidebar()

  // Animação do indicador "L"
  useEffect(() => {
    let targetParentId = ''
    let targetIndex = -1

    menuItems.forEach(item => {
      if (item.submenu) {
        const idx = item.submenu.findIndex(sub => location.pathname === sub.path)
        if (idx !== -1) {
          targetParentId = item.id
          targetIndex = idx
        }
      }
    })

    if (!targetParentId) {
      setIsTipExtended(false)
      const timer = setTimeout(() => setIndicator(prev => ({ ...prev, visible: false })), 200)
      return () => clearTimeout(timer)
    }

    const newY = (targetIndex * (ITEM_HEIGHT + ITEM_GAP)) + BASE_OFFSET + 4

    setIsTipExtended(false)

    const moveTimer = setTimeout(() => {
      setIndicator({ parentId: targetParentId, y: newY, visible: true })
    }, 200)

    const extendTimer = setTimeout(() => {
      setIsTipExtended(true)
    }, 500)

    return () => {
      clearTimeout(moveTimer)
      clearTimeout(extendTimer)
    }
  }, [location.pathname])

  const handleNavigation = (path: string) => {
    navigate(path)
    if (window.innerWidth < 1024) setIsOpen(false)
  }

  const toggleSubmenu = (id: string) => {
    setExpandedMenus(prev =>
      prev.includes(id) ? prev.filter(menuId => menuId !== id) : [...prev, id]
    )
  }

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      if (!isOpen) setIsOpen(true)
      toggleSubmenu(item.id)
    } else {
      handleNavigation(item.path)
    }
  }

  const isSubmenuExpanded = (id: string) => expandedMenus.includes(id)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActiveRoute = (path: string) => location.pathname === path

  const isMenuItemActive = (item: MenuItem) => {
    if (item.submenu) {
      return item.submenu.some(sub => location.pathname === sub.path)
    }
    return location.pathname === item.path
  }

  return (
    <>
      {(isOpen || isMobileOpen) && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 z-50 bg-white m-[24px] mr-0 shadow-block rounded-[10px] border border-light-blue transition-all duration-500 ease-in-out pt-[15px] ${isOpen ? 'w-[18.75rem]' : 'w-[75px]'} lg:relative flex flex-col h-[calc(100vh-119px)] 
      max-lg:h-[calc(100vh-60px)] max
      max-lg:fixed max-lg:top-auto max-lg:left-0 max-lg:z-50 max-lg:w-[18.75rem] max-lg:rounded-[15px] max-lg:rounded-l-none 
      max-lg:transition-transform max-lg:duration-300 max-lg:m-0
      ${isMobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}>
        
        <div className="flex items-center justify-between px-[15px] mb-[30px] flex-shrink-0 max-lg:hidden">
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

        <nav className="px-[15px] flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-x-hidden overflow-y-hidden flex flex-col min-h-0">
            <div className="flex flex-col gap-2.5">
              {menuItems.slice(0, 2).map(item => (
                 <button
                 key={item.id}
                 onClick={() => handleNavigation(item.path)}
                 className={`
                   w-full flex items-center gap-3 p-2 rounded-lg
                   transition-all duration-200 group
                   ${isActiveRoute(item.path)
                     ? 'bg-blue text-white border-2 border-main'
                     : 'text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                   }
                 `}
               >
                 <span className={`flex-shrink-0 ${isActiveRoute(item.path) ? 'brightness-0 invert' : ''}`}>
                   <img src={item.icon} alt={item.label} width="25" height="25" />
                 </span>
                 {(isOpen || isMobileOpen) && (
                   <span className="font-medium text-sm">{item.label}</span>
                 )}
               </button>
              ))}
            </div>

            <div className={`pt-5 pb-2.5 ${(isOpen || isMobileOpen) ? 'px-2.5' : 'px-0 text-center'}`}>
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {(isOpen || isMobileOpen) ? 'Aplicações' : 'apps'}
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 pb-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none">
              {menuItems.slice(2).map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`
                      w-full flex items-center justify-between p-2 rounded-lg
                      transition-all duration-200 group
                      ${isMenuItemActive(item)
                        ? 'bg-blue text-white border-2 border-main'
                        : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex-shrink-0 ${isMenuItemActive(item) ? 'brightness-0 invert' : ''}`}>
                        <img src={item.icon} alt={item.label} width="25" height="25" />
                      </span>
                      {(isOpen || isMobileOpen) && (
                        <span className="font-medium text-sm">{item.label}</span>
                      )}
                    </div>
                    {(isOpen || isMobileOpen) && item.submenu && (
                      <span className={`transition-transform duration-200 ${isSubmenuExpanded(item.id) ? 'rotate-90' : ''}`}>
                        <ChevronRightIcon />
                      </span>
                    )}
                  </button>

                  {item.submenu && (isOpen || isMobileOpen) && (
                    <div
                      className={`
                        relative ml-4 flex overflow-hidden transition-all duration-300 ease-in-out
                        ${isSubmenuExpanded(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      {indicator.parentId === item.id && indicator.visible && (
                        <div className="absolute left-0 top-0 w-4 h-full pointer-events-none z-10">
                          <div
                            className="absolute left-1.5 top-0 w-0.5 bg-main/50 rounded-b-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{ height: `${indicator.y}px` }}
                          />
                          <div
                            className="absolute left-1.5 w-2.5 h-0.5 bg-main/50 transition-all duration-200 ease-out"
                            style={{
                              top: `${indicator.y}px`,
                              width: isTipExtended ? '10px' : '0px',
                              opacity: isTipExtended ? 1 : 0
                            }}
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-1 ml-4 flex-1 mt-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.path)}
                            className={`
                              w-full h-10 flex items-center p-2 rounded-lg text-sm transition-all duration-200
                              ${isActiveRoute(subItem.path)
                                ? 'text-main font-medium bg-main/10 '
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                              }
                            `}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 pt-3 pb-[15px]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-200 group"
            >
              <span className="flex-shrink-0 transition-all duration-200 group-hover:[filter:invert(32%)_sepia(99%)_saturate(7492%)_hue-rotate(357deg)_brightness(97%)_contrast(107%)]">
                <img src={exitIcon} alt="Sair" width="25" height="25" />
              </span>
              {(isOpen || isMobileOpen) && (
                <span className="font-medium text-sm">Sair</span>
              )}
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar