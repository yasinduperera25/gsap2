import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/lib/gsap'
import { Sidebar } from '@/components/navigation/Sidebar'
import { Topbar } from '@/components/navigation/Topbar'
import { Footer } from './Footer'
import { PageTransition } from './PageTransition'

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  useEffect(() => {
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 220)
    return () => window.clearTimeout(refresh)
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="lg:pl-[280px]">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </div>
  )
}
