import React, { useEffect, useState } from "react"

import OverlayForm from "../../components/OverlayForm"
import Login from "../auth/login"
import ButtonAcess from "../../components/ButtonAcess"
import Overlay from "../../components/Overlay"
import Api from "../../components/Api"
import HeaderApp from "../../components/HeaderApp"

type Permission = {
  id: string,           
  name: string,    
  actions: Array<{
    id: string;
    name: string;
  }>   
}

const Dashboard = () => {
  const [dataPermission, setDataPermission] = useState<Permission[]>([])
  const [selectedModules, setSelectedModules] = useState([] as { id: string; name: string }[]) 

  useEffect(() => {
    Api.get('permissions').then((response) => {
      const data = response.data.data
      setDataPermission(data)
      console.log(data)
    }).catch((error) => {
      console.error("Error fetching permissions:", error);
    })
    
  },[])

  const [showOverlayForm, setOverlayForm] = useState(true)

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false)

  const statesRegisterDefault = () => {
    setSuccess(false)
    setShowOverlay(false)
    setLoading(false)
    setError(false)
  }

  const handleEstablishment = (e: React.FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault()
    statesRegisterDefault()
    console.log(dataPermission)
    console.log('Módulos selecionados:', selectedModules)
    Api.post('places', {
      
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleModuleChange = (moduleId: string, moduleName: string) => {
    setSelectedModules(prev => {
    // prev = array atual de módulos selecionados
    // moduleId = ID do módulo que foi clicado
    
    // Verifica se o módulo JÁ ESTÁ selecionado
    const isSelected = prev.some(module => module.id === moduleId)
    
    if (isSelected) {
      // Se JÁ ESTÁ selecionado → REMOVE (desseleção)
      return prev.filter(module => module.id !== moduleId)
    } else {
      // Se NÃO ESTÁ selecionado → ADICIONA (seleção)
      return [...prev, { id: moduleId, name: moduleName }]
    }
  })
  }

  return (
    <main className="">
      <Login></Login>
      {
        showOverlay &&
        <Overlay info={{
          title: '',
          subtitle: '',
          time: 0,
          error: false
        }}/>
      }
      <HeaderApp 
        notificationCount={3}
      />
      <OverlayForm show={showOverlayForm} setShow={setOverlayForm}>
      <form action="" onSubmit={(event) => handleEstablishment(event)}>    
        <h3 className='text-[18px] md:text-[21px] lg:text-[24px] text-black font-bold h-full mb-[20px] uppercase'>Novo estabelecimento</h3> 
        <div className="max-lg:max-h-[60vh] lg:max-h-[60vh] overflow-y-auto">
          
            <div className="flex flex-col gap-y-3 lg:gap-y-4">
              <div className="flex flex-col lg:flex-row items-center gap-x-2 lg:gap-x-3 gap-y-3 lg:gap-y-4">
                <div className="flex flex-col ">
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="iname" id="name" placeholder="SolarFlow" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="phone">Telefone</label>
                  <input type="tel" name="iphone" placeholder="(77) 99969-1979" id="phone" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
              </div>
          
              <div className="flex flex-col w-full">
                  <label htmlFor="end">Endereço</label>
                  <input type="text" name="iend" id="end" placeholder="Av. Barão do Rio Branco" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
              </div>
          
              <div className="flex flex-row items-center gap-x-2 lg:gap-x-3">
                <div className="flex flex-col max-w-[30%] md:max-w-[20%] ">
                  <label htmlFor="number">Nº</label>
                  <input type="number" name="inumber" id="number" placeholder="80" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="city">Cidade</label>
                  <input type="text" name="icity" id="city" placeholder="Guanambi" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row-reverse gap-x-2 lg:gap-x-3 gap-y-3 lg:gap-y-4">
                <div className="flex flex-col ">
                    <label htmlFor="document">CNPJ</label>
                    <input type="text" name="idocument" id="document" placeholder="12.345.678/9101-12" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="state">Estado</label>
                  <input type="text" name="istate" id="state" placeholder="Bahia" className="border border-dark-blue !focus:shadow-none focus:border focus:border-dark-blue focus:ring-0 focus-visible:border focus-visible:border-dark-blue focus-visible:outline-0 w-full min-h-[24px] max-h-[44px] py-2 lg:py-3 lg:max-h-12 px-2 lg:px-3 rounded-lg lg:rounded-xl"/>
                </div>
              </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="modulo">Módulo(s)</label>
                  <details id="modulo" className="px-3 min-h-[45px] border border-dark-blue rounded-lg lg:rounded-xl py-2 lg:py-3 group">
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
                            onChange={() => handleModuleChange(permission.id, permission.name)}
                            className="rounded-[3px] bg-[#F5F5F5] text-[#F5F5F5] focus:ring-0 focus:border-0"
                          />
                          <label htmlFor={`module_${permission.id}`} className="cursor-pointer">
                            {permission.name}
                          </label>
                        </li>
                      ))
                    ) : (
                      <li className="w-full flex flex-row items-center gap-x-2 text-[14px] leading-[12px] text-gray-500">
                        {dataPermission.length === 0 ? "Carregando módulos..." : "Nenhum módulo disponível"}
                      </li>
                    )}
                      <li className="w-full flex flex-row items-center gap-x-2 text-[14px] leading-[12px]">
                        <input type="checkbox" value="Funcionário ou Ex-funcionário" id="funcionario__ex_funcionario" className="rounded-[3px] bg-[#F5F5F5] text-[#F5F5F5] focus:ring-0 focus:border-0"/>
                        Array
                      </li>
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