import React, { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isMobileOpen: boolean
  toggleMobile: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <SidebarContext.Provider value={{ isMobileOpen, toggleMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de SidebarProvider')
  }
  return context
}