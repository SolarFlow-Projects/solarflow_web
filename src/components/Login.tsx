/*COMPONENT's*/
import Header from './components/Header';

export default function Login() {

    return(
        <>
            <Header />
            <main className='w-full flex flex-row justify-center items-center'>
            <section>
                <form action="">
                    <input type="text" placeholder="Usuário" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                </form>
            </section>

            <figure></figure>
            
            </main>
        </>
        
    )
}