'use client'

import { useState, useEffect, useRef } from 'react'
import { Tutor } from '../admin/types'
import { theme } from '../theme'
import gsap from 'gsap'

interface AppliedTutorsModalProps {
  tuitionId: string
  isOpen: boolean
  onClose: () => void
}

export default function AppliedTutorsModal({
  tuitionId,
  isOpen,
  onClose,
}: AppliedTutorsModalProps) {
  const [tutors] = useState<Tutor[]>([
    {
      id: 't1',
      name: 'Dr. Md. Habibur Rahman',
      location: 'Dhaka, Bangladesh',
      gender: 'Male',
      profile: 'Expert teacher with 10+ years experience in Chemistry',
      hasOwnDashboard: true,
    },
    {
      id: 't2',
      name: 'Nusrat Jahan',
      location: 'Dhaka, Bangladesh',
      gender: 'Female',
      profile: 'Chemistry specialist, holds Masters degree',
      hasOwnDashboard: true,
    },
    {
      id: 't3',
      name: 'Abdullah Ahmed',
      location: 'Dhaka, Bangladesh',
      gender: 'Male',
      profile: 'Chemistry tutor, 5+ years of teaching experience',
      hasOwnDashboard: false,
    },
    {
      id: 't4',
      name: 'Sabrina Khan',
      location: 'Dhaka, Bangladesh',
      gender: 'Female',
      profile: 'Online chemistry teacher, very interactive classes',
      hasOwnDashboard: true,
    },
    {
      id: 't5',
      name: 'Faisal Hasan',
      location: 'Dhaka, Bangladesh',
      gender: 'Male',
      profile: 'Chemistry expert, board exam specialist',
      hasOwnDashboard: true,
    },
  ])

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }, [isOpen])

  const handleApprove = (tutorId: string) => {
    console.log(`Approved tutor ${tutorId} for tuition ${tuitionId}`)
  }

  const handleReject = (tutorId: string) => {
    console.log(`Rejected tutor ${tutorId} for tuition ${tuitionId}`)
  }

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        onComplete: onClose
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={handleClose}>
      <div ref={modalRef} className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div
          className="sticky top-0 border-b-2 p-6 flex justify-between items-center bg-white"
          style={{ borderColor: theme.colors.secondary }}
        >
          <h2 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
            Applied Tutors
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-md transition-all duration-200 hover:bg-gray-200"
            style={{ color: theme.colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderColor: theme.colors.secondary }} className="border-b-2">
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Tutor Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Location
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Gender
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Profile
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Dashboard
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: theme.colors.primary }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tutors.map(tutor => (
                  <tr key={tutor.id} style={{ borderColor: theme.colors.background }} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4" style={{ color: theme.colors.text }}>
                      <span className="font-medium">{tutor.name}</span>
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tutor.location}
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tutor.gender}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => console.log(`View profile for ${tutor.id}`)}
                        className="px-3 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: theme.colors.action, color: 'white' }}
                      >
                        View Profile
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {tutor.hasOwnDashboard ? (
                        <button
                          onClick={() => console.log(`View dashboard for ${tutor.id}`)}
                          className="px-3 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
                          style={{ backgroundColor: theme.colors.secondary, color: theme.colors.primary }}
                        >
                          View Dashboard
                        </button>
                      ) : (
                        <span style={{ color: theme.colors.lightText }}>—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          onClick={() => handleApprove(tutor.id)}
                          title="Approve"
                          className="p-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95"
                          style={{ backgroundColor: theme.colors.secondary, color: theme.colors.primary }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleReject(tutor.id)}
                          title="Reject"
                          className="p-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95"
                          style={{ backgroundColor: theme.colors.lightText, color: 'white' }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
