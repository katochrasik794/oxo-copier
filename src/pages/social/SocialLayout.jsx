import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SocialNavbar from '../../components/social/SocialNavbar'
import SocialSidebar from '../../components/social/SocialSidebar'

const SocialLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <SocialNavbar 
        onMenuClick={() => setSidebarOpen(true)} 
        isMobile={isMobile}
      />
      
      {/* Mobile Sidebar */}
      <SocialSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default SocialLayout

