import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
const NotFound = () => {
   const navigate = useNavigate()

   const handleGoHome = () => {
      navigate('/')
   }

   const handleGoBack = () => {
      navigate(-1)
   }

   return (
      <div className="min-h-screen bg-blue flex items-center justify-center p-4">
         <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                     <path d="M0 50h50v50h50" fill="none" stroke="currentColor" strokeWidth={0.5} />
                     <path d="M50 0v50h50" fill="none" stroke="currentColor" strokeWidth={0.5} />
                     <circle cx="50" cy="50" r="3" fill="currentColor" />
                     <circle cx="0" cy="50" r="3" fill="currentColor" />
                     <circle cx="100" cy="50" r="3" fill="currentColor" />
                     <circle cx="50" cy="0" r="3" fill="currentColor" />
                     <circle cx="50" cy="100" r="3" fill="currentColor" />
                  </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#circuit-pattern)" className="text-main" />
            </svg>
         </div>

         <div className="relative z-10 text-center max-w-lg mx-auto">

            <div className="mb-8">
               <h1 className="text-9xl max-md:text-7xl font-bold text-main mb-4">404</h1>
               <div className="w-24 h-1 bg-main mx-auto rounded-full"></div>
            </div>

            <div className="mb-8">
               <h2 className="text-3xl max-md:text-2xl font-bold text-white mb-4">
                  Página Não Encontrada
               </h2>
               <p className="text-gray-400 text-lg max-md:text-sm leading-relaxed">
                  Ops! A página que você está procurando não existe ou foi movida.
                  Verifique o endereço digitado ou navegue para uma página válida.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
               <button
                  onClick={handleGoBack}
                  className="inline-flex items-center gap-3 bg-white text-main border-2 border-main hover:bg-main hover:text-white font-semibold py-2 px-8 rounded-xl transition-all duration-300 transform"
               >
                  <ArrowLeft size={20} />
                  Voltar
               </button>
               <button
                  onClick={handleGoHome}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan to-main hover:from-main hover:to-cyan text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(23,165,137,0.4)] overflow-hidden"
               >
                  {/* Efeito de brilho no hover */}
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>

                  <Home size={20} className="relative" />
                  <span className="relative">IR PARA O INÍCIO</span>
               </button>
            </div>

            <div className="mt-12 pt-8 border-t border-white">
               <p className="text-gray-400 text-sm mb-4">Páginas mais acessadas:</p>
               <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <button
                     onClick={() => navigate('/painel')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Painel
                  </button>
                  <button
                     onClick={() => navigate('/clientes')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Clientes
                  </button>
                  <button
                     onClick={() => navigate('/tarefas')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Tarefas
                  </button>
                  <button
                     onClick={() => navigate('/estoque')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Estoque
                  </button>
                  <button
                     onClick={() => navigate('/relatorios')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Relatórios
                  </button>
                  <button
                     onClick={() => navigate('/mapa')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Mapa
                  </button>
                  <button
                     onClick={() => navigate('/configuracoes')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Configurações
                  </button>
                  <button
                     onClick={() => navigate('/profile')}
                     className="text-main hover:text-yellow transition-colors"
                  >
                     Perfil
                  </button>
               </div>
            </div>

            <div className="mt-8 text-xs text-gray-400">
               <p>© 2025 SolarFlow - Todos os direitos reservados</p>
            </div>
         </div>
      </div>
   )
}

export default NotFound