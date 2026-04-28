/**
 * DEBUG API ROUTE - REMOVE IN PRODUCTION
 * Test endpoint to verify authentication system is working correctly
 * 
 * Usage:
 * GET /api/debug/auth-status - Check auth system status
 * GET /api/debug/test-credentials - Get test credentials
 * POST /api/debug/test-login - Test login flow
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSession, getCurrentUser } from '@/lib/auth.server'
import { getDatabaseStats, listAllUsers, authenticateUser } from '@/lib/db/users'

/**
 * GET /api/debug/auth-status
 * Returns current authentication status and database info
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    switch (action) {
      case 'status':
        return getAuthStatus()

      case 'credentials':
        return getTestCredentials()

      case 'users':
        return getUsers()

      case 'session':
        return getCurrentSession()

      default:
        return NextResponse.json({
          debug: true,
          message: 'Authentication Debug Endpoint',
          endpoints: [
            'GET /api/debug/auth-status?action=status - System status',
            'GET /api/debug/auth-status?action=credentials - Test credentials',
            'GET /api/debug/auth-status?action=users - List all users',
            'GET /api/debug/auth-status?action=session - Current session',
            'POST /api/debug/auth-status - Test login',
          ],
          warning: 'This endpoint should be disabled in production!',
        })
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/debug/auth-status
 * Test authentication with provided credentials
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      )
    }

    const user = await authenticateUser(body.email, body.password)

    if (user) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    )
  }
}

/**
 * Helper functions
 */

async function getAuthStatus() {
  const stats = getDatabaseStats()
  const session = await getSession()
  const user = await getCurrentUser()

  return NextResponse.json({
    debug: true,
    database: stats,
    session: {
      authenticated: !!session?.user,
      user: session?.user || null,
      currentUser: user || null,
    },
  })
}

function getTestCredentials() {
  return NextResponse.json({
    debug: true,
    warning: 'These are test credentials only - REMOVE seed data in production',
    credentials: [
      {
        email: 'guardian@example.com',
        password: 'password123',
        role: 'guardian',
        name: 'Sarah Guardian',
      },
      {
        email: 'tutor@example.com',
        password: 'password123',
        role: 'tutor',
        name: 'John Tutor',
      },
    ],
    instructions: 'Use these credentials to test the sign-in flow',
  })
}

async function getUsers() {
  const users = await listAllUsers()
  const stats = getDatabaseStats()

  return NextResponse.json({
    debug: true,
    stats,
    users: users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: u.createdAt,
    })),
  })
}

async function getCurrentSession() {
  const session = await getSession()
  const user = await getCurrentUser()

  return NextResponse.json({
    debug: true,
    session: session || null,
    currentUser: user || null,
    authenticated: !!user,
  })
}
