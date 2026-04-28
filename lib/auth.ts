import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { authenticateUser, initializeDatabase, findUserByEmail, createUser } from '@/lib/db/users'
import { UserRole } from '@/lib/db/models'

/**
 * Initialize database on startup
 */
initializeDatabase().catch(error => {
  console.error('Failed to initialize database:', error)
})

/**
 * Credentials Provider configuration for NextAuth
 * Validates user credentials against the database with bcrypt password hashing
 */
const credentialsProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    // Validate that credentials are provided
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Email and password are required')
    }

    try {
      // Authenticate user against database with bcrypt password comparison
      const user = await authenticateUser(credentials.email, credentials.password)

      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Return user object if authentication succeeds
      // The object returned here is available as the `user` property in the JWT
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    } catch (error) {
      console.error('Auth error:', error)
      return null
    }
  },
})

/**
 * Google OAuth Provider configuration
 * Allows users to sign up and log in using their Google account
 */
const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
})

export const authConfig: NextAuthConfig = {
  providers: [credentialsProvider, googleProvider],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    /**
     * JWT Callback: Called whenever JWT is created or updated
     * Adds user role and ID to the token for role-based access control
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
      }
      return token
    },

    /**
     * Session Callback: Called whenever session is checked
     * Exposes token properties (id, role) to the session object
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },

    /**
     * SignIn Callback: Called on successful sign in
     * Can be used for additional logic like logging, analytics, etc.
     */
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true
      }

      // Handle Google OAuth
      if (account?.provider === 'google' && user?.email) {
        try {
          // Check if user exists in database
          const existingUser = await findUserByEmail(user.email)
          
          if (!existingUser) {
            // Create new user from Google OAuth
            // Google users don't have passwords, so we use a placeholder
            await createUser({
              email: user.email,
              name: user.name || 'Google User',
              password: 'google_oauth_' + Math.random().toString(36).slice(2),
              role: UserRole.GUARDIAN, // Default to guardian
              phone: '',
              gender: '',
            })
            console.log(`✓ New Google user created: ${user.email}`)
          }
          return true
        } catch (error) {
          console.error('Google OAuth sign-in error:', error)
          return false
        }
      }

      return false
    },
  },
  events: {
    /**
     * SignIn Event: Called when user successfully signs in
     * Log authentication for audit trail
     */
    async signIn({ user }) {
      console.log(`✓ User session created: ${user.email} (Role: ${user.role})`)
    },

    /**
     * SignOut Event: Called when user signs out
     */
    async signOut() {
      console.log('User signed out')
    },

    /**
     * Error Event: Called when error occurs during authentication
     */
    async error({ error }) {
      console.error('Authentication error:', error)
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
}
