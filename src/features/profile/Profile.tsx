import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ProfileCard from './_components/ProfileCard'
import ProfileInfo from './_components/ProfileInfo'
import EditProfileForm from './_components/EditProfileForm'
import ProfileTabs from './_components/ProfileTabs'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('info')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEdit = () => {
    setActiveTab('edit')
    setError(null)
  }

  const handleSave = async (data: { first_name: string; last_name: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      await updateProfile(data)
      setActiveTab('info')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar perfil'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setActiveTab('info')
    setError(null)
  }

  return (
    <div className="w-full mx-auto h-auto min-h-full">
      <div className="flex lg:flex-row flex-col gap-3.5 h-auto">
        {/* Card do Perfil - Lado Esquerdo */}
        <div className="lg:flex-1/3 flex-1 lg:min-w-[400px] h-auto">
          <div className="bg-main rounded-[10px] p-8 text-white text-center relative overflow-hidden shadow-green min-h-[calc(100vh-119px)]">
            <ProfileCard user={user} onEdit={handleEdit} />
          </div>
        </div>

        {/* Área de Conteúdo - Lado Direito */}
        <div className="lg:flex-2/3 flex-1 h-auto min-w-0">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="bg-white rounded-[10px] shadow-block p-8 min-h-[calc(100vh-185px)]">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            {activeTab === 'info' && (
              <ProfileInfo user={user} onEdit={handleEdit} />
            )}
            {activeTab === 'edit' && (
              <EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} isLoading={isLoading} />
            )}
            {!['info', 'edit'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <p className="text-lg font-medium">Em desenvolvimento</p>
                <p className="text-sm mt-2">Este conteúdo estará disponível em breve</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile