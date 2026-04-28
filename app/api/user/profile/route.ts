import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth.server'

/**
 * Protected API Route: Get Current User Profile
 * Requires authentication
 *
 * Usage: GET /api/user/profile
 * Returns: Current user's profile data with role
 */
export async function GET() {
  try {
    // Require authentication - throws error if not authenticated
    const user = await requireAuth()

    // User is guaranteed to be authenticated here
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

/**
 * Protected API Route: Update User Profile
 * Requires authentication
 *
 * Usage: POST /api/user/profile
 * Body: { name?: string, ... }
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    // Validate input
    if (body.name && typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: name must be a string' },
        { status: 400 }
      )
    }

    // Process authenticated request
    // In a real app, update the user in the database here
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: body.name || user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
