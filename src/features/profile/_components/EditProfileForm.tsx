import { useState } from 'react'
import { User as UserIcon, Mail } from 'lucide-react'
import { User } from '../../../types/user'

interface EditProfileFormProps {
  user: User | null
  onSave: (data: { first_name: string; last_name: string }) => void
  onCancel: () => void
  isLoading?: boolean
}

const EditProfileForm = ({ user, onSave, onCancel, isLoading = false }: EditProfileFormProps) => {
  const [editData, setEditData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || ''
  })

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    onSave(editData)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center items-start justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 md:mb-0">Editar Perfil</h3>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-main text-white rounded-lg hover:bg-hover-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon size={16} className="inline mr-2" />
            Primeiro Nome
          </label>
          <input
            type="text"
            value={editData.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Digite seu primeiro nome"
          />
        </div>

        {/* Sobrenome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon size={16} className="inline mr-2" />
            Sobrenome
          </label>
          <input
            type="text"
            value={editData.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Digite seu sobrenome"
          />
        </div>

        {/* Email - Somente leitura */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
            title="Email não pode ser alterado"
          />
          <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado</p>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm
