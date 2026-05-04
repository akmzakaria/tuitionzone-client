'use client'

import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import TuitionRequests from './components/TuitionRequests'
import ApprovedTuitions from './components/ApprovedTuitions'
import UserManagement from './components/UserManagement'
import { theme } from '../../theme'
import gsap from 'gsap'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'requests' | 'approved' | 'users'>('requests')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])

  const handleViewDetails = (id: string) => {
    console.log(`View details for: ${id}`)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
            setSidebarOpen(false)
          }}
        />
      </div>

      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div
          ref={headerRef}
          className="border-b-4 px-4 sm:px-8 py-4 sm:py-6"
          style={{
            backgroundColor: 'white',
            borderColor: theme.colors.secondary,
          }}
        >
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              style={{ color: theme.colors.primary }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: theme.colors.primary }}>
              Admin Dashboard
            </h1>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8">
            {activeTab === 'requests' && <TuitionRequests onViewDetails={handleViewDetails} />}

            {activeTab === 'approved' && <ApprovedTuitions onViewDetails={handleViewDetails} />}

            {activeTab === 'users' && <UserManagement />}
          </div>
        </main>
      </div>
    </div>
  )
}
