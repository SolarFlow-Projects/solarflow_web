import { useState } from 'react';
import axios from 'axios';

/*COMPONENT's*/
import Header from './components/Header';

export default function App() {

  const [user, setUser] = useState();
  const [password, setPassword] = useState();


  return (
    <>
      <Header />
      <main className='w-full flex flex-row justify-center items-center'>
        <section>
          <form action="">

          </form>
        </section>

        <figure></figure>
        
      </main>
    </>
  )
}
