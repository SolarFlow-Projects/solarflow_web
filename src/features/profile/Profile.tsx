import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ProfileCard from './_components/ProfileCard'
import ProfileInfo from './_components/ProfileInfo'
import EditProfileForm from './_components/EditProfileForm'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (data: { first_name: string; last_name: string; email: string }) => {
    // Aqui você implementaria a chamada para a API de atualização
    console.log('Salvando dados:', data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="w-full mx-auto h-auto min-h-full">
      <div className="flex lg:flex-row flex-col gap-3.5 h-auto">
        {/* Card do Perfil - Lado Esquerdo */}
        <div className="lg:flex-1/3 flex-1 lg:min-w-[400px] h-auto">
          <div className="bg-main rounded-2xl p-8 text-white text-center relative overflow-hidden shadow-block h-auto">
            <ProfileCard user={user} onEdit={handleEdit} />
          </div>
        </div>

        {/* Área de Conteúdo - Lado Direito */}
        <div className="lg:flex-2/3 flex-1 h-auto">
          <div className="bg-white rounded-2xl shadow-block p-8 h-auto">
            {isEditing ? (
              <EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />
            ) : (
              <ProfileInfo user={user} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile