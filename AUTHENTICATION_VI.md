# Tài Liệu Hệ Thống Xác Thực

## Tổng Quan

Hệ thống xác thực hoàn chỉnh với kiểm soát truy cập dựa trên vai trò, bảo vệ khóa tài khoản, và xử lý lỗi toàn diện.

## Quy Trình Đăng Nhập

### Frontend

1. Người dùng nhập tên đăng nhập, mật khẩu
2. Người dùng chọn vai trò (sinh viên/giảng viên/quản trị viên)
3. Biểu mẫu xác thực đầu vào ở phía client
4. Gửi POST `/login` với `{ username, password, user_role }`
5. Nhận phản hồi chứa dữ liệu người dùng và token
6. AuthProvider xác thực response.success trước khi lưu
7. Người dùng được chuyển hướng đến dashboard dựa trên vai trò thực tế

### Backend

1. LoginRequest xác thực tất cả các trường bao gồm user_role
2. AuthService kiểm tra trạng thái khóa tài khoản (RateLimiter)
3. Tìm kiếm người dùng theo tên đăng nhập
4. Xác thực mật khẩu (bcrypt)
5. Xác thực vai trò được chọn:
   - sinh viên: phải là 'student' hoặc 'admin'
   - giảng viên: phải là 'teacher' hoặc 'admin'
   - quản trị viên: phải là 'admin'
6. Tạo token với Sanctum
7. Ghi nhật ký hoạt động
8. Trả về thành công với người dùng + token

## Tính Năng Bảo Mật

### Khóa Tài Khoản

- Tối đa 5 lần đăng nhập sai
- Thời gian khóa: 15 phút
- Khóa key: `login.lockout:{username}`
- Tự động xóa khi đăng nhập thành công

### Xác Thực Vai Trò

- Frontend gửi "lecturer"
- Backend dự kiến "teacher" (ánh xạ nội bộ)
- Admin có thể bỏ qua xác thực vai trò
- Ngăn chặn truy cập tài khoản với vai trò sai

### Quản Lý Token

- Token Bearer thông qua Sanctum
- Phản hồi 401 xóa xác thực và chuyển hướng đến /login
- Token được đưa vào Authorization header

## Các Điểm Cuối API

### POST /login

```json
{
  "username": "string",
  "password": "string",
  "user_role": "student|lecturer|admin"
}
```

Phản hồi (Thành công):

```json
{
  "success": true,
  "user": {
    /* dữ liệu người dùng */
  },
  "token": "1|token_string..."
}
```

### GET /me

Tuyến đường được bảo vệ. Trả về người dùng đã xác thực hiện tại.

### POST /logout

Tuyến đường được bảo vệ. Đăng xuất và xóa token.

## Các Thành Phần Frontend

- **Login.jsx**: Trình bao Frontend
- **LoginUI.jsx**: Thành phần UI
- **useLoginLogic.js**: Luôn logic đăng nhập
- **validateLogin.js**: Xác thực đầu vào
- **AuthProvider.jsx**: Auth context và state
- **ProtectedRoute.jsx**: Bảo vệ tuyến đường
- **GuestRoute.jsx**: Hạn chế tuyến đường công cộng

## Kiến Trúc Backend

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

## Cấu Hình

- Giới hạn tỷ lệ: 5 yêu cầu mỗi phút cho /login
- Thời gian khóa: 15 phút
- CORS: Được bật cho các tuyến đường API
- Sanctum: Xác thực API dựa trên token
