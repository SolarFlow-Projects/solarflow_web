import { useState } from 'react'
import { User, Mail } from 'lucide-react'

interface UserData {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface EditProfileFormProps {
  user: UserData | null
  onSave: (data: { first_name: string; last_name: string; email: string }) => void
  onCancel: () => void
}

const EditProfileForm = ({ user, onSave, onCancel }: EditProfileFormProps) => {
  const [editData, setEditData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Editar Perfil</h3>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
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
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors bg-gray-100 cursor-not-allowed"
            placeholder="Digite seu email"
            disabled
            title="Email não pode ser alterado"
          />
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm
