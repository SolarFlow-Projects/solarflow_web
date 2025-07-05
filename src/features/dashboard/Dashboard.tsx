import React, { useEffect, useState } from "react"
import OverlayForm from "../../components/OverlayForm"
import Login from "../auth/login"
import ButtonAcess from "../../components/ButtonAcess"
import Overlay from "../../components/Overlay"
import Api from "../../components/Api"
import { useNavigate } from "react-router-dom"

type Permission = {
  id: string,           
  name: string,    
  actions: any[]    
}

const Dashboard = () => {
  //Dados recebidos da api
  const [dataPermission, setDataPermission] = useState<Permission[]>([])
  
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [adress, setAdress] = useState<string>('')
  const [addressNumber, setAddressNumber] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [document, setDocument] = useState<string>('')
  const [selectedModules, setSelectedModules] = useState([] as { id: string}[]) 

  useEffect(() => {
    Api.get('permissions').then((response) => {
      let data = response.data.data
      setDataPermission(data)
    }).catch((error) => {
      console.error("Error fetching permissions:", error);
    })
  },[])

  const applyCNPJMask = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    } else if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    } else {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyCNPJMask(e.target.value)
    setDocument(maskedValue)
  }

  const applyPhoneMask = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length === 0) {
      return ``
    } else if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value)
    setPhone(maskedValue)
  }
  
  const cleanPhone = phone.replace(/\D/g, '')
  const cleanDocument = document.replace(/\D/g, '')

  const [showOverlayForm, setOverlayForm] = useState(true)

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


  const statesRegisterDefault = () => {
    setSuccess(false)
    setShowOverlay(false)
    setLoading(false)
    setError(false)
  }

  const registerTrue = () => {
    setShowOverlay(true)
    setLoading(false)
    setSuccess(true)
    setError(false)
  }

  const registerError = () => {
    setShowOverlay(true)
    setLoading(false)
    setSuccess(false)
    setError(true)
  }

  const handleEstablishment = (e: React.FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault()
    statesRegisterDefault()
    let time = 2500
    setLoading(true)
    
    if (selectedModules.length === 0) {
      setInfoOverlay({
        title: 'Erro no formulário',
        subtitle: 'Selecione pelo menos um módulo',
        time: time,
        error: true
      })
      registerError()

      setTimeout(() => {
        statesRegisterDefault()
      }, 3500);

      return
    }
    
    Api.post('places', {
      name: name,
      phone: cleanPhone,
      email: email,
      address: adress,
      addressNumber: addressNumber, 
      state: state,
      city: city,
      document: cleanDocument,
      modules: selectedModules
    }).then((response) => {
      console.log(response)
      registerTrue()
      setInfoOverlay({
        title: 'Estabelecimento cadastrado',
        subtitle: 'O novo estabelecimento foi cadastrado com sucesso',
        time: time,
        error: false
      })
      setTimeout(() => {
        statesRegisterDefault()
      }, time);
    }).catch((error) => {
      time = 4000
      
      if(error.status === 409) {
        setInfoOverlay({
          title: 'Erro no formulário',
          subtitle: 'O usuário já foi cadastrado anteriormente',
          time: time,
          error: true
        })
      } else if(error.status === 422) {
        setInfoOverlay({
          title: 'Erro no formulário',
          subtitle: 'Existem campos que não foram preenchidos',
          time: time,
          error: true
        })
      } else if (error.status === 401) {
        setInfoOverlay({
          title: 'Erro de autênticação',
          subtitle: 'Realize o login novamente antes de realizar o cadastro',
          time: time,
          error: true
        })
        setTimeout(() => {
          statesRegisterDefault()
          navigate('/login')
        }, time);
      } 

      registerError()

      setTimeout(() => {
        statesRegisterDefault()
      }, time);
    })
  }

  const handleModuleChange = (moduleId: string) => {
    setSelectedModules(prev => {
      const isSelected = prev.some(module => module.id === moduleId)
      
      if (isSelected) {
        // Vai formar um array só com os que satisfazerem essa lógica, ou seja, os que já tiverem o module id passa para a função serão removidos
        return prev.filter(module => module.id !== moduleId)
      } else {
        // Se não estiver selecionado ele pega o estado anterior e adiciona o novo que foi passado na função
        return [...prev, {id: moduleId}]
      }
    })
    
  }

  return (
    <main className="">
      <Login></Login>
      {
        showOverlay &&
        <Overlay info={infoOverlay}/>
      }
      <OverlayForm show={showOverlayForm} setShow={setOverlayForm}>
      <form action="" onSubmit={(event) => handleEstablishment(event)}>    
        <h3 className='text-[18px] md:text-[21px] lg:text-[24px] text-[#0B2B3F] font-bold h-full mb-[20px] uppercase'>Novo estabelecimento</h3> 
        <div className="max-lg:max-h-[60vh] lg:max-h-[60vh] overflow-y-auto none-webkit">
          
            <div className="flex flex-col gap-y-3 lg:gap-y-4">
              <div className="flex flex-col lg:flex-row items-center gap-x-2 lg:gap-x-3 gap-y-3 lg:gap-y-4">
                <div className="flex flex-col ">
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="iname" id="name" placeholder="SolarFlow" value={name} onChange={(event) => setName(event.target.value)} className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="phone">Telefone</label>
                  <input type="tel" name="iphone" placeholder="(77) 99969-1979" id="phone" value={phone} onChange={(e) => handlePhoneChange(e)} className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
              </div>
          
              <div className="flex flex-col w-full">
                  <label htmlFor="end">Endereço</label>
                  <input type="text" name="iend" id="end" placeholder="Av. Barão do Rio Branco" value={adress} onChange={(event) => setAdress(event.target.value)} className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
              </div>

              <div className="flex flex-col w-full">
                  <label htmlFor="emailReplace">Email</label>
                  <input type="email" name="iemail" id="emailReplace" placeholder="solarflow@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
              </div>
          
              <div className="flex flex-row items-center gap-x-2 lg:gap-x-3">
                <div className="flex flex-col max-w-[30%] md:max-w-[20%] ">
                  <label htmlFor="phone">Nº</label>
                  <input type="number" name="" id=""placeholder="80" value={addressNumber} onChange={(event) => setAddressNumber(event.target.value)} className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="city">Cidade</label>
                  <input type="text" name="icity" id="city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Guanambi" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row-reverse gap-x-2 lg:gap-x-3 gap-y-3 lg:gap-y-4">
                <div className="flex flex-col w-full">
                    <label htmlFor="document">CNPJ</label>
                    <input type="text" name="idocument" id="document" value={document} onChange={(e) => handleDocumentChange(e)} placeholder="12.345.678/9101-12" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="stateEstabelecimento">Estado</label>
                  <select name="istate" id="stateEstabelecimento" value={state} onChange={(event) => setState(event.target.value)} className={`border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl ${ state ? 'text-black' : 'text-[#a9a9a9] focus:text-black'}`}>
                    <option hidden value="" className="">Selecione o estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                  <label htmlFor="modulo">Módulo(s)</label>
                  <details id="modulo" className="px-3 min-h-[40px] border border-dark-blue rounded-lg lg:rounded-xl py-2 lg:py-3 group">
                    <summary className="flex w-full flex-row justify-between items-center tracking-[-0.28px] group-open:mb-[17px]">
                      <span id="options_denunciante" className="group-open:hidden text-[#a9a9a9]">Selecione uma opção</span>
                      <span className="hidden group-open:flex text-[#1D2022]">Selecione uma opção</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none" className="group-open:rotate-180 transition-all duration-200">
                        <path d="M4.52516 4.22034L1.35958 1.05476C1.21077 0.905948 1.02138 0.831544 0.791396 0.831544C0.561418 0.831544 0.372024 0.905948 0.223214 1.05476C0.0744047 1.20357 -2.45403e-08 1.39296 -3.45931e-08 1.62294C-4.46458e-08 1.85292 0.0744047 2.04231 0.223214 2.19112L3.95698 5.92489C4.11932 6.08723 4.30871 6.16839 4.52516 6.16839C4.74161 6.16839 4.93101 6.08723 5.09334 5.92489L8.82711 2.19112C8.97594 2.04231 9.05036 1.85292 9.05036 1.62294C9.05036 1.39296 8.97594 1.20357 8.82711 1.05476C8.67828 0.905948 8.48893 0.831543 8.25893 0.831543C8.02893 0.831543 7.83958 0.905948 7.69075 1.05476L4.52516 4.22034Z" fill="#404042"/>
                      </svg>
                    </summary>
                    <ul className="flex flex-col pl-2 lg:pl-3 gap-y-[17px]">
                    {Array.isArray(dataPermission) && dataPermission.length > 0 ? (
                      dataPermission.map((permission) => (
                        <li key={permission.id} className="w-full flex flex-row items-center gap-x-2 text-[14px] leading-[12px]">
                          <input 
                            type="checkbox" 
                            value={permission.id}
                            id={`module_${permission.id}`}
                            onChange={() => handleModuleChange(permission.id)}
                            className="rounded-[3px] bg-[#F5F5F5] text-[#F5F5F5] focus:ring-0 focus:border-0"
                          />
                          <label htmlFor={`module_${permission.id}`} className="cursor-pointer">
                            {permission.name}
                          </label>
                        </li>
                      ))
                    ) : (
                      <li className="w-full flex flex-row items-center gap-x-2 text-[14px] leading-[12px] text-gray-500 animate-pulse">
                        {dataPermission.length === 0 ? "Carregando módulos..." : "Nenhum módulo disponível"}
                      </li>
                    )}
                    </ul>
                    {/* onChange=selectDenunciante(event,'options_denunciante', 'details_denuncia') */}
                  </details>
                </div>
            </div>
        </div>
          <div className='flex w-full mt-5 lg:mt-6 button_estabelecimento'>
            <ButtonAcess success={success} error={error} loading={loading} text={"CADASTRAR"}/>
          </div>
        </form>

      </OverlayForm>

    </main>
  )
}

export default Dashboard
