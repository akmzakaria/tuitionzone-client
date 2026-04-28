# NextAuth + Database Authentication - Quick Reference

## 📁 Complete Folder Structure

```
tuitionzone-client/
├── .env.local                           ← Environment variables
├── package.json                         ← Dependencies (bcrypt, next-auth added)
│
├── lib/
│   ├── auth.ts                          ← NextAuth config with JWT callbacks
│   ├── auth.types.ts                    ← TypeScript type extensions
│   ├── auth.server.ts                   ← Server-side utilities
│   ├── auth.testing.ts                  ← Testing utilities (dev only)
│   ├── password.ts                      ← Bcrypt password utilities
│   └── db/
│       ├── models.ts                    ← User model types & enums
│       └── users.ts                     ← User database operations
│
├── app/
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/
│       │   │   └── route.ts             ← NextAuth API handler
│       │   └── register/
│       │       └── route.ts             ← Registration endpoint
│       ├── user/
│       │   └── profile/
│       │       └── route.ts             ← Protected profile endpoint
│       ├── admin/
│       │   └── users/
│       │       └── route.ts             ← Admin users endpoint
│       └── debug/
│           └── auth-status/
│               └── route.ts             ← Debug endpoint (remove in production)
│
├── AUTH_SETUP.md                        ← Initial setup guide
├── DATABASE_AUTH_SETUP.md               ← Database & bcrypt guide
└── TESTING_GUIDE.md                     ← Complete testing guide
```

## 🔧 Configuration Files

### `.env.local` - Environment Variables
```env
# REQUIRED
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Generate Secret:**
```bash
openssl rand -base64 32
```

## 📚 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `lib/auth.ts` | NextAuth configuration with Credentials Provider |
| `lib/password.ts` | Bcrypt password hashing & validation |
| `lib/db/models.ts` | User types and role enums |
| `lib/db/users.ts` | Database operations (mock/real) |
| `lib/auth.server.ts` | Server-side utilities (getSession, requireAuth, etc.) |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth API handler |
| `app/api/auth/register/route.ts` | User registration |
| `app/api/user/profile/route.ts` | Protected user profile |
| `app/api/admin/users/route.ts` | Admin users list |
| `app/api/debug/auth-status/route.ts` | Debug endpoint |

## 🔐 Test Credentials (Seed Data)

```
Guardian:
  Email: guardian@example.com
  Password: password123
  Role: guardian

Tutor:
  Email: tutor@example.com
  Password: password123
  Role: tutor
```

## 🚀 Quick Start Commands

```bash
# Start dev server
npm run dev

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@example.com",
    "name":"New User",
    "password":"SecurePass123",
    "role":"guardian"
  }'

# Check database status
curl http://localhost:3000/api/debug/auth-status?action=users

# Test login
curl -X POST http://localhost:3000/api/debug/auth-status \
  -H "Content-Type: application/json" \
  -d '{"email":"tutor@example.com","password":"password123"}'
```

## 📋 API Endpoints

### Public Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Create new user |
| `/api/auth/signin` | POST | Sign in (create session) |
| `/api/auth/signout` | POST | Sign out |
| `/api/auth/session` | GET | Get current session |

### Protected Endpoints
| Endpoint | Method | Purpose | Requires |
|----------|--------|---------|----------|
| `/api/user/profile` | GET | Get user profile | Auth |
| `/api/user/profile` | POST | Update profile | Auth |
| `/api/admin/users` | GET | List users | Auth |

### Debug Endpoints (Remove in Production)
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/debug/auth-status` | GET | System status & help |
| `/api/debug/auth-status?action=status` | GET | Auth system status |
| `/api/debug/auth-status?action=credentials` | GET | Test credentials |
| `/api/debug/auth-status?action=users` | GET | List all users |
| `/api/debug/auth-status?action=session` | GET | Current session |
| `/api/debug/auth-status` | POST | Test login |

## 🛠️ Server-Side Utilities

### Authentication Checks
```typescript
import { 
  getSession,           // Get current session (or null)
  getCurrentUser,       // Get user data (or undefined)
  isAuthenticated,      // Check if authenticated (boolean)
  getUserId,           // Get user ID (or null)
  getUserRole,         // Get user role (or null)
} from '@/lib/auth.server'
```

### Protected Access
```typescript
import { 
  requireAuth,         // Throw if not authenticated
  requireRole,         // Throw if wrong role
  hasRole,            // Check role (boolean)
} from '@/lib/auth.server'

// Example
const user = await requireRole('tutor');  // Throws if not tutor
const canAccess = await hasRole(['admin', 'tutor']);
```

## 💾 Database Operations

```typescript
import { 
  findUserByEmail,       // Get user by email
  findUserById,         // Get user by ID
  authenticateUser,     // Login with email/password
  createUser,           // Create new user
  listAllUsers,         // Get all users
  getDatabaseStats,     // Get stats (total, guardians, tutors)
} from '@/lib/db/users'
```

## 🔐 Password Security

```typescript
import {
  hashPassword,        // Hash password for storage
  comparePassword,     // Compare input with hash
  validatePassword,    // Check password strength
} from '@/lib/password'

// Configuration
const SALT_ROUNDS = 10;  // Bcrypt cost factor
// Min: 6 chars, Max: 128 chars
```

## 🔄 Authentication Flow

```
User Registration
  → Email validation
  → Password validation (min 6 chars)
  → Email uniqueness check
  → Password hashed with bcrypt
  → User created in database
  → Return user data (201 Created)

User Login
  → User enters email & password
  → Database lookup by email
  → Password compared with bcrypt.compare()
  → JWT token created with user data + role
  → Session cookie set (HTTP-only)
  → User authenticated

Access Protected Resource
  → User sends request with session cookie
  → NextAuth verifies JWT signature
  → User data extracted from token (includes role)
  → Access granted/denied based on role
  → Response sent
```

## 👥 User Roles

```typescript
enum UserRole {
  GUARDIAN = 'guardian',  // Students' parents/guardians
  TUTOR = 'tutor',       // Teachers/instructors
}
```

## 🔑 JWT Token Claims

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "tutor",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## 🧪 Testing Workflow

1. **Start dev server:** `npm run dev`
2. **Check status:** `curl http://localhost:3000/api/debug/auth-status?action=users`
3. **Register new user:** See TESTING_GUIDE.md
4. **Sign in:** Use test credentials
5. **Access protected endpoints:** Use session cookie

## 📖 Documentation Files

| File | Contents |
|------|----------|
| `AUTH_SETUP.md` | Initial NextAuth setup |
| `DATABASE_AUTH_SETUP.md` | Database, bcrypt, roles, migration guide |
| `TESTING_GUIDE.md` | Complete testing guide with curl examples |

## 🚨 Important Notes

### Development
- ✅ Seed data auto-initializes on startup
- ✅ Debug endpoints available for testing
- ✅ In-memory mock database persists for session
- ✅ Bcrypt configured with 10 salt rounds (reasonable for dev)

### Production Checklist
- ❌ Remove `/api/debug/` endpoints
- ❌ Remove seed data initialization
- ❌ Generate strong `NEXTAUTH_SECRET`
- ❌ Use HTTPS only
- ❌ Connect to real database
- ❌ Implement email verification
- ❌ Enable password reset flow
- ❌ Set up monitoring & logging
- ❌ Configure CORS properly

## 🔄 Database Migration

The database layer is modular. To switch from mock to real database:

1. **Install driver:** `npm install mongodb` (or postgresql, mysql, etc.)
2. **Update `lib/db/users.ts`:** Replace mock implementation with real queries
3. **Set `DATABASE_URL`:** Update `.env.local`
4. **Remove `initializeDatabase()`:** Delete seed data

See `DATABASE_AUTH_SETUP.md` for detailed migration guide.

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET not set"
```bash
openssl rand -base64 32  # Generate
# Add to .env.local
```

### Session not persisting
- Check cookies are enabled
- Verify `NEXTAUTH_URL` matches app URL
- Clear browser cache & cookies

### Protected endpoint returns 401
- Sign in first (create session)
- Include cookies with request
- Check token expiration

See `TESTING_GUIDE.md` for more debugging tips.

## ✅ Next Steps

1. ✅ Backend authentication complete
2. ⏭️ Build UI (sign-in, register, logout)
3. ⏭️ Add email verification
4. ⏭️ Implement password reset
5. ⏭️ Connect real database
6. ⏭️ Deploy to production

## 📞 Quick Help

**Need to...** | **How to...**
---|---
Get current user | `const user = await getCurrentUser();`
Protect a page | `const user = await requireAuth();`
Check role | `if (await hasRole('tutor')) { ... }`
Hash password | `const hash = await hashPassword(password);`
Find user | `const user = await findUserByEmail(email);`
Create user | `const user = await createUser({ email, name, password, role });`
Test login | `curl http://localhost:3000/api/debug/auth-status` (POST with credentials)

---

**Setup Complete!** 🎉

All backend authentication infrastructure is ready. Proceed to build UI components when ready.
