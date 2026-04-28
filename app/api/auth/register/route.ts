import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/db/users'
import { validatePassword } from '@/lib/password'
import { UserRole } from '@/lib/db/models'

/**
 * Public API Route: User Registration
 * Creates a new user account in the system
 *
 * Usage: POST /api/auth/register
 * Body: {
 *   email: string
 *   name: string
 *   password: string
 *   role: "guardian" | "tutor"
 * }
 *
 * Success: 201 with user data
 * Error: 400 for validation errors, 409 for duplicate email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()


    // Validate required fields
    if (!body.email || !body.name || !body.password || !body.role || !body.phone || !body.gender) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, password, role, phone, gender' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate name
    if (typeof body.name !== 'string' || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = validatePassword(body.password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = [UserRole.GUARDIAN, UserRole.TUTOR]
    if (!validRoles.includes(body.role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      )
    }


    // Create user in database
    const user = await createUser({
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role,
      phone: body.phone,
      gender: body.gender,
    })

    console.log(`✓ New user registered: ${user.email} (${user.role})`)

    // Return created user (201 Created status)
    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Handle duplicate email
    if (errorMessage.includes('already exists')) {
      return NextResponse.json(
        { error: 'Email already in use. Please try a different email.' },
        { status: 409 } // Conflict
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: errorMessage || 'Internal server error' },
      { status: 500 }
    )
  }
}
