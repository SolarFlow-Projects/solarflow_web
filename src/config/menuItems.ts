import homeIcon from '../assets/icons/aside/home.svg'
import personIcon from '../assets/icons/aside/person.svg'
import peopleIcon from '../assets/icons/aside/people.svg'
import tasksIcon from '../assets/icons/aside/tasks.svg'
import stockIcon from '../assets/icons/aside/stock.svg'
import reportIcon from '../assets/icons/aside/report.svg'
import mapIcon from '../assets/icons/aside/map.svg'
import configIcon from '../assets/icons/aside/config.svg'

export interface SubMenuItem {
  id: string
  label: string
  path: string
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  submenu?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    id: 'painel',
    label: 'Painel',
    icon: homeIcon,
    path: '/painel'
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: personIcon,
    path: '/profile'
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: peopleIcon,
    path: '/clientes',
    submenu: [
      { id: 'clientes-lista1', label: 'Lista de Clientes 1', path: '/clientes/lista1' },
      { id: 'clientes-lista2', label: 'Lista de Clientes 2', path: '/clientes/lista2' },
      { id: 'clientes-lista3', label: 'Lista de Clientes 3', path: '/clientes/lista3' },
      { id: 'clientes-lista4', label: 'Lista de Clientes 4', path: '/clientes/lista4' },
      { id: 'clientes-novo', label: 'Novo Cliente', path: '/clientes/novo' },
    ]
  },
  {
    id: 'tarefas',
    label: 'Tarefas',
    icon: tasksIcon,
    path: '/tarefas',
    submenu: [
      { id: 'tarefas-lista', label: 'Lista de Tarefas', path: '/tarefas' },
      { id: 'tarefas-nova', label: 'Nova Tarefa', path: '/tarefas/nova' },
    ]
  },
  {
    id: 'estoque',
    label: 'Estoque',
    icon: stockIcon,
    path: '/estoque',
    submenu: [
      { id: 'estoque-lista', label: 'Lista de Estoque', path: '/estoque' },
      { id: 'estoque-novo', label: 'Novo Item', path: '/estoque/novo' },
    ]
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: reportIcon,
    path: '/relatorios',
    submenu: [
      { id: 'relatorios-vendas', label: 'Vendas', path: '/relatorios/vendas' },
      { id: 'relatorios-financeiro', label: 'Financeiro', path: '/relatorios/financeiro' },
    ]
  },
  {
    id: 'mapa',
    label: 'Mapa',
    icon: mapIcon,
    path: '/mapa'
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: configIcon,
    path: '/configuracoes'
  }
]
