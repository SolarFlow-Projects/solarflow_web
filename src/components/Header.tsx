import { useNavigate } from 'react-router-dom';

type Header = {
  link?: string | null
}

/*IMG's*/
import logo_headerLogin from '../assets/images/header/logo_headerLogin.svg';

export default function Header(props: Header) {
    const navigate = useNavigate();


    return(
        <header className="flex w-full justify-between items-center px-[25px] pt-[25px] max-w-[1280px] mx-auto mb-8 lg:mb-[50px]">
            <img src={logo_headerLogin} alt="Logo SolarFlow" />

            {
              props.link ? (
                <a href={props.link} className='relative flex items-center gap-2 rounded-lg border border-main text-main px-4 py-2.5 font-medium overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md group'>
                  <span className="absolute inset-0 bg-gradient-to-r from-main to-main transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className='relative z-10 transition-transform duration-300'
                  >
                    <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.99996 6.66667L6.66663 10L9.99996 13.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.3333 10H6.66663" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <span className='relative z-10 transition-all duration-300'>
                    Voltar
                  </span>
                </a>
              ) : ( 
                <button className='relative flex items-center gap-2 rounded-lg border border-main text-main px-4 py-2.5 font-medium overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md group' 
                onClick={() => navigate(-1)}>
                  <span className="absolute inset-0 bg-gradient-to-r from-main to-main transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className='relative z-10 transition-transform duration-300'
                  >
                    <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.99996 6.66667L6.66663 10L9.99996 13.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.3333 10H6.66663" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <span className='relative z-10 transition-all duration-300'>
                    Voltar
                  </span>
                </button>
                )
            }


        </header>
    )
}