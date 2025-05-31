import solarflowLogo from '../assets/images/header/logo_headerLogin.svg'
import sino from '../assets/icons/header/notificacao.svg'
import buttonToolbar from '../assets/icons/header/button-toolbar.svg'

interface HeaderAppProps {
   userName?: string
   userRole?: string
   avatarUrl?: string
   notificationCount?: number
}

const HeaderApp = ({
   userName = "Gustavo Costa",
   userRole = "Administrador",
   avatarUrl,
   //   notificationCount = 0 
}: HeaderAppProps) => {
   return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
         <div className="flex items-center justify-between px-[3.125rem] max-md:px-6 py-2.5 max-w-full">
            {/* Logo SolarFlow */}
            <div className="flex items-center">
               <img src={buttonToolbar} alt="Button Toolbar" className="max-md:flex hidden px-2" />
               <a href="/">
                  <img
                     src={solarflowLogo}
                     alt="SolarFlow"
                     className="h-[3.75rem] max-sm:h-[3rem]  w-auto"
                  />
               </a>
            </div>

            {/* Seção direita - Notificações e Usuário */}
            <div className="flex items-center gap-6 max-md:gap-4">
               {/* Ícone de Notificação */}
               <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">

                  <img src={sino} alt="notificação" className="text-gray-600 hover:text-main transition-colors" />

               {/* {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-main text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                     {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
               )} */}
               </div>

               {/* Informações do Usuário */}
               <div className="flex items-center gap-2">
                  {/* Nome e Cargo */}
                  <div className="text-right max-md:hidden">
                     <div className="text-sm text-main leading-tight">
                        {userName}
                     </div>
                     <div className="text-xs text-gray leading-tight">
                        {userRole}
                     </div>
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                     {avatarUrl ? (
                        <img
                           src={avatarUrl}
                           alt={userName}
                           className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-main transition-colors cursor-pointer"
                        />
                     ) : (
                        <div className="h-10 w-10 rounded-full bg-main text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-hover-cyan transition-colors">
                           {userName.split(' ').map(name => name.charAt(0)).join('').slice(0, 2)}
                        </div>
                     )}

                     {/* Indicador online */}
                     {/* <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div> */}
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default HeaderApp
