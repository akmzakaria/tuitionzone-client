# NextAuth + Database Authentication Setup

Complete authentication system with bcrypt password hashing, role-based access control, and modular database layer.

## 📁 Project Structure

```
lib/
├── auth.ts                  ← NextAuth configuration with JWT callbacks
├── auth.types.ts            ← TypeScript type definitions
├── auth.server.ts           ← Server-side utilities (getSession, requireAuth, etc.)
├── password.ts              ← Password hashing & validation with bcrypt
└── db/
    ├── models.ts            ← User model types and enums
    └── users.ts             ← User database operations (mock/real)

app/
└── api/
    ├── auth/
    │   ├── [...nextauth]/
    │   │   └── route.ts     ← NextAuth API handler
    │   └── register/
    │       └── route.ts     ← User registration endpoint
    ├── user/
    │   └── profile/
    │       └── route.ts     ← Protected user profile endpoint
    └── admin/
        └── users/
            └── route.ts     ← Admin users list (role-based access)

.env.local                  ← Environment variables (template)
```

## 🔐 Authentication Flow

### 1. User Registration
```
POST /api/auth/register
Body: { email, name, password, role }
↓
Validates input & password strength
↓
Hashes password with bcrypt (10 salt rounds)
↓
Creates user in database
↓
Returns user data (201 Created)
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "name": "John Tutor",
    "password": "SecurePassword123",
    "role": "tutor"
  }'
```

### 2. User Login
```
POST /api/auth/signin
Body: { email, password }
↓
Credentials Provider authorize callback
↓
Retrieves user from database
↓
Compares password with bcrypt.compare()
↓
Creates JWT token with user data + role
↓
Sets HTTP-only cookie with session
↓
Returns session data
```

### 3. Access Protected Resources
```
GET /api/user/profile
Headers: [Cookie: session token]
↓
NextAuth reads JWT from cookie
↓
Verifies JWT signature with secret
↓
Extracts user data + role from token
↓
Returns protected resource
```

## 🗄️ Database Layer

### Mock Database (Current)

Located in `lib/db/users.ts`:
- In-memory `Map<string, User>` storage
- Persistent during development session
- Seed data auto-initialized on startup

**Test Users:**
```
Email: guardian@example.com
Password: password123
Role: guardian

Email: tutor@example.com
Password: password123
Role: tutor
```

### User Model

```typescript
interface User {
  id: string
  email: string
  name: string
  password: string        // Hashed with bcrypt
  role: 'guardian' | 'tutor'
  createdAt: Date
  updatedAt: Date
  isActive?: boolean
}
```

## 🔑 Key Features

### 1. Bcrypt Password Hashing

**File:** `lib/password.ts`

```typescript
// Hash password (runs at registration)
const hash = await hashPassword('myPassword123');

// Compare password (runs at login)
const isValid = await comparePassword('myPassword123', hash);

// Validate password strength
const validation = validatePassword('password123');
// { isValid: true, message: 'Password is valid' }
```

**Configuration:**
- Salt rounds: 10 (balance between security & speed)
- Min length: 6 characters
- Max length: 128 characters

### 2. Role-Based Access Control (RBAC)

**Supported Roles:**
- `guardian` - Students' parents/guardians
- `tutor` - Teachers/instructors

**Role Storage:**
- Stored in database
- Included in JWT token
- Available in session object
- Used for access control middleware

**Example - Check User Role:**
```typescript
// In Server Component or API Route
import { hasRole, requireRole } from '@/lib/auth.server';

// Check if user has role (returns boolean)
if (await hasRole('tutor')) {
  // Show tutor dashboard
}

// Require specific role (throws if not authorized)
const user = await requireRole('guardian');
// Now guaranteed user is a guardian
```

### 3. Server-Side Auth Utilities

**File:** `lib/auth.server.ts`

```typescript
// Get current session
const session = await getSession();
if (!session?.user) redirect('/login');

// Get current user (includes id & role)
const user = await getCurrentUser();
console.log(user.role); // 'tutor' | 'guardian'

// Check authentication
const isAuth = await isAuthenticated();

// Check role (single or multiple)
const isTutor = await hasRole('tutor');
const isTeacher = await hasRole(['tutor', 'admin']);

// Require authentication (throws error if not auth)
const user = await requireAuth();

// Require specific role (throws error if wrong role)
const user = await requireRole('tutor');

// Get user ID
const userId = await getUserId();

// Get user role
const role = await getUserRole();
```

### 4. JWT Configuration

**Token Claims:**
```typescript
{
  id: 'user-uuid',
  email: 'user@example.com',
  name: 'John Tutor',
  role: 'tutor',
  iat: timestamp,
  exp: timestamp + 24 hours
}
```

**Session Strategy:** JWT (JSON Web Token)
- Max Age: 24 hours
- Update Age: 1 hour (token refreshes if stale)
- Stored in HTTP-only cookie (secure against XSS)

## 📋 API Endpoints

### Public Endpoints

#### Register User
```
POST /api/auth/register

Body:
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "SecurePassword123",
  "role": "guardian" | "tutor"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "user": { id, email, name, role }
}

Errors:
- 400: Validation error (invalid email, weak password, etc.)
- 409: Email already exists
```

#### NextAuth Sign In
```
POST /api/auth/signin

Body: { email, password }

Response: Session established in HTTP-only cookie
```

#### NextAuth Sign Out
```
POST /api/auth/signout

Response: Session cleared
```

### Protected Endpoints (Require Authentication)

#### Get User Profile
```
GET /api/user/profile

Response: 200 OK
{
  "success": true,
  "user": { id, email, name, role }
}

Errors:
- 401: Unauthorized (not logged in)
```

#### Update User Profile
```
POST /api/user/profile

Body: { name?: string, ... }

Response: 200 OK
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { id, email, name, role }
}

Errors:
- 401: Unauthorized
- 400: Invalid input
```

### Admin Endpoints (Role-Based)

#### List Users
```
GET /api/admin/users

Response: 200 OK
{
  "success": true,
  "stats": {
    "totalUsers": 10,
    "activeUsers": 9,
    "guardians": 6,
    "tutors": 4
  },
  "users": [{ id, email, name, role, ... }]
}

Errors:
- 401: Unauthorized
- 403: Forbidden (insufficient role)
```

## 🚀 Usage Examples

### In Server Components

```tsx
// app/dashboard/page.tsx
import { requireAuth, hasRole } from '@/lib/auth.server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Require authentication
  const user = await requireAuth();
  
  // Show role-specific content
  if (user.role === 'tutor') {
    return <TutorDashboard user={user} />;
  } else {
    return <GuardianDashboard user={user} />;
  }
}
```

### In API Routes

```typescript
// app/api/tutor/schedule/route.ts
import { requireRole } from '@/lib/auth.server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Require tutor role
    const user = await requireRole('tutor');
    
    const body = await request.json();
    
    // Create schedule for authenticated tutor
    return NextResponse.json({
      success: true,
      userId: user.id,
      schedule: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: error instanceof Error && 
               error.message.includes('Unauthorized') ? 401 : 403 }
    );
  }
}
```

### In Server Actions

```typescript
// app/actions/auth.ts
'use server';

import { getCurrentUser, requireAuth } from '@/lib/auth.server';

export async function updateProfile(formData: FormData) {
  const user = await requireAuth();
  
  const name = formData.get('name') as string;
  
  // Update user profile
  return {
    success: true,
    userId: user.id,
    name: name
  };
}
```

## 🔄 Migrating to Real Database

The database layer is modular and designed for easy migration.

### Step 1: Install Database Driver

```bash
# MongoDB
npm install mongodb

# PostgreSQL
npm install pg

# MySQL
npm install mysql2

# Prisma ORM (recommended)
npm install @prisma/client
npm install -D prisma
```

### Step 2: Create Database Module

Replace `lib/db/users.ts` with your database implementation:

```typescript
// lib/db/users.ts (updated for MongoDB/PostgreSQL/etc)

import { User, CreateUserInput, UserResponse } from './models'
import { hashPassword, comparePassword } from '@/lib/password'

export async function findUserByEmail(email: string): Promise<User | null> {
  // Replace with your database query
  const user = await db.users.findOne({ email: email.toLowerCase() })
  return user || null
}

export async function createUser(input: CreateUserInput): Promise<UserResponse> {
  const hashedPassword = await hashPassword(input.password)
  
  const user = await db.users.create({
    email: input.email.toLowerCase(),
    name: input.name,
    password: hashedPassword,
    role: input.role,
    createdAt: new Date(),
  })
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

// ... implement other functions similarly
```

### Step 3: Update Environment Variables

```env
# Replace with your database connection string
DATABASE_URL=postgresql://user:password@localhost:5432/tuitionzone
```

### Step 4: Run Database Migrations

```bash
# If using Prisma
npx prisma migrate dev

# Or run your migration tool
npm run migrate
```

## 🛡️ Security Considerations

### ✅ Implemented

- [x] Bcrypt password hashing (10 salt rounds)
- [x] Password validation (min 6 characters)
- [x] HTTP-only session cookies (XSS protection)
- [x] CSRF protection (NextAuth automatic)
- [x] Secure JWT token validation
- [x] SQL injection prevention (parameterized queries)
- [x] Role-based access control

### 🔒 Production Checklist

- [ ] Generate strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Use HTTPS only in production
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Use strong password policy (uppercase, numbers, special chars)
- [ ] Implement rate limiting on login/register endpoints
- [ ] Add email verification flow
- [ ] Implement password reset functionality
- [ ] Add audit logging for admin actions
- [ ] Use environment-specific configurations
- [ ] Regular security audits and penetration testing

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET not set"
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=<generated-value>
```

### "User not found" on login
- Check that seed data was initialized
- Verify email format is correct
- Test with: guardian@example.com / password123

### "Password comparison failed"
- Ensure password is being compared correctly
- Check bcrypt is installed: `npm ls bcrypt`
- Verify hashed password is stored correctly

### Session not persisting
- Clear cookies: `DevTools → Application → Cookies → Delete all`
- Verify `NEXTAUTH_URL` matches your app URL
- Check JWT token is valid: `jwt.io`

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [JWT RFC 7519](https://tools.ietf.org/html/rfc7519)
- [OWASP Password Hashing Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

## 📝 Next Steps

1. ✅ Backend authentication setup complete
2. ⏭️ Create sign-in/register UI components
3. ⏭️ Add email verification
4. ⏭️ Implement password reset flow
5. ⏭️ Connect to real database
6. ⏭️ Add audit logging
7. ⏭️ Deploy to production
