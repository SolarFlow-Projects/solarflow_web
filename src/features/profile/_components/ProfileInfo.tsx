import { User, Briefcase, Hash, Edit } from 'lucide-react'

interface UserData {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
  updated_at: string
  active: boolean
  places_id: string
  roles?: Array<{
    id: string
    name: string
    permissions: Array<{
      id: string
      name: string
    }>
    created_at: string
    updated_at: string
    places_id: string
  }>
}

interface ProfileInfoProps {
  user: UserData | null
  onEdit: () => void
}

const ProfileInfo = ({ user, onEdit }: ProfileInfoProps) => {
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

  const getPrimaryRole = () => {
    if (user?.roles && user.roles.length > 0) {
      return user.roles[0].name
    }
    return 'Sem cargo definido'
  }

  const getTotalPermissions = () => {
    if (user?.roles && user.roles.length > 0) {
      return user.roles.reduce((total, role) => {
        return total + (role.permissions?.length || 0)
      }, 0)
    }
    return 0
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Informações do Perfil</h3>
        <button
          onClick={onEdit}
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

          {/* Seção de Permissões */}
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
  )
}

export default ProfileInfo
