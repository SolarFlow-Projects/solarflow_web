type ButtonProps = {
  success: boolean,
  loading: boolean,
  error: boolean, // Novo estado para erro
  text: string // String com s minúsculo (boa prática)
}

export default function ButtonAccess(props: ButtonProps) {
  return(
      <button 
          type="submit"
          disabled={props.loading || props.success}
          className="flex justify-center w-full items-center"
      >
          <div className={`group relative inline-flex items-center gap-3 font-semibold py-2.5 rounded-xl transition-all duration-300 overflow-hidden border w-full justify-center ${
              props.success
                  ? 'bg-white text-main border-main' 
                      : props.error 
                        ? 'text-[#e74c3c] bg-white border-main'
                        : props.loading 
                          ? 'bg-gradient-to-r from-cyan to-main text-white border-white cursor-wait' 
                          : 'bg-gradient-to-r from-cyan to-main hover:from-hover-cyan hover:to-hover-cyan text-white border-white transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(23,165,137,0.4)]'
          }`}>
            
              {/* Efeito de hover - apenas no estado normal */}
              {!props.loading && !props.success && !props.error && (
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
              )}
      
              {/* Animação de loading */}
              {props.loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan to-main animate-pulse"></div>
              )}

              {/* Estados visuais */}
              {props.success ? (
                  <>
                      <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="relative">SUCESSO!</span>
                  </>
              ) : props.error ? (
                  <>
                      <svg className="w-5 h-5 animate-wiggle-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span className="relative">ERRO!</span>
                  </>
              ) : props.loading ? (
                  <>
                      <div className="relative">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      </div>
                      <span className="relative animate-pulse">Carregando...</span>
                  </>
              ) : (
                  <span className="relative">{props.text}</span>
              )}
          </div>
      </button>
  )
}