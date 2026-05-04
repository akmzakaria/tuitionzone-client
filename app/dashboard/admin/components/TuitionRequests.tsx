'use client'

import { useState, useEffect, useRef } from 'react'
import { TuitionRequest } from '../types'
import { theme } from '../../../theme'
import gsap from 'gsap'

interface TuitionRequestsProps {
  onViewDetails: (id: string) => void
}

export default function TuitionRequests({ onViewDetails }: TuitionRequestsProps) {
  const [requests, setRequests] = useState<TuitionRequest[]>([
    {
      id: '1',
      title: 'Mathematics Tuition',
      date: '2026-05-10',
      location: 'Dhaka, Bangladesh',
      guardianName: 'Ahmed Khan',
      status: 'pending',
    },
    {
      id: '2',
      title: 'English Language Classes',
      date: '2026-05-12',
      location: 'Chittagong, Bangladesh',
      guardianName: 'Fatima Ahmed',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Physics Tuition',
      date: '2026-05-15',
      location: 'Sylhet, Bangladesh',
      guardianName: 'Rahman Hassan',
      status: 'pending',
    },
  ])

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

  const handleApprove = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  const handleReject = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  return (
    <div
      ref={containerRef}
      className="rounded-lg shadow-md p-6 mb-8"
      style={{ backgroundColor: 'white' }}
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.primary }}>
        Tuition Requests
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
                Guardian Name
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
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8"
                  style={{ color: theme.colors.lightText }}
                >
                  No pending tuition requests
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  style={{ borderColor: theme.colors.background }}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4" style={{ color: theme.colors.text }}>
                    <span className="font-medium">{request.title}</span>
                  </td>
                  <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                    {request.date}
                  </td>
                  <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                    {request.location}
                  </td>
                  <td className="py-4 px-4" style={{ color: theme.colors.lightText }}>
                    {request.guardianName}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleApprove(request.id)}
                        title="Approve"
                        className="p-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.primary }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        title="Reject"
                        className="p-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: theme.colors.lightText, color: 'white' }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onViewDetails(request.id)}
                        title="View Details"
                        className="p-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: theme.colors.action, color: 'white' }}
                      >
                        <svg
                          className="w-5 h-5"
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
