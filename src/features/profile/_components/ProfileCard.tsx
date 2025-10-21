import { Edit } from 'lucide-react'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  roles?: Array<{
    id: string
    name: string
    permissions: Array<{
      id: string
      name: string
    }>
  }>
}

interface ProfileCardProps {
  user: User | null
  onEdit: () => void
}

const ProfileCard = ({ user, onEdit }: ProfileCardProps) => {
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
    }
    return 'UN'
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
        onClick={onEdit}
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

          {/* ID */}
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
  )
}

export default ProfileCard
