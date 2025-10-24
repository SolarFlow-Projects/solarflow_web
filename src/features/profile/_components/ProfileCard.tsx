import { Edit } from 'lucide-react'
import { User } from '../../../types/user'

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

  return (
    <>
      <button
        onClick={onEdit}
        className="absolute top-6 right-6 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 z-20"
      >
        <Edit size={20} />
      </button>

      <div className="relative z-10 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue flex items-center justify-center text-white text-2xl font-bold border-4 border-white/20">
          {getInitials()}
        </div>

        <h2 className="text-xl font-bold mb-1">
          {user?.first_name} {user?.last_name}
        </h2>

        <p className="text-white/80 text-sm mb-6">
          {user?.email}
        </p>

        <div className="border-t border-white/30 my-4" />

        <div className="space-y-3 text-left">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="text-white/90 mb-1 md:mb-0">Nome</span>
            <span className="font-medium md:text-right">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="text-white/90 mb-1 md:mb-0">Email</span>
            <span className="font-medium md:text-right break-all">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="border-t border-white/30 my-4" />

        <div className="space-y-3 text-left">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="text-white/90 mb-1 md:mb-0">id</span>
            <span className="font-medium md:text-right text-xs break-all">
              {user?.id || 'XXXXXXXX'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="text-white/90 mb-1 md:mb-0">Cargos</span>
            <span className="font-medium md:text-right">
              {getPrimaryRole()}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard