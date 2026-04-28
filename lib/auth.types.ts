import type { DefaultSession, DefaultUser } from 'next-auth'
import type { UserRole } from '@/lib/db/models'

/**
 * Extended NextAuth User type
 * Adds custom properties: id and role
 */
declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string
    role?: UserRole
  }

  interface Session {
    user: {
      id: string
      role?: UserRole
    } & DefaultSession['user']
  }
}

/**
 * Extended JWT type
 * Adds custom claims: id and role
 */
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: UserRole
  }
}
