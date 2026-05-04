'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '../theme'

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // TODO: Get user role from auth context/session
    const userRole: string = 'admin' // Replace with actual role from auth

    switch (userRole) {
      case 'admin':
        router.replace('/dashboard/admin')
        break
      case 'guardian':
        router.replace('/dashboard/guardian')
        break
      case 'tutor':
        router.replace('/dashboard/tutor')
        break
      case 'tuition-provider':
        router.replace('/dashboard/tuition-provider')
        break
      default:
        router.replace('/')
    }
  }, [router])

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div
        className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent"
        style={{
          borderColor: `${theme.colors.secondary} transparent ${theme.colors.secondary} ${theme.colors.secondary}`,
        }}
      />
    </div>
  )
}
