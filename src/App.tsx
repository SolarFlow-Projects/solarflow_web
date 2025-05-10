import { useState } from 'react'
import solarflowlogo from './assets/images/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://solarflow.com.br" target="_blank">
          <img src={solarflowlogo} className="m-auto" alt="SolarFlow logo" />
        </a>
      </div>
      <div className="text-amber-300 font-bold text-2xl text-center mt-6">
        <button onClick={() => setCount((count) => count + 1)}>
         clica aqui mijão {count}
        </button>
      </div>
    </>
  )
}

export default App
