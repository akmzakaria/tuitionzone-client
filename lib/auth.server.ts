import { getServerSession } from 'next-auth'
import { authConfig } from './auth'
import type { Session } from 'next-auth'
import type { UserRole } from '@/lib/db/models'

/**
 * Get the current user session on the server side
 * Use this in Server Components, API Routes, and Server Actions
 *
 * @example
 * ```ts
 * const session = await getSession();
 * if (!session?.user) {
 *   redirect('/auth/signin');
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  return getServerSession(authConfig)
}

/**
 * Get the current user from the server session
 * Includes id and role from JWT token
 *
 * @example
 * ```ts
 * const user = await getCurrentUser();
 * console.log(user.email, user.role);
 * ```
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

/**
 * Check if user is authenticated
 * @example
 * ```ts
 * if (await isAuthenticated()) {
 *   // User is logged in
 * }
 * ```
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session?.user
}

/**
 * Check if user has a specific role
 * Supports single role or multiple roles
 *
 * @example
 * ```ts
 * if (await hasRole('admin')) {
 *   // User is an admin
 * }
 *
 * if (await hasRole(['admin', 'tutor'])) {
 *   // User is either admin or tutor
 * }
 * ```
 */
export async function hasRole(roles: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user?.role) return false

  const roleArray = Array.isArray(roles) ? roles : [roles]
  return roleArray.includes(user.role)
}

/**
 * Require authentication - throws error if not authenticated
 * Use at the start of Server Components or API routes
 *
 * @example
 * ```ts
 * export default async function Dashboard() {
 *   const user = await requireAuth();
 *   // User is guaranteed to be authenticated here
 * }
 * ```
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized: Authentication required')
  }
  return user
}

/**
 * Require specific role - throws error if user doesn't have role
 * Use for role-based access control
 *
 * @example
 * ```ts
 * export default async function AdminPage() {
 *   const user = await requireRole('admin');
 *   // User is guaranteed to be admin here
 * }
 * ```
 */
export async function requireRole(roles: UserRole | UserRole[]) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized: Authentication required')
  }

  const roleArray = Array.isArray(roles) ? roles : [roles]
  if (!user.role || !roleArray.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions')
  }

  return user
}

/**
 * Get user ID from session (guaranteed to exist if authenticated)
 * @example
 * ```ts
 * const userId = await getUserId();
 * ```
 */
export async function getUserId(): Promise<string | null> {
  const user = await getCurrentUser()
  return user?.id || null
}

/**
 * Get user role from session
 * @example
 * ```ts
 * const role = await getUserRole();
 * ```
 */
export async function getUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser()
  return user?.role || null
}
