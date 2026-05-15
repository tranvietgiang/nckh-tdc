# Hướng Dẫn Kiểm Thử Hệ Thống Xác Thực

## Các Trường Hợp Kiểm Thử

### 1. Quy Trình Đăng Nhập Bình Thường

- **Chuẩn Bị**: Tài khoản sinh viên hợp lệ
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập tên đăng nhập và mật khẩu hợp lệ
  3. Chọn vai trò "Sinh viên"
  4. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Chuyển hướng đến dashboard sinh viên, token được lưu

### 2. Đăng Nhập Giảng Viên

- **Chuẩn Bị**: Tài khoản giảng viên hợp lệ
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập tên đăng nhập và mật khẩu giảng viên hợp lệ
  3. Chọn vai trò "Giảng viên"
  4. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Chuyển hướng đến dashboard giảng viên

### 3. Đăng Nhập Admin Với Bất Kỳ Vai Trò

- **Chuẩn Bị**: Tài khoản admin hợp lệ
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập tên đăng nhập và mật khẩu admin
  3. Chọn vai trò "Sinh viên" (hoặc bất kỳ vai trò nào)
  4. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Admin vẫn có thể đăng nhập bất kể vai trò được chọn

### 4. Vai Trò Không Phù Hợp - Tài Khoản Sinh Viên Dạo Được Đăng Nhập Là Giảng Viên

- **Chuẩn Bị**: Tài khoản sinh viên hợp lệ
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập thông tin xác thực sinh viên
  3. Chọn vai trò "Giảng viên"
  4. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Thông báo lỗi "Tài khoản này không phải giảng viên!" (HTTP 422)

### 5. Vai Trò Không Phù Hợp - Tài Khoản Giảng Viên Đăng Nhập Là Sinh Viên

- **Chuẩn Bị**: Tài khoản giảng viên hợp lệ
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập thông tin xác thực giảng viên
  3. Chọn vai trò "Sinh viên"
  4. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Thông báo lỗi "Tài khoản này không phải sinh viên!" (HTTP 422)

### 6. Thông Tin Xác Thực Không Hợp Lệ

- **Chuẩn Bị**: Bất kỳ tài khoản
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập mật khẩu sai
  3. Nhấp vào đăng nhập
- **Kết Quả Dự Kiến**: Thông báo lỗi "Sai tài khoản hoặc mật khẩu!" (HTTP 401)

### 7. Tài Khoản Bị Khóa

- **Chuẩn Bị**: Bất kỳ tài khoản
- **Các Bước**:
  1. Đi tới trang đăng nhập
  2. Nhập mật khẩu sai 5 lần
  3. Cố gắng đăng nhập lần thứ 6
- **Kết Quả Dự Kiến**: Thông báo lỗi về khóa tài khoản, mã trạng thái 429

### 8. Truy Cập Tuyến Đường Được Bảo Vệ

- **Chuẩn Bị**: Người dùng đã xác thực
- **Các Bước**:
  1. Đăng nhập thành công
  2. Cố gắng truy cập tuyến đường được bảo vệ cho vai trò của người dùng
- **Kết Quả Dự Kiến**: Truy cập được cấp

### 9. Từ Chối Truy Cập Tuyến Đường Được Bảo Vệ

- **Chuẩn Bị**: Người dùng xác thực với vai trò sinh viên
- **Các Bước**:
  1. Đăng nhập dưới dạng sinh viên
  2. Cố gắng truy cập tuyến đường chỉ dành cho giảng viên
- **Kết Quả Dự Kiến**: Từ chối quyền truy cập hoặc chuyển hướng đến đăng nhập

### 10. Đăng Xuất

- **Chuẩn Bị**: Người dùng đã xác thực
- **Các Bước**:
  1. Đăng nhập thành công
  2. Nhấp vào đăng xuất
  3. Cố gắng truy cập tài nguyên được bảo vệ
- **Kết Quả Dự Kiến**: Token bị xóa, chuyển hướng đến /login

## Lệnh curl Để Kiểm Thử

### Đăng Nhập (Thành Công)

```bash
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student_id","password":"password","user_role":"student"}'
```

### Đăng Nhập (Vai Trò Không Phù Hợp)

```bash
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student_id","password":"password","user_role":"lecturer"}'
```

### Lấy Người Dùng Hiện Tại

```bash
curl -X GET http://localhost/api/me \
  -H "Authorization: Bearer <token>"
```

### Đăng Xuất

```bash
curl -X POST http://localhost/api/logout \
  -H "Authorization: Bearer <token>"
```

## Kiểm Tra Cơ Sở Dữ Liệu

### Kiểm Tra Vai Trò Người Dùng

```sql
SELECT user_id, name, role, created_at FROM users LIMIT 10;
```

### Kiểm Tra Nhật Ký Hoạt Động

```sql
SELECT user_id, action, ip_address, created_at FROM activity_logs
ORDER BY created_at DESC LIMIT 20;
```

### Kiểm Tra Lần Đăng Nhập

- Rate limiter sử dụng Redis hoặc cơ sở dữ liệu
- Định dạng key: `login.lockout:{username}`
- Xóa thủ công: Xóa từ bộ nhớ giới hạn tỷ lệ

## Kiểm Thử Bảng Điều Khiển Trình Duyệt

### Kiểm Tra Lưu Trữ Token

```javascript
// Kiểm tra localStorage
console.log(localStorage.getItem("auth_token"));
console.log(localStorage.getItem("auth_user"));

// Kiểm tra localStorage sau khi đăng nhập
const user = JSON.parse(localStorage.getItem("auth_user"));
console.log(user.role); // nên khớp với loại tài khoản của bạn
```

### Giám Sát Yêu Cầu Mạng

1. Mở DevTools (F12)
2. Đi tới tab Network
3. Thực hiện đăng nhập
4. Kiểm tra yêu cầu `/login`:
   - Trạng thái: 200 (thành công) hoặc 401/422/429 (lỗi)
   - Phản hồi: Chứa token và dữ liệu người dùng (khi thành công)
   - Headers: Authorization header trong các yêu cầu tiếp theo

## Các Vấn Đề Thường Gặp và Giải Pháp

### Vấn Đề: Token không được duy trì sau khi làm mới

- **Giải Pháp**: Kiểm tra localStorage trong trình duyệt
- **Xác Thực**: AuthProvider useEffect đang khởi tạo người dùng đúng cách

### Vấn Đề: 429 Quá Nhiều Yêu Cầu tiếp tục xuất hiện

- **Giải Pháp**: Chờ 15 phút hoặc xóa bộ nhớ Redis/rate limiter
- **Dev**: Sử dụng RateLimiter::clear("login.lockout:{username}") trong tinker

### Vấn Đề: Admin không thể đăng nhập

- **Giải Pháp**: Xác minh bản ghi admin có role='admin' trong cơ sở dữ liệu
- **Xác Thực**: Truy vấn bảng người dùng để tìm bản ghi admin

### Vấn Đề: Các tuyến đường trả về 401 ngay cả với token hợp lệ

- **Giải Pháp**: Xác minh định dạng token trong Authorization header
- **Xác Thực**: Token bắt đầu với tiền tố "Bearer "

### Vấn Đề: Lỗi CORS khi gọi API

- **Giải Pháp**: Kiểm tra cấu hình CORS trong config/cors.php
- **Xác Thực**: URL frontend nằm trong allowed_origins
