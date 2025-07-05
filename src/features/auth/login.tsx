import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css'

/*COMPONENT's*/
import Header from '../../components/Header';
import Overlay from '../../components/Overlay';
import ButtonAcess from '../../components/ButtonAcess';
import { useAuth } from '../../contexts/AuthContext';
import Api from '../../components/Api';

/*IMG's*/
import login_img from '../../assets/images/login/login_img.svg';
import cadeado from '../../assets/images/login/cadeado.svg';
import usuario from '../../assets/images/login/usuario.svg';
import fundo from '../../assets/images/login/fundo_login.svg';



export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false)
  const [infoOverlay, setInfoOverlay] = useState({
    title: '',
    subtitle: '',
    time: 0,
    error: false
  })

  const statesLoginDefault = () => {
    setSuccess(false)
    setShowOverlay(false)
    setLoading(false)
    setError(false)
  }

  const loginTrue = () => {
    setShowOverlay(true)
    setLoading(false)
    setSuccess(true)
    setError(false)
  }

  const loginError = () => {
    setShowOverlay(true)
    setLoading(false)
    setSuccess(false)
    setError(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    statesLoginDefault()
    let time = 2500
    setLoading(true)

    Api.post('users/sign-in', {
      email: email,
      password: password,
      rememberMe: rememberMe
    }).then((response) => {
      let res = response.data;

      if (res.code == 200) {
        setInfoOverlay({
          title: 'Login realizado',
          subtitle: 'O seu login foi realizado com sucesso',
          time: time,
          error: false
        })
        loginTrue()

        setTimeout(() => {
          const token = res.token.token
          const userData = res.user // Dados do usuário retornados pela API

          // Passa tanto o token quanto os dados do usuário para o contexto
          login(token, userData)
          statesLoginDefault()
          navigate('/')
        }, time);
      }
    }).catch((error) => {
      const status = error.status
      time = 4000
      if (status == 401 || status == 404) {
        setInfoOverlay({
          title: 'Erro de autenticação',
          subtitle: 'O e-mail ou a senha estão incorretos. Falha ao autenticar o usuário',
          time: time,
          error: true
        })

        loginError()

        setTimeout(() => {
          statesLoginDefault()
          navigate('/login')
        }, time);
      } else if (status == 422) {
        setInfoOverlay({
          title: 'Erro de autenticação',
          subtitle: 'O e-mail ou a senha não foram preenchidos corretamente',
          time: time,
          error: true
        })

        loginError()
        setTimeout(() => {
          statesLoginDefault()
          navigate('/login')
        }, time);
      }
    })
  }

  const handleChangeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  }
  return (
    <div className='min-h-screen  bg-cover bg-center bg-no-repeat w-full font-poppins' style={{ backgroundImage: `url(${fundo})` }}>

      {
        showOverlay &&
        <Overlay info={infoOverlay} />
      }

      <Header link={'https://solarflow.com.br/'} />

      <main className='md:min-h-[calc(100vh-135px)] h-full w-full flex flex-col lg:flex-row lg:justify-center items-center max-w-[1280px] mx-auto px-4 lg:px-[25px] lg:gap-x-[44px] lg:pb-[50px] pb-12'>
        <section className='min-h-[calc(100vh-135px)] md:min-h-auto h-full bg-main px-[30px] py-20 md:px-[60px] md:w-full lg:max-w-[50%] xl:max-w-[570px] xl:w-full shadow-[0_0_40px_rgba(23,165,137,0.5)]  max-w-[570px] rounded-2xl'>
          <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-5'>
            <h1 className='text-[25px] text-white font-semibold h-full mb-[20px]'>Bem Vindo!</h1>

            <div className='flex flex-col text-white w-full'>
              <label htmlFor="iemail" className='text-[16px]'>Email</label>

              <div className='w-full relative'>
                <img src={usuario} alt="Cadeado de segurança" className='absolute transform left-[6px] top-1/2 -translate-y-1/2' />
                <input type="email" name="iemail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='exemplo@email.com' className='login border-b border-white placeholder:text-white px-[33px] w-full focus-visible:ring-0 focus-visible:border-0 focus-visible:border-b focus-visible:outline-0 py-2 flex items-center h-full placeholder:text-[16px]  text-[14px]' />
              </div>

            </div>

                      <div className='flex flex-col text-white w-full'>
                        <label htmlFor="isenha" className='text-[16px]'>Senha</label>
                        <div className='w-full relative'>
                          <img src={cadeado} alt="Cadeado de segurança"  className='absolute transform left-[6px] top-1/2 -translate-y-1/2'/>
                          
                          { senhaVisivel ? (
                            <svg onClick={() => handleChangeSenha()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye absolute right-[6px] top-1/2 -translate-y-1/2 cursor-pointer"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                          ): 
                          (
                            <svg  onClick={() => handleChangeSenha()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off absolute right-[6px] top-1/2 -translate-y-1/2 cursor-pointer"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                          )}
                          <input type={senhaVisivel ? "text" : "password"} name="isenha" id="senha" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*************' className='login border-b border-white placeholder:text-white px-[33px] w-full focus-visible:ring-0 focus-visible:border-0 focus-visible:border-b focus-visible:outline-0 py-2 flex items-center h-full placeholder:h-[13px] placeholder:text-[16px] text-[14px]'/>
                        </div>
                      </div>
                      <div className='flex flex-row flex-wrap gap-x-[10px] gap-y-3 items-center justify-between w-full text-white'>
                        <div className='flex flex-row items-center gap-2 text-[12px]'>
                          <input type="checkbox" name="ilembreMe" id="lembreMe" style={{backgroundImage: 'none', border: '1px solid white'}} className="login h-[14px] w-[14px] appearance-none rounded checked:bg-main checked:border checked:border-white focus:outline-none focus:ring-1 relative " checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)} />
                          <label htmlFor="ilembreMe" >Lembre-se de mim</label>
                        </div>
                        <Link to="/recuperar-senha" className='text-[12px] text-white'>Esqueceu sua senha?</Link>
                      </div>

            <div className='flex w-full mt-3'>
              <ButtonAcess success={success} error={error} loading={loading} text={"ENTRAR"} />
            </div>

          </form>
        </section>
        <figure className='hidden lg:flex h-full items-end'>
          <img src={login_img} alt="Mulher usando smartphone para fazer login no sistema SolarFlow" className='w-full' />
        </figure>

      </main>
    </div>

  )
}