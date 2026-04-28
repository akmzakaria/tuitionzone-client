# Authentication System Testing Guide

Complete guide for testing the NextAuth + Database authentication system locally.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- HTTP client (curl, Postman, Insomnia, or VS Code REST Client)

### Start Development Server

```bash
cd tuitionzone-client
npm run dev
```

The app runs at `http://localhost:3000`

## 🧪 Test Credentials

The system includes pre-seeded test users:

### Guardian Account
```
Email: guardian@example.com
Password: password123
Role: guardian
```

### Tutor Account
```
Email: tutor@example.com
Password: password123
Role: tutor
```

## 📋 Testing Endpoints

### 1. DEBUG: Check Auth System Status

**Endpoint:** `GET /api/debug/auth-status`

**Description:** Get overall system status, database statistics, and current session

```bash
curl http://localhost:3000/api/debug/auth-status
```

**Response:**
```json
{
  "debug": true,
  "message": "Authentication Debug Endpoint",
  "endpoints": [
    "GET /api/debug/auth-status?action=status - System status",
    "GET /api/debug/auth-status?action=credentials - Test credentials",
    "GET /api/debug/auth-status?action=users - List all users",
    "GET /api/debug/auth-status?action=session - Current session"
  ]
}
```

---

### 2. DEBUG: Get Test Credentials

**Endpoint:** `GET /api/debug/auth-status?action=credentials`

```bash
curl http://localhost:3000/api/debug/auth-status?action=credentials
```

**Response:**
```json
{
  "debug": true,
  "credentials": [
    {
      "email": "guardian@example.com",
      "password": "password123",
      "role": "guardian",
      "name": "Sarah Guardian"
    },
    {
      "email": "tutor@example.com",
      "password": "password123",
      "role": "tutor",
      "name": "John Tutor"
    }
  ]
}
```

---

### 3. DEBUG: List All Users

**Endpoint:** `GET /api/debug/auth-status?action=users`

```bash
curl http://localhost:3000/api/debug/auth-status?action=users
```

**Response:**
```json
{
  "debug": true,
  "stats": {
    "totalUsers": 2,
    "activeUsers": 2,
    "guardians": 1,
    "tutors": 1
  },
  "users": [
    {
      "id": "uuid...",
      "email": "guardian@example.com",
      "name": "Sarah Guardian",
      "role": "guardian"
    },
    {
      "id": "uuid...",
      "email": "tutor@example.com",
      "name": "John Tutor",
      "role": "tutor"
    }
  ]
}
```

---

### 4. DEBUG: Test Login

**Endpoint:** `POST /api/debug/auth-status`

**Description:** Test authentication without creating a session

```bash
curl -X POST http://localhost:3000/api/debug/auth-status \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tutor@example.com",
    "password": "password123"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "uuid...",
    "email": "tutor@example.com",
    "name": "John Tutor",
    "role": "tutor",
    "createdAt": "2026-04-26T10:00:00.000Z"
  }
}
```

**Response (Failed):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 5. Register New User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "SecurePassword123",
    "role": "guardian"
  }'
```

**Response (Success - 201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid...",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "guardian"
  }
}
```

**Response (Validation Error - 400 Bad Request):**
```json
{
  "error": "Password must be at least 6 characters long"
}
```

**Response (Duplicate Email - 409 Conflict):**
```json
{
  "error": "Email already in use. Please try a different email."
}
```

---

### 6. Sign In (Create Session)

**Endpoint:** `POST /api/auth/signin`

**Description:** Create authenticated session

**Using HTML Form:**
```html
<form action="/api/auth/signin" method="post">
  <input type="email" name="email" value="tutor@example.com" />
  <input type="password" name="password" value="password123" />
  <input type="hidden" name="csrfToken" value="..." />
  <button type="submit">Sign In</button>
</form>
```

**Using fetch (with credentials):**
```javascript
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  credentials: 'include', // Important: include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'tutor@example.com',
    password: 'password123'
  })
});
```

---

### 7. Get Current Session

**Endpoint:** `GET /api/auth/session`

**Description:** Get current authenticated user's session

```bash
curl -b "cookies.txt" http://localhost:3000/api/auth/session
```

**Response (Authenticated):**
```json
{
  "user": {
    "email": "tutor@example.com",
    "name": "John Tutor",
    "id": "uuid...",
    "role": "tutor"
  },
  "expires": "2026-04-27T10:00:00.000Z"
}
```

**Response (Not Authenticated):**
```json
null
```

---

### 8. Get User Profile (Protected)

**Endpoint:** `GET /api/user/profile`

**Description:** Get authenticated user's profile

```bash
# After signing in (session cookie will be included automatically)
curl -b "cookies.txt" http://localhost:3000/api/user/profile
```

**Response (Authenticated - 200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "uuid...",
    "email": "tutor@example.com",
    "name": "John Tutor",
    "role": "tutor"
  }
}
```

**Response (Not Authenticated - 401 Unauthorized):**
```json
{
  "error": "Unauthorized: Authentication required"
}
```

---

### 9. Update User Profile (Protected)

**Endpoint:** `POST /api/user/profile`

**Description:** Update authenticated user's profile

```bash
curl -X POST -b "cookies.txt" http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid...",
    "email": "tutor@example.com",
    "name": "John Updated",
    "role": "tutor"
  }
}
```

---

### 10. List Users (Protected - Role-Based)

**Endpoint:** `GET /api/admin/users`

**Description:** List all users (demo endpoint requiring authentication)

```bash
curl -b "cookies.txt" http://localhost:3000/api/admin/users
```

**Response (Authenticated):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 2,
    "activeUsers": 2,
    "guardians": 1,
    "tutors": 1
  },
  "users": [
    {
      "id": "uuid...",
      "email": "guardian@example.com",
      "name": "Sarah Guardian",
      "role": "guardian"
    },
    {
      "id": "uuid...",
      "email": "tutor@example.com",
      "name": "John Tutor",
      "role": "tutor"
    }
  ]
}
```

---

## 🔧 Testing Workflow

### Test 1: Registration Flow

1. Register new user:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "name": "Test User",
       "password": "TestPassword123",
       "role": "tutor"
     }'
   ```

2. Verify user was created:
   ```bash
   curl http://localhost:3000/api/debug/auth-status?action=users
   ```

3. Test login with new credentials:
   ```bash
   curl -X POST http://localhost:3000/api/debug/auth-status \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"TestPassword123"}'
   ```

### Test 2: Authentication Flow

1. Sign in:
   ```bash
   curl -c cookies.txt -X POST http://localhost:3000/api/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email":"tutor@example.com","password":"password123"}'
   ```

2. Check session:
   ```bash
   curl -b cookies.txt http://localhost:3000/api/auth/session
   ```

3. Access protected resource:
   ```bash
   curl -b cookies.txt http://localhost:3000/api/user/profile
   ```

4. Sign out:
   ```bash
   curl -c cookies.txt -X POST http://localhost:3000/api/auth/signout
   ```

5. Verify session cleared:
   ```bash
   curl -b cookies.txt http://localhost:3000/api/auth/session
   ```

### Test 3: Invalid Credentials

```bash
# Wrong password
curl -X POST http://localhost:3000/api/debug/auth-status \
  -H "Content-Type: application/json" \
  -d '{"email":"tutor@example.com","password":"wrongpassword"}'
# Expected: 401 Unauthorized
```

### Test 4: Password Validation

```bash
# Too short password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "name":"Test",
    "password":"short",
    "role":"guardian"
  }'
# Expected: 400 - "Password must be at least 6 characters long"
```

---

## 📊 Using Postman

### Create Collection

1. Open Postman
2. Create new collection: "TutionZone Auth"

### Add Requests

#### 1. Register

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "name": "Test User",
    "password": "SecurePass123",
    "role": "guardian"
  }
  ```

#### 2. Sign In

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/signin`
- **Body (Form):**
  - email: `tutor@example.com`
  - password: `password123`
- **Cookies:** Enable "Store cookies"

#### 3. Get Session

- **Method:** GET
- **URL:** `http://localhost:3000/api/auth/session`
- **Cookies:** Inherited from collection

#### 4. Get Profile

- **Method:** GET
- **URL:** `http://localhost:3000/api/user/profile`
- **Cookies:** Inherited from collection

---

## 🔍 Debugging Tips

### View Database State

```bash
curl http://localhost:3000/api/debug/auth-status?action=users
```

### View Current Session

```bash
curl http://localhost:3000/api/debug/auth-status?action=session
```

### Test Password Hashing

Check server logs to verify bcrypt operations:
```
✓ User authenticated: tutor@example.com
✓ User session created: tutor@example.com (Role: tutor)
```

### Check JWT Token

1. Sign in and copy the session cookie
2. Visit [jwt.io](https://jwt.io)
3. Paste the token to decode and verify claims

---

## 🚨 Common Issues

### "Not Authenticated" Response

**Problem:** Session not persisting between requests

**Solution:** 
- Include cookies in requests: `-b cookies.txt` (curl) or enable "Auto-use cookies" (Postman)
- Check `NEXTAUTH_SECRET` is set in `.env.local`
- Clear browser cookies and try again

### Invalid Password Error

**Problem:** Password doesn't meet requirements

**Solution:**
- Minimum 6 characters
- Maximum 128 characters
- No spaces at start/end

### Email Already Exists

**Problem:** Trying to register with existing email

**Solution:**
- Use different email address
- Delete test data and restart (for mock DB)

---

## 📝 Production Notes

### Before Going Live

1. **Remove Debug Endpoints**
   - Delete `/api/debug/` routes
   - Remove seed data from database initialization

2. **Disable Test Credentials**
   - Remove `initializeDatabase()` seed users
   - Implement proper user management

3. **Set Strong Secret**
   ```bash
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   ```

4. **Configure HTTPS**
   - Set `NEXTAUTH_URL` to HTTPS URL
   - Enable secure cookies

5. **Database Setup**
   - Use production database (MongoDB, PostgreSQL, MySQL)
   - Run migrations
   - Set up backups

---

## ✅ Verification Checklist

- [ ] Registration works with valid input
- [ ] Registration rejects weak passwords
- [ ] Registration prevents duplicate emails
- [ ] Login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Session persists across requests
- [ ] Protected endpoints return 401 when not authenticated
- [ ] User profile endpoint returns user data
- [ ] Sign out clears session
- [ ] Database debug endpoint shows correct stats
- [ ] Bcrypt password hashing works correctly
- [ ] Role is stored in JWT token
- [ ] Role-based access control works

---

## 📚 Next Steps

1. Build UI components for sign in/register
2. Add email verification
3. Implement password reset
4. Connect to production database
5. Set up monitoring and logging
