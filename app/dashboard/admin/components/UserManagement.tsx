'use client'

import { useState, useEffect, useRef } from 'react'
import { User } from '../types'
import { theme } from '../../../theme'
import gsap from 'gsap'

const ROLES = [
  { value: 'guardian', label: 'Guardian', color: theme.colors.action },
  { value: 'tutor', label: 'Tutor', color: theme.colors.primary },
  { value: 'tuition_provider', label: 'Tuition Provider', color: theme.colors.secondary },
  { value: 'admin', label: 'Admin', color: '#DC2626' },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'u1',
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      role: 'guardian',
      joinDate: '2026-01-15',
    },
    {
      id: 'u2',
      name: 'Fatima Ahmed',
      email: 'fatima@example.com',
      role: 'tutor',
      joinDate: '2026-02-10',
    },
    {
      id: 'u3',
      name: 'Rahman Hassan',
      email: 'rahman@example.com',
      role: 'tuition_provider',
      joinDate: '2026-03-05',
    },
    {
      id: 'u4',
      name: 'Yasmin Rahman',
      email: 'yasmin@example.com',
      role: 'guardian',
      joinDate: '2026-01-20',
    },
    {
      id: 'u5',
      name: 'Karim Hassan',
      email: 'karim@example.com',
      role: 'tutor',
      joinDate: '2026-02-15',
    },
  ])

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }, [showModal])

  const handleRoleChange = (newRole: string) => {
    if (selectedUser) {
      setUsers(users.map(user =>
        user.id === selectedUser.id ? { ...user, role: newRole as User['role'] } : user
      ))
      closeModal()
    }
  }

  const openModal = (user: User) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setShowModal(false)
          setSelectedUser(null)
        }
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    return ROLES.find(r => r.value === role)?.color || theme.colors.background
  }

  return (
    <>
      <div ref={containerRef} className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'white' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>
          User Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderColor: theme.colors.secondary }} className="border-b-2">
                <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                  User Name
                </th>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                  Email
                </th>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                  Role
                </th>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                  Join Date
                </th>
                <th className="text-center py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderColor: theme.colors.background }} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4" style={{ color: theme.colors.text }}>
                    <span className="font-medium">{user.name}</span>
                  </td>
                  <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                    {user.email}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: getRoleBadgeColor(user.role) }}
                    >
                      {ROLES.find(r => r.value === user.role)?.label}
                    </span>
                  </td>
                  <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                    {user.joinDate}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => openModal(user)}
                      className="px-4 py-2 rounded-md text-white font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={closeModal}>
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.primary }}>
              Update Role for {selectedUser.name}
            </h3>
            <p className="mb-6" style={{ color: theme.colors.lightText }}>
              Select a new role:
            </p>
            <div className="space-y-3 mb-6">
              {ROLES.map(role => (
                <button
                  key={role.value}
                  onClick={() => handleRoleChange(role.value)}
                  className="w-full px-4 py-3 rounded-md font-medium transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: role.color, 
                    color: role.value === 'tuition_provider' ? theme.colors.primary : 'white' 
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {role.label}
                </button>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 rounded-md border-2 font-medium transition-all duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
              style={{ borderColor: theme.colors.lightText, color: theme.colors.text }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
