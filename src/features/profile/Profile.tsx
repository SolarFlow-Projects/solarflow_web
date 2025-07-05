import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Edit, User, Mail, Phone, MapPin, Briefcase, Hash } from 'lucide-react'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  // Estados para edição dos dados
  const [editData, setEditData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    // Campos que ainda não existem na API - usando fallbacks
    phone: user?.phone || '(77) 99999-9999', // Fallback
    address: user?.address || 'Endereço não informado', // Fallback
    cpf: user?.cpf || '000.000.000-00', // Fallback
    birth_date: user?.birth_date || '1990-01-01', // Fallback
    department: user?.department || 'Departamento não informado', // Fallback
    position: user?.position || 'Cargo não informado' // Fallback
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    // Aqui você implementaria a chamada para a API de atualização
    console.log('Salvando dados:', editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restaura os dados originais
    setEditData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '(77) 99999-9999',
      address: user?.address || 'Endereço não informado',
      cpf: user?.cpf || '000.000.000-00',
      birth_date: user?.birth_date || '1990-01-01',
      department: user?.department || 'Departamento não informado',
      position: user?.position || 'Cargo não informado'
    })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Função para pegar as iniciais do nome
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
    }
    return 'UN'
  }

  // Função para pegar o primeiro cargo do usuário real
  const getPrimaryRole = () => {
    if (user?.roles && user.roles.length > 0) {
      return user.roles[0].name
    }
    return 'Sem cargo definido'
  }

  // Função para contar permissões
  const getTotalPermissions = () => {
    if (user?.roles && user.roles.length > 0) {
      let totalPermissions = 0
      user.roles.forEach(role => {
        if (role.permissions) {
          totalPermissions += role.permissions.length
        }
      })
      return totalPermissions
    }
    return 0
  }

  // Função para formatar data brasileira
  const formatDateBR = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return 'Data inválida'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header com navegação */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="text-main">Tarefas</span>
          <span>/</span>
          <span className="text-main">Opção 2</span>
          <span>/</span>
          <span>Opção 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card do Perfil - Lado Esquerdo */}
        <div className="lg:col-span-1">
          <div className="bg-main rounded-2xl p-8 text-white text-center relative overflow-hidden">
            {/* Padrão de fundo decorativo */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="profile-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor"/>
                    <circle cx="0" cy="0" r="1" fill="currentColor"/>
                    <circle cx="40" cy="40" r="1" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#profile-pattern)"/>
              </svg>
            </div>

            {/* Botão de editar */}
            <button 
              onClick={handleEdit}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
            >
              <Edit size={20} />
            </button>

            {/* Avatar */}
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue flex items-center justify-center text-white text-2xl font-bold border-4 border-white/20">
                {getInitials()}
              </div>

              {/* Nome do usuário */}
              <h2 className="text-xl font-bold mb-1">
                {user?.first_name} {user?.last_name}
              </h2>
              
              {/* Email */}
              <p className="text-white/80 text-sm mb-6">
                {user?.email}
              </p>

              {/* Informações do perfil */}
              <div className="space-y-4 text-left">
                {/* Nome */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Nome</label>
                  <p className="text-white font-medium">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Email</label>
                  <p className="text-white font-medium break-all">
                    {user?.email}
                  </p>
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Telefone</label>
                  <p className="text-white font-medium">
                    {user?.phone || '(77) 99999-9999'}
                  </p>
                </div>

                {/* ID - usando slice para mostrar apenas os últimos 8 caracteres */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Id</label>
                  <p className="text-white font-medium text-xs break-all">
                    #{user?.id?.slice(-8).toUpperCase() || 'XXXXXXXX'}
                  </p>
                </div>

                {/* Cargos com contador de permissões */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Cargos</label>
                  <div className="space-y-1">
                    <p className="text-white font-medium">
                      {getPrimaryRole()}
                    </p>
                    {user?.roles && user.roles.length > 0 && (
                      <p className="text-white/70 text-xs">
                        {getTotalPermissions()} permissões ativas
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Conteúdo - Lado Direito */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-block p-8">
            {isEditing ? (
              /* Modo de Edição */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Editar Perfil</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-main text-white rounded-lg hover:bg-hover-cyan transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Primeiro Nome
                    </label>
                    <input
                      type="text"
                      value={editData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite seu primeiro nome"
                    />
                  </div>

                  {/* Sobrenome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      value={editData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite seu sobrenome"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite seu email"
                      disabled
                      title="Email não pode ser alterado"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="(xx) xxxxx-xxxx"
                    />
                  </div>

                  {/* CPF - Novo campo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Hash size={16} className="inline mr-2" />
                      CPF
                    </label>
                    <input
                      type="text"
                      value={editData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="000.000.000-00"
                    />
                  </div>

                  {/* Data de Nascimento - Novo campo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={editData.birth_date}
                      onChange={(e) => handleInputChange('birth_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                    />
                  </div>

                  {/* Endereço */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-2" />
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite seu endereço completo"
                    />
                  </div>

                  {/* Departamento - Novo campo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase size={16} className="inline mr-2" />
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={editData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite seu departamento"
                    />
                  </div>

                  {/* Posição - Novo campo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase size={16} className="inline mr-2" />
                      Posição
                    </label>
                    <input
                      type="text"
                      value={editData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      placeholder="Digite sua posição"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Modo de Visualização */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Informações do Perfil</h3>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-hover-cyan transition-colors"
                  >
                    <Edit size={16} />
                    Editar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informações Pessoais */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User size={18} className="text-main" />
                      Informações Pessoais
                    </h4>
                    
                    <div className="space-y-3 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Nome Completo</label>
                        <p className="text-gray-900 font-medium">
                          {user?.first_name} {user?.last_name}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-900 font-medium break-all">
                          {user?.email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Telefone</label>
                        <p className="text-gray-900 font-medium">
                          {user?.phone || '(77) 99999-9999'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">CPF</label>
                        <p className="text-gray-900 font-medium">
                          {user?.cpf || '000.000.000-00'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">Data de Nascimento</label>
                        <p className="text-gray-900 font-medium">
                          {user?.birth_date ? formatDateBR(user.birth_date) : '01/01/1990'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">Endereço</label>
                        <p className="text-gray-900 font-medium">
                          {user?.address || 'Endereço não informado'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informações Profissionais */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Briefcase size={18} className="text-main" />
                      Informações Profissionais
                    </h4>
                    
                    <div className="space-y-3 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Cargo Principal</label>
                        <p className="text-gray-900 font-medium">
                          {getPrimaryRole()}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">Departamento</label>
                        <p className="text-gray-900 font-medium">
                          {user?.department || 'Departamento não informado'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">Posição</label>
                        <p className="text-gray-900 font-medium">
                          {user?.position || 'Posição não informada'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600">Total de Permissões</label>
                        <p className="text-gray-900 font-medium">
                          {getTotalPermissions()} permissões ativas
                        </p>
                      </div>
                      
                      {user?.roles && user.roles.length > 1 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Outros Cargos</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {user.roles.slice(1).map((role, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-main/10 text-main text-xs rounded-full"
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">ID do Usuário</label>
                        <p className="text-gray-900 font-medium text-sm font-mono break-all">
                          {user?.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informações da Conta */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Hash size={18} className="text-main" />
                      Informações da Conta
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Data de Criação</label>
                        <p className="text-gray-900 font-medium">
                          {user?.created_at ? formatDateBR(user.created_at) : 'N/A'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Última Atualização</label>
                        <p className="text-gray-900 font-medium">
                          {user?.updated_at ? formatDateBR(user.updated_at) : 'N/A'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Status da Conta</label>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user?.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            user?.active ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          {user?.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>

                    {/* Seção de Permissões - Nova */}
                    {user?.roles && user.roles.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <h5 className="font-medium text-gray-900 mb-3">Permissões Detalhadas</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                          {user.roles.map((role, roleIndex) => (
                            <div key={roleIndex} className="space-y-2">
                              <h6 className="text-sm font-medium text-main">{role.name}</h6>
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.map((permission, permIndex) => (
                                  <span 
                                    key={permIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                    title={permission.name}
                                  >
                                    {permission.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ID do Estabelecimento */}
                    <div className="pt-2">
                      <label className="block text-sm font-medium text-gray-600">ID do Estabelecimento</label>
                      <p className="text-gray-900 font-medium text-sm font-mono break-all">
                        {user?.places_id}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile