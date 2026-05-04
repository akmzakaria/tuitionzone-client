'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { theme } from '../../../theme'
import gsap from 'gsap'

interface SidebarProps {
  activeTab: 'requests' | 'approved' | 'users'
  onTabChange: (tab: 'requests' | 'approved' | 'users') => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <aside
      ref={sidebarRef}
      className="w-64 text-white flex flex-col h-screen"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="p-6 border-b-2" style={{ borderColor: theme.colors.secondary }}>
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/tuitionzonebd2_bg-removed_edited.png"
            className="w-32"
            alt="TuitionZone Logo"
          />
        </Link>
        {/* <p className="text-sm mt-2 opacity-80">Admin Dashboard</p> */}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => onTabChange('requests')}
          className="w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-3"
          style={
            activeTab === 'requests'
              ? { backgroundColor: theme.colors.secondary, color: theme.colors.primary }
              : { color: 'white' }
          }
          onMouseEnter={(e) => {
            if (activeTab !== 'requests') {
              e.currentTarget.style.opacity = '0.9'
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'requests') {
              e.currentTarget.style.opacity = '1'
            }
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          Tuition Requests
        </button>

        <button
          onClick={() => onTabChange('approved')}
          className="w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-3"
          style={
            activeTab === 'approved'
              ? { backgroundColor: theme.colors.secondary, color: theme.colors.primary }
              : { color: 'white' }
          }
          onMouseEnter={(e) => {
            if (activeTab !== 'approved') {
              e.currentTarget.style.opacity = '0.9'
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'approved') {
              e.currentTarget.style.opacity = '1'
            }
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Approved Tuitions
        </button>

        <button
          onClick={() => onTabChange('users')}
          className="w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-3"
          style={
            activeTab === 'users'
              ? { backgroundColor: theme.colors.secondary, color: theme.colors.primary }
              : { color: 'white' }
          }
          onMouseEnter={(e) => {
            if (activeTab !== 'users') {
              e.currentTarget.style.opacity = '0.9'
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'users') {
              e.currentTarget.style.opacity = '1'
            }
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          User Management
        </button>
      </nav>

      <div className="p-4 border-t" style={{ borderColor: theme.colors.accent }}>
        <button
          className="w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-3 hover:opacity-90"
          style={{ color: 'white' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  )
}
