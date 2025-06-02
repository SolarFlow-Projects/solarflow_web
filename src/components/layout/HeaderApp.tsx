import solarflowLogo from '../../assets/images/header/logo_headerLogin.svg'
import sino from '../../assets/icons/header/notificacao.svg'
import buttonToolbar from '../../assets/icons/header/button-toolbar.svg'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const HeaderApp = () => {
   // Busca os dados do usuário do contexto de autenticação
   const { user, logout } = useAuth()
   const navigate = useNavigate()
   
   // Estado para controlar o dropdown
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const dropdownRef = useRef<HTMLDivElement>(null)

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
      <header className="bg-white shadow-header border-b border-gray-100 ">
         <div className="flex items-center justify-between px-[3.125rem] max-md:px-6 py-2.5 max-w-full">
            {/* Logo SolarFlow */}
            <div className="flex items-center">
               <img src={buttonToolbar} alt="Button Toolbar" className="max-md:flex hidden px-2" />
               <a href="/">
                  <img
                     src={solarflowLogo}
                     alt="SolarFlow"
                     className="h-[3rem] max-sm:h-[2.5rem]  w-auto"
                  />
               </a>
            </div>

            {/* Seção direita - Notificações e Usuário */}
            <div className="flex items-center gap-6 max-md:gap-4">
               {/* Ícone de Notificação */}
               <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <img src={sino} alt="notificação" className="text-gray-600 hover:text-main transition-colors" />

                  {/* {notificationCount > 0 && (
                     <span className="absolute top-0 right-0 bg-main text-white text-xs rounded-full h-4 w-4 hidden items-center justify-center font-medium">
                        {notificationCount > 9 ? '9+' : notificationCount}
                     </span>
                  )} */}
               </div>

               {/* Informações do Usuário */}
               <div className="flex items-center gap-2">
                  {/* Nome e Cargo */}
                  <div className="text-right max-md:hidden">
                     <div className="text-sm text-main leading-tight">
                        {user?.first_name || "Usuário"}
                     </div>
                     <div className="text-xs text-gray leading-tight">
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                           {/* Informações do usuário */}
                           <div className="px-4 py-2 border-b border-gray-100">
                              <div className="text-sm font-medium text-gray-900">
                                 {user?.first_name} {user?.last_name}
                              </div>
                              <div className="text-xs text-gray-500">
                                 {user?.email}
                              </div>
                           </div>
                           
                           {/* Opções do menu */}
                           {/* <div className="py-1">
                              <button
                                 onClick={() => {
                                    setIsDropdownOpen(false)
                                    navigate('/profile')
                                 }}
                                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                              >
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                 </svg>
                                 Meu Perfil
                              </button>
                              
                              <button
                                 onClick={() => {
                                    setIsDropdownOpen(false)
                                    navigate('/configuracoes')
                                 }}
                                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                              >
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                                 Configurações
                              </button>
                           </div> */}
                           
                           {/* Divisor 
                           <div className="border-t border-gray-100 my-1"></div>*/}
                           
                           {/* Botão de Logout */}
                           <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
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