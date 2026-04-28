/**
 * Testing & Debugging Utilities for Authentication System
 * Use during development to test auth flows
 * 
 * REMOVE in production
 */

import { listAllUsers, getDatabaseStats, authenticateUser } from '@/lib/db/users'

/**
 * Test authentication with known credentials
 * Useful for verifying the auth flow works
 */
export async function testAuthentication() {
  console.log('\n=== Testing Authentication ===\n')

  const testCases = [
    { email: 'guardian@example.com', password: 'password123', expected: true },
    { email: 'tutor@example.com', password: 'password123', expected: true },
    { email: 'guardian@example.com', password: 'wrongpassword', expected: false },
    { email: 'nonexistent@example.com', password: 'password123', expected: false },
  ]

  for (const testCase of testCases) {
    try {
      const result = await authenticateUser(testCase.email, testCase.password)
      const success = !!result === testCase.expected
      const status = success ? '✓' : '✗'

      console.log(
        `${status} Auth test: ${testCase.email} (expected: ${testCase.expected}, got: ${!!result})`
      )

      if (result) {
        console.log(`   User: ${result.name}, Role: ${result.role}`)
      }
    } catch (error) {
      console.error(`✗ Auth test failed: ${testCase.email}`, error)
    }
  }

  console.log()
}

/**
 * Print current database state
 * Useful for debugging
 */
export async function printDatabaseState() {
  console.log('\n=== Database State ===\n')

  try {
    const stats = getDatabaseStats()
    console.log('Statistics:')
    console.log(`  Total Users: ${stats.totalUsers}`)
    console.log(`  Active Users: ${stats.activeUsers}`)
    console.log(`  Guardians: ${stats.guardians}`)
    console.log(`  Tutors: ${stats.tutors}`)
    console.log()

    const users = await listAllUsers()
    console.log('Users:')
    for (const user of users) {
      console.log(`  - ${user.email} (${user.name}) [${user.role}]`)
      console.log(`    ID: ${user.id}`)
      console.log(`    Active: ${user.isActive}`)
    }
  } catch (error) {
    console.error('Error printing database state:', error)
  }

  console.log()
}

/**
 * Print test credentials for quick reference
 */
export function printTestCredentials() {
  console.log('\n=== Test Credentials ===\n')
  console.log('Guardian Account:')
  console.log('  Email: guardian@example.com')
  console.log('  Password: password123')
  console.log()
  console.log('Tutor Account:')
  console.log('  Email: tutor@example.com')
  console.log('  Password: password123')
  console.log()
}

/**
 * Run all tests
 */
export async function runAllTests() {
  printTestCredentials()
  await printDatabaseState()
  await testAuthentication()
}
