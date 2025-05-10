import solarflowlogo from './assets/images/logo.png'

function App() {
  return (
    <div className="min-h-screen bg-[#0b2b3fee] flex items-center justify-center p-4">
      <div className="bg-[#082B3F] rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-6">
          <a href="https://solarflow.com.br" target="_blank" rel="noopener noreferrer">
            <img src={solarflowlogo} className="w-32 h-auto mx-auto" alt="SolarFlow logo" />
          </a>
        </div>

        {/* Texto */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Você ainda não tem acesso
        </h2>
        <p className="text-white mb-6">
          Entre em contato para poder ter acesso ao sistema
        </p>

        {/* Botão */}
        <div className="flex justify-center">
          <a 
            target="_blank" 
            href="https://wa.me/+5577991216617?text=Ol%C3%A1!%20Estou%20muito%20interessado%20em%20conhecer%20mais%20sobre%20o%20SolarFlow%20e%20como%20ele%20pode%20beneficiar%20minha%20empresa!" 
            className="bg-[#17A589] hover:bg-[#13876F] text-white flex flex-row items-center gap-2 p-3 rounded-lg w-fit transition-all duration-500 hover:scale-[1.01]"
          >
            <span className="font-semibold">ENTRE EM CONTATO</span>
            <svg className="w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App