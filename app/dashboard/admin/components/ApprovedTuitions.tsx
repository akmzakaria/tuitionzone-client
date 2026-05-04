'use client'

import { useState, useEffect, useRef } from 'react'
import { ApprovedTuition } from '../types'
import AppliedTutorsModal from './AppliedTutorsModal'
import { theme } from '../../../theme'
import gsap from 'gsap'

interface ApprovedTuitionsProps {
  onViewDetails: (id: string) => void
}

export default function ApprovedTuitions({ onViewDetails }: ApprovedTuitionsProps) {
  const [tuitions, setTuitions] = useState<ApprovedTuition[]>([
    {
      id: 'a1',
      title: 'Chemistry Tuition for Class 10',
      studentGender: 'Female',
      date: '2026-04-20',
      location: 'Dhaka, Bangladesh',
      studentName: 'Aisha Rahman',
      appliedTutorsCount: 5,
    },
    {
      id: 'a2',
      title: 'Bengali Literature Classes',
      studentGender: 'Male',
      date: '2026-04-22',
      location: 'Chittagong, Bangladesh',
      studentName: 'Karim Hassan',
      appliedTutorsCount: 3,
    },
    {
      id: 'a3',
      title: 'History of Bangladesh',
      studentGender: 'Female',
      date: '2026-04-25',
      location: 'Sylhet, Bangladesh',
      studentName: 'Yasmin Ahmed',
      appliedTutorsCount: 7,
    },
  ])

  const [selectedTuitionId, setSelectedTuitionId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const handleViewAppliedTutors = (id: string) => {
    setSelectedTuitionId(id)
    setShowModal(true)
  }

  return (
    <>
      <div
        ref={containerRef}
        className="rounded-lg shadow-md p-6"
        style={{ backgroundColor: 'white' }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.primary }}>
          Approved Tuitions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderColor: theme.colors.secondary }} className="border-b-2">
                <th
                  className="text-left py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Tuition Title
                </th>
                <th
                  className="text-left py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Student Gender
                </th>
                <th
                  className="text-left py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Date
                </th>
                <th
                  className="text-left py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Location
                </th>
                <th
                  className="text-left py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Student Name
                </th>
                <th
                  className="text-center py-4 px-4 font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tuitions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8"
                    style={{ color: theme.colors.lightText }}
                  >
                    No approved tuitions
                  </td>
                </tr>
              ) : (
                tuitions.map((tuition) => (
                  <tr
                    key={tuition.id}
                    style={{ borderColor: theme.colors.background }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4" style={{ color: theme.colors.text }}>
                      <span className="font-medium">{tuition.title}</span>
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tuition.studentGender}
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tuition.date}
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tuition.location}
                    </td>
                    <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                      {tuition.studentName}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => onViewDetails(tuition.id)}
                          title="View Details"
                          className="px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-lg active:scale-95"
                          style={{ backgroundColor: theme.colors.action, color: 'white' }}
                        >
                          <svg
                            className="w-5 h-5 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleViewAppliedTutors(tuition.id)}
                          title="View Applied Tutors"
                          className="px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-lg active:scale-95"
                          style={{
                            backgroundColor: theme.colors.secondary,
                            color: theme.colors.primary,
                          }}
                        >
                          <svg
                            className="w-5 h-5 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTuitionId && (
        <AppliedTutorsModal
          tuitionId={selectedTuitionId}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setSelectedTuitionId(null)
          }}
        />
      )}
    </>
  )
}
