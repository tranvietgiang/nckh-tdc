# Authentication System Documentation

## Overview

Complete authentication system with role-based access control, account lockout protection, and comprehensive error handling.

## Login Flow

### Frontend

1. User enters username, password
2. User selects role (student/lecturer/admin)
3. Form validates input locally
4. Sends POST `/login` with `{ username, password, user_role }`
5. Receives response with user data and token
6. AuthProvider validates response.success before storing
7. User redirected to dashboard based on actual role

### Backend

1. LoginRequest validates all fields including user_role
2. AuthService checks account lockout status (RateLimiter)
3. User lookup by username
4. Password verification (bcrypt)
5. Selected role validation:
   - student: must be 'student' or 'admin'
   - lecturer: must be 'teacher' or 'admin'
   - admin: must be 'admin'
6. Token creation with Sanctum
7. Activity logging
8. Return success with user + token

## Security Features

### Account Lockout

- Maximum 5 failed login attempts
- Lockout duration: 15 minutes
- Lockout key: `login.lockout:{username}`
- Automatic clear on successful login

### Role Validation

- Frontend sends "lecturer"
- Backend expects "teacher" (maps internally)
- Admin can bypass role validation
- Prevents account access with wrong role

### Token Management

- Bearer token via Sanctum
- 401 response clears auth and redirects to /login
- Token included in Authorization header

### Activity Logging

- Logs all login attempts
- Logs logout actions
- Records IP address
- Tracks user_id and timestamp

## Error Codes

| Status | Meaning           | Action                         |
| ------ | ----------------- | ------------------------------ |
| 200    | Success           | Proceed                        |
| 401    | Unauthorized      | Clear token, redirect to login |
| 422    | Role mismatch     | Show role error message        |
| 429    | Too many attempts | Show lockout message           |

## API Endpoints

### POST /login

```json
{
  "username": "string",
  "password": "string",
  "user_role": "student|lecturer|admin"
}
```

Response (Success):

```json
{
  "success": true,
  "user": {
    /* user data */
  },
  "token": "1|token_string..."
}
```

### GET /me

Protected route. Returns current authenticated user.

### POST /logout

Protected route. Logs out and clears token.

## Frontend Components

- **Login.jsx**: Page wrapper
- **LoginUI.jsx**: UI component
- **useLoginLogic.js**: Login business logic
- **validateLogin.js**: Input validation
- **AuthProvider.jsx**: Auth context and state
- **ProtectedRoute.jsx**: Route protection
- **GuestRoute.jsx**: Public route restriction

## Backend Architecture

```
app/
  ├── Http/
  │   ├── Controllers/Api/AuthController.php
  │   ├── Requests/LoginRequest.php
  │   ├── Middleware/CheckRole.php
  │   └── Resources/UserResource.php
  ├── Services/AuthService.php
  ├── Models/User.php
  └── Traits/ApiResponse.php
```

## Configuration

- Rate limiting: 5 requests per minute for /login
- Lockout duration: 15 minutes
- CORS: Enabled for API routes
- Sanctum: Token-based API authentication
