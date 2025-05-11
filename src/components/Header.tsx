
/*IMG's*/
import logo_headerLogin from '../assets/images/header/logo_headerLogin.svg';
import seta_voltar from '../assets/images/header/seta_voltar.svg';

export default function Header() {

    return(
        <header className="flex w-full justify-between items-center px-[25px] pt-[25px]">
            <img src={logo_headerLogin} alt="Logo SolarFlow" />
            <button className='flex flex-row items-center gap-1'>
                <img src={seta_voltar} alt="Imagem de voltar para a pagina anterior" />
                <span className='text-[16px]'>
                    Voltar
                </span>
            </button>
        </header>
    )
}