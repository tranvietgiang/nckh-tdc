# Testing Guide for Authentication System

## Test Cases

### 1. Normal Login Flow

- **Setup**: Valid student account
- **Steps**:
  1. Go to login page
  2. Enter valid username and password
  3. Select "Sinh viên" role
  4. Click login
- **Expected**: Redirect to student dashboard, token saved

### 2. Teacher Login

- **Setup**: Valid teacher account
- **Steps**:
  1. Go to login page
  2. Enter valid teacher username and password
  3. Select "Giảng viên" role
  4. Click login
- **Expected**: Redirect to teacher dashboard

### 3. Admin Login with Any Role

- **Setup**: Valid admin account
- **Steps**:
  1. Go to login page
  2. Enter admin username and password
  3. Select "Sinh viên" role (or any role)
  4. Click login
- **Expected**: Admin can still login regardless of selected role

### 4. Role Mismatch - Student Account as Teacher

- **Setup**: Valid student account
- **Steps**:
  1. Go to login page
  2. Enter student credentials
  3. Select "Giảng viên" role
  4. Click login
- **Expected**: Error message "Tài khoản này không phải giảng viên!" (HTTP 422)

### 5. Role Mismatch - Teacher Account as Student

- **Setup**: Valid teacher account
- **Steps**:
  1. Go to login page
  2. Enter teacher credentials
  3. Select "Sinh viên" role
  4. Click login
- **Expected**: Error message "Tài khoản này không phải sinh viên!" (HTTP 422)

### 6. Invalid Credentials

- **Setup**: Any account
- **Steps**:
  1. Go to login page
  2. Enter wrong password
  3. Click login
- **Expected**: Error message "Sai tài khoản hoặc mật khẩu!" (HTTP 401)

### 7. Account Lockout

- **Setup**: Any account
- **Steps**:
  1. Go to login page
  2. Enter wrong password 5 times
  3. Try to login again
- **Expected**: Error message about account lockout, 429 status code

### 8. Protected Route Access

- **Setup**: Authenticated user
- **Steps**:
  1. Login successfully
  2. Try to access protected route for user's role
- **Expected**: Access granted

### 9. Protected Route Denial

- **Setup**: Authenticated user with student role
- **Steps**:
  1. Login as student
  2. Try to access teacher-only route
- **Expected**: Redirect to login or show unauthorized message

### 10. Logout

- **Setup**: Authenticated user
- **Steps**:
  1. Login successfully
  2. Click logout
  3. Try to access protected resource
- **Expected**: Token cleared, redirected to login

## curl Commands for Testing

### Login (Success)

```bash
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student_id","password":"password","user_role":"student"}'
```

### Login (Role Mismatch)

```bash
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student_id","password":"password","user_role":"lecturer"}'
```

### Get Current User

```bash
curl -X GET http://localhost/api/me \
  -H "Authorization: Bearer <token>"
```

### Logout

```bash
curl -X POST http://localhost/api/logout \
  -H "Authorization: Bearer <token>"
```

## Database Checks

### Check User Roles

```sql
SELECT user_id, name, role, created_at FROM users LIMIT 10;
```

### Check Activity Logs

```sql
SELECT user_id, action, ip_address, created_at FROM activity_logs
ORDER BY created_at DESC LIMIT 20;
```

### Check Login Attempts

- Rate limiter uses Redis or database
- Key format: `login.lockout:{username}`
- Manual clear: Delete from rate limit storage

## Browser Console Tests

### Check Token Storage

```javascript
// Check localStorage
console.log(localStorage.getItem("auth_token"));
console.log(localStorage.getItem("auth_user"));

// Check localStorage after login
const user = JSON.parse(localStorage.getItem("auth_user"));
console.log(user.role); // should match your account type
```

### Monitor Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Perform login
4. Check `/login` request:
   - Status: 200 (success) or 401/422/429 (error)
   - Response: Contains token and user data (on success)
   - Headers: Authorization header in subsequent requests

## Common Issues and Solutions

### Issue: Token not persisting after refresh

- **Solution**: Check localStorage in browser
- **Verify**: AuthProvider useEffect is initializing user correctly

### Issue: 429 Too Many Requests keeps appearing

- **Solution**: Wait 15 minutes or clear Redis/rate limiter storage
- **Dev**: Use RateLimiter::clear("login.lockout:{username}") in tinker

### Issue: Admin can't login

- **Solution**: Verify admin record has role='admin' in database
- **Verify**: Query user table for admin records

### Issue: Routes return 401 even with valid token

- **Solution**: Verify token format in Authorization header
- **Verify**: Token starts with "Bearer " prefix

### Issue: CORS errors when calling API

- **Solution**: Check CORS configuration in config/cors.php
- **Verify**: Frontend URL is in allowed_origins
