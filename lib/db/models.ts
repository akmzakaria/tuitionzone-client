/**
 * User Role Types
 * Define the roles available in the system
 */
export enum UserRole {
  GUARDIAN = 'guardian',
  TUTOR = 'tutor',
}

/**
 * User Model
 * Represents a user in the system
 */
export interface User {
  id: string
  email: string
  name: string
  password: string // Hashed password
  role: UserRole
  phone: string
  gender: string
  createdAt: Date
  updatedAt: Date
  isActive?: boolean
}

/**
 * User Input Type
 * Used for creating/updating users (without id, timestamps)
 */
export interface CreateUserInput {
  email: string
  name: string
  password: string // Plain text, will be hashed
  role: UserRole
  phone: string
  gender: string
}

/**
 * User Response Type
 * Returned to client (excludes password hash)
 */
export interface UserResponse {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  isActive?: boolean
}

/**
 * User without sensitive data
 * Safe to include in JWT/session
 */
export interface UserPublic {
  id: string
  email: string
  name: string
  role: UserRole
}
