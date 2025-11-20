import solarflowLogo from '../../assets/images/header/logo_headerLogin.svg'
import solarflowLogoWhite from '../../assets/images/header/logo_white.svg'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'
import { ThemeToggler } from '../ThemeToggler'

const HeaderApp = () => {
   // Busca os dados do usuário do contexto de autenticação
   const { user, logout } = useAuth()
   const navigate = useNavigate()

   // Estado para controlar o dropdown
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const dropdownRef = useRef<HTMLDivElement>(null)

   const { isMobileOpen, toggleMobile } = useSidebar()   
   // Função para fazer logout
   const handleLogout = () => {
      logout()
      navigate('/login')
   }

   // Fechar dropdown ao clicar fora
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <header className="bg-white dark:bg-bg-primary shadow-header border-b border-light-blue dark:border-none z-[100] transition-colors duration-300">
         <div className="flex items-center justify-between px-[3.125rem] max-lg:px-6 py-2.5 max-w-full">
            {/* Logo SolarFlow */}
            <div className="flex items-center">
               <button 
               onClick={toggleMobile}
               className={`
                  max-lg:flex hidden items-center justify-center p-2 rounded-lg transition-all duration-200
                  ${isMobileOpen 
                     ? 'bg-main text-white' 
                     : 'text-main dark:text-white'
                  }
               `}
               >
                  <svg 
                     width="24" 
                     height="24" 
                     viewBox="0 0 25 26" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg" 
                     className={`
                        w-6 h-6 transition-all duration-200
                        ${isMobileOpen ? 'text-white' : 'text-main dark:text-white'}
                     `}
                  >
                     <path d="M3.125 13.8929H21.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M3.125 6.75H21.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M3.125 21.0357H21.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </button>
               <a href="/">
                  <img
                     src={solarflowLogo}
                     alt="SolarFlow"
                     className="h-[3rem] max-sm:h-[2.5rem] ml-1 w-auto dark:hidden"
                  />
                  <img
                     src={solarflowLogoWhite}
                     alt="SolarFlow"
                     className="h-[3rem] max-sm:h-[2.5rem] ml-1 w-auto hidden dark:block"
                  />
               </a>
            </div>

            {/* Seção direita - Notificações e Usuário */}
            <div className="flex items-center gap-6 max-lg:gap-4">
               {/* Ícone de Notificação */}
               <div className="relative cursor-pointer hover:bg-gray-50 dark:hover:bg-main/10 p-2 rounded-lg transition-colors">
                  <svg 
                     width="24" 
                     height="24" 
                     viewBox="0 0 20 20" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg" 
                     className="text-main dark:text-white transition-colors"
                  >
                     <path d="M15 6.66664C15 5.34056 14.4732 4.06879 13.5355 3.13111C12.5979 2.19343 11.3261 1.66664 10 1.66664C8.67392 1.66664 7.40215 2.19343 6.46447 3.13111C5.52678 4.06879 5 5.34056 5 6.66664C5 12.5 2.5 14.1666 2.5 14.1666H17.5C17.5 14.1666 15 12.5 15 6.66664Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70803 18.3304 9.42117 18.2537 9.16816 18.1079C8.91515 17.9622 8.70486 17.7526 8.55835 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  {/* {notificationCount > 0 && (
                     <span className="absolute top-0 right-0 bg-main text-white text-xs rounded-full h-4 w-4 hidden items-center justify-center font-medium">
                        {notificationCount > 9 ? '9+' : notificationCount}
                     </span>
                  )} */}
               </div>

               {/* Informações do Usuário */}
               <div className="flex items-center gap-2">
                  {/* Nome e Cargo */}
                  <div className="text-right max-lg:hidden">
                     <div className="text-sm text-main dark:text-white leading-tight">
                        {user?.first_name || "Usuário"}
                     </div>
                     <div className="text-xs text-gray dark:text-gray-400 leading-tight">
                        {user?.roles && Array.isArray(user.roles) && user.roles.length > 0
                           ? user.roles.map(role => role.name).join(', ')
                           : "Cargo"}
                     </div>
                  </div>

                  {/* Avatar com Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                     <div
                        className="h-10 w-10 rounded-full bg-main text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-hover-cyan transition-colors"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                     >
                        {user ?
                           `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
                           : "U"
                        }
                     </div>

                     {/* Dropdown Menu */}
                     {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                           {/* Informações do usuário */}
                           <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                 {user?.first_name} {user?.last_name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                 {user?.email}
                              </div>
                           </div>

                           {/* Theme Toggler */}
                           <div className="px-4 py-2 flex justify-center border-b border-gray-100 dark:border-gray-700">
                              <ThemeToggler />
                           </div>

                           {/* Botão de Logout */}
                           <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                           >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sair
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default HeaderApp