import { User, CreateUserInput, UserResponse, UserRole } from './models'
import { hashPassword, comparePassword } from '@/lib/password'
import { randomUUID } from 'crypto'

/**
 * MOCK DATABASE
 * In production, replace this with your actual database (MongoDB, PostgreSQL, etc.)
 * This is intentionally simple to demonstrate the pattern
 */

interface DatabaseStore {
  users: Map<string, User>
}

// Mock in-memory database
const db: DatabaseStore = {
  users: new Map(),
}

/**
 * Initialize database with seed data
 * Remove in production - use proper migrations instead
 */
export async function initializeDatabase() {
  // Only initialize once
  if (db.users.size > 0) {
    return
  }

  try {
    // Create seed users for testing

    const seedUsers = [
      {
        email: 'guardian@example.com',
        name: 'Sarah Guardian',
        password: 'password123',
        role: UserRole.GUARDIAN,
        phone: '0123456789',
        gender: 'female',
      },
      {
        email: 'tutor@example.com',
        name: 'John Tutor',
        password: 'password123',
        role: UserRole.TUTOR,
        phone: '0987654321',
        gender: 'male',
      },
    ]

    for (const userData of seedUsers) {
      const hashedPassword = await hashPassword(userData.password)
      const user: User = {
        id: randomUUID(),
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      db.users.set(user.id, user)
    }

    console.log('✓ Database initialized with seed data')
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}

/**
 * Find user by email
 * @param email - User email
 * @returns User or null
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    for (const user of db.users.values()) {
      if (user.email.toLowerCase() === normalizedEmail) {
        return user
      }
    }
    return null
  } catch (error) {
    console.error('Find user by email error:', error)
    throw error
  }
}

/**
 * Find user by ID
 * @param id - User ID
 * @returns User or null
 */
export async function findUserById(id: string): Promise<User | null> {
  try {
    return db.users.get(id) || null
  } catch (error) {
    console.error('Find user by ID error:', error)
    throw error
  }
}

/**
 * Authenticate user with email and password
 * Returns user data without password hash
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<UserResponse | null> {
  try {
    const user = await findUserByEmail(email)

    if (!user) {
      console.warn(`Authentication failed: User not found - ${email}`)
      return null
    }

    if (!user.isActive) {
      console.warn(`Authentication failed: User inactive - ${email}`)
      return null
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      console.warn(`Authentication failed: Invalid password - ${email}`)
      return null
    }

    console.log(`✓ User authenticated: ${email}`)

    // Return user without password hash
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    }
  } catch (error) {
    console.error('User authentication error:', error)
    throw error
  }
}

/**
 * Create a new user
 * @param input - User creation data
 * @returns Created user response
 */
export async function createUser(input: CreateUserInput): Promise<UserResponse> {
  try {
    // Validate input
    if (!input.email || !input.name || !input.password) {
      throw new Error('Email, name, and password are required')
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(input.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await hashPassword(input.password)


    // Create user
    const user: User = {
      id: randomUUID(),
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      password: hashedPassword,
      role: input.role,
      phone: input.phone,
      gender: input.gender,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save to database
    db.users.set(user.id, user)

    console.log(`✓ User created: ${user.email} (${user.role})`)

    // Return without password
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    }
  } catch (error) {
    console.error('Create user error:', error)
    throw error
  }
}

/**
 * Update user (for future use)
 */
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<UserResponse | null> {
  try {
    const user = await findUserById(id)
    if (!user) {
      return null
    }

    const updated: User = {
      ...user,
      ...updates,
      id: user.id, // Don't allow id change
      createdAt: user.createdAt, // Don't allow created date change
      updatedAt: new Date(),
    }

    db.users.set(id, updated)

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      isActive: updated.isActive,
    }
  } catch (error) {
    console.error('Update user error:', error)
    throw error
  }
}

/**
 * Delete user (soft delete)
 */
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const user = await findUserById(id)
    if (!user) {
      return false
    }

    user.isActive = false
    user.updatedAt = new Date()
    db.users.set(id, user)

    console.log(`✓ User deleted (soft delete): ${user.email}`)
    return true
  } catch (error) {
    console.error('Delete user error:', error)
    throw error
  }
}

/**
 * List all users (admin only - for testing)
 */
export async function listAllUsers(): Promise<UserResponse[]> {
  try {
    return Array.from(db.users.values())
      .filter(u => u.isActive)
      .map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        isActive: u.isActive,
      }))
  } catch (error) {
    console.error('List users error:', error)
    throw error
  }
}

/**
 * Get database statistics (for debugging)
 */
export function getDatabaseStats() {
  return {
    totalUsers: db.users.size,
    activeUsers: Array.from(db.users.values()).filter(u => u.isActive).length,
    guardians: Array.from(db.users.values()).filter(u => u.role === UserRole.GUARDIAN).length,
    tutors: Array.from(db.users.values()).filter(u => u.role === UserRole.TUTOR).length,
  }
}
