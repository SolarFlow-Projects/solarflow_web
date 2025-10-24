import { User, Edit, CheckSquare, FileText, Bell, Shield, Settings, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  const tabs = [
    { id: 'info', label: 'Informações', icon: User },
    { id: 'edit', label: 'Editar Perfil', icon: Edit },
    { id: 'tarefas', label: 'Tarefas', icon: CheckSquare },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'preferencias', label: 'Preferências', icon: Settings },
    { id: 'historico', label: 'Histórico', icon: Calendar },
  ]

  return (
    <div className="bg-white rounded-[10px] shadow-block mb-3.5">
      <div className="flex items-center justify-between p-2">
        <button
          aria-label="Rolar para esquerda"
          className="swiper-btn-prev p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-all
                     disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft size={20} />
        </button>

        <Swiper
          modules={[Navigation]} 
          navigation={{
            prevEl: '.swiper-btn-prev',
            nextEl: '.swiper-btn-next',
          }}
          slidesPerView="auto"
          spaceBetween={16}
          className="flex-1 mx-2"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const IconComponent = tab.icon

            return (
              <SwiperSlide key={tab.id} style={{ width: 'auto' }}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex items-center gap-2 py-2 px-4 rounded-lg
                    text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-main text-white'
                      : 'bg-white text-main hover:bg-gray-100'
                    }
                  `}
                >
                  <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{tab.label}</span>
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <button
          aria-label="Rolar para direita"
          className="swiper-btn-next p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-all
                     disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default ProfileTabs