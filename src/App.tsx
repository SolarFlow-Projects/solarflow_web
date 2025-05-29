
import solarflowlogo from './assets/images/logo.png'

export default function App() {



  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Padrão SVG de fundo */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50h50v50h50" fill="none" stroke="currentColor" strokeWidth={0.5}/>
              <path d="M50 0v50h50" fill="none" stroke="currentColor" strokeWidth={0.5}/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
              <circle cx="0" cy="50" r="3" fill="currentColor"/>
              <circle cx="100" cy="50" r="3" fill="currentColor"/>
              <circle cx="50" cy="0" r="3" fill="currentColor"/>
              <circle cx="50" cy="100" r="3" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" className="text-cyan"/>
        </svg>
      </div>

      {/* Card principal */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-white/20">
        {/* Logo */}
        <div className="mb-8">
          <a href="https://solarflow.com.br" target="_blank" rel="noopener noreferrer">
            <img 
              src={solarflowlogo} 
              className="w-36 sm:w-40 h-auto mx-auto drop-shadow-2xl" 
              alt="SolarFlow logo" 
            />
          </a>
        </div>

        {/* Conteúdo */}
        <div className="text-center space-y-6">
          {/* Título com gradiente */}
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan mb-2">
              Acesso Restrito
          </h2>
          
          {/* Subtítulo */}
          <p className="text-gray-100 text-lg font-medium">
            Você ainda não tem acesso ao sistema
          </p>
          
          {/* Descrição */}
          <p className="text-gray-200 text-base leading-relaxed" onClick={()=>console.log(localStorage.getItem('token'))}>
            Entre em contato com nossa equipe para descobrir como o SolarFlow pode revolucionar a gestão da sua empresa de energia solar
          </p>

          {/* Linha divisória */}
          <div className="w-16 h-1 bg-cyan mx-auto my-6 rounded-full"></div>

          {/* Botão de contato aprimorado */}
          <div className="flex justify-center pt-4">
            <a 
              target="_blank" 
              href="https://wa.me/+5577991216617?text=Ol%C3%A1!%20Estou%20muito%20interessado%20em%20conhecer%20mais%20sobre%20o%20SolarFlow%20e%20como%20ele%20pode%20beneficiar%20minha%20empresa!" 
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan to-main hover:from-main hover:to-cyan text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(23,165,137,0.4)] overflow-hidden"
            >
              {/* Efeito de brilho no hover */}
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
              
              <span className="relative">ENTRE EM CONTATO</span>
              
              {/* Ícone WhatsApp */}
              <svg 
                className="w-6 h-6 transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

          {/* Informação adicional */}
          <p className="text-gray-300 text-sm pt-4">
            Responderemos em até 24 horas úteis
          </p>
        </div>

        {/* Footer do card */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-300 text-xs">
            © 2025 SolarFlow - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  )
}