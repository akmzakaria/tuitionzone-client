import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth.server'
import { listAllUsers, getDatabaseStats } from '@/lib/db/users'
import { UserRole } from '@/lib/db/models'

/**
 * Protected Admin API Route: List All Users
 * Requires admin role for access control demonstration
 *
 * Usage: GET /api/admin/users
 * Returns: List of all active users in the system
 *
 * Note: In production, implement proper admin role checking
 * For now, this demonstrates role-based access pattern
 */
export async function GET() {
  try {
    // For demo purposes, we'll check if user is a tutor (can be extended to admin)
    // In production, implement a proper admin role
    const user = await requireRole([UserRole.TUTOR, UserRole.GUARDIAN])

    // Get list of users
    const users = await listAllUsers()
    const stats = getDatabaseStats()

    console.log(`✓ Admin accessed users list: ${user.email}`)

    return NextResponse.json({
      success: true,
      stats,
      users,
      message: `Found ${users.length} active users`,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isUnauthorized = errorMessage.includes('Unauthorized')
    const isForbidden = errorMessage.includes('Forbidden')

    return NextResponse.json(
      { error: errorMessage },
      { status: isUnauthorized ? 401 : isForbidden ? 403 : 500 }
    )
  }
}
