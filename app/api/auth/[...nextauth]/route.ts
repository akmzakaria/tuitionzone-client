import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth'

/**
 * NextAuth Handler
 * Handles authentication requests at /api/auth/*
 * 
 * This route supports:
 * - GET/POST /api/auth/signin - Sign in page and form submission
 * - GET/POST /api/auth/signout - Sign out
 * - GET /api/auth/session - Get current session
 * - GET /api/auth/providers - List configured providers
 * - GET /api/auth/csrf - Get CSRF token
 * - POST /api/auth/callback/credentials - Credentials provider callback
 */
const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
