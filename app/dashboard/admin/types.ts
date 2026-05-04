// Types for Admin Dashboard

export interface TuitionRequest {
  id: string
  title: string
  date: string
  location: string
  guardianName: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface ApprovedTuition {
  id: string
  title: string
  studentGender: string
  date: string
  location: string
  studentName: string
  appliedTutorsCount: number
}

export interface Tutor {
  id: string
  name: string
  location: string
  gender: string
  profile: string
  hasOwnDashboard: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'guardian' | 'tutor' | 'tuition_provider' | 'admin'
  joinDate: string
}
