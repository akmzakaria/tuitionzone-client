import bcrypt from 'bcrypt'

/**
 * Password hashing configuration
 * SALT_ROUNDS: Higher value = more secure but slower
 * Typical values: 10-12
 */
const SALT_ROUNDS = 10

/**
 * Hash a plain text password using bcrypt
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 *
 * @example
 * ```ts
 * const hashed = await hashPassword('myPassword123');
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long')
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (error) {
    console.error('Password hashing error:', error)
    throw new Error('Failed to hash password')
  }
}

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hash - Hashed password from database
 * @returns Promise<boolean> - True if passwords match
 *
 * @example
 * ```ts
 * const isValid = await comparePassword('myPassword123', hashedPassword);
 * if (isValid) {
 *   // Password is correct
 * }
 * ```
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('Password comparison error:', error)
    return false
  }
}

/**
 * Validate password strength
 * @param password - Plain text password to validate
 * @returns Object with validation status and message
 *
 * @example
 * ```ts
 * const validation = validatePassword('myPass');
 * if (!validation.isValid) {
 *   console.log(validation.message);
 * }
 * ```
 */
export function validatePassword(password: string): {
  isValid: boolean
  message: string
} {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }

  if (password.length > 128) {
    return { isValid: false, message: 'Password must not exceed 128 characters' }
  }

  // Optional: Add more strict validation
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasNumbers = /\d/.test(password);
  // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return { isValid: true, message: 'Password is valid' }
}
