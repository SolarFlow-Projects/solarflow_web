import HeaderApp from "../../components/HeaderApp"

const Clientes = () => {
  return (
    <>
      <HeaderApp 
        userName="Gustavo Costa"
        userRole="Administrador"
        notificationCount={3}
      />
      
      <main className="pt-24 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Clientes</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">Conteúdo de clientes será implementado aqui...</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Clientes
