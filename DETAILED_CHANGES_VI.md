# Các Thay Đổi Chi Tiết Từng File

## File Backend

### app/Http/Controllers/Api/AuthController.php

**Thay Đổi:**

- Cách tiêm phụ thuộc thay đổi từ thuộc tính thành tham số
- `login()`: Không thay đổi điểm cuối đăng nhập (xác thực được chuyển đến dịch vụ)
- `logout()`: Thêm ghi nhật ký hoạt động, cải tiến định dạng phản hồi
- `me()`: Triển khai điểm cuối để trả về người dùng đã xác thực

**Dòng Chính:**

```php
public function __construct(protected AuthService $authService) {}
public function me(Request $request)
{
    return response()->json([
        'success' => true,
        'user' => $request->user(),
    ]);
}
```

### app/Http/Requests/LoginRequest.php

**Thay Đổi:**

- Thêm xác thực cho trường user_role

**Dòng Chính:**

```php
'user_role' => 'required|string|in:student,lecturer,teacher,admin',
```

### app/Services/AuthService.php

**Thay Đổi:**

- Thêm cơ chế khóa tài khoản (5 lần thử, khóa 15 phút)
- Xác thực vai trò có bypass admin
- Ghi nhật ký hoạt động khi thành công
- Xóa bộ đếm khóa khi đăng nhập thành công
- Tăng bộ đếm khóa khi thử sai

**Tính Năng Chính:**

- `private const MAX_LOGIN_ATTEMPTS = 5;`
- `private const LOCKOUT_MINUTES = 15;`
- RateLimiter để bảo vệ tài khoản
- Xử lý ánh xạ 'lecturer' vs 'teacher'

### bootstrap/app.php

**Thay Đổi:**

- Thêm nhập CheckRole middleware
- Đăng ký alias middleware trong lệnh gọi withMiddleware

**Dòng Chính:**

```php
use App\Http\Middleware\CheckRole;
$middleware->alias([
    'role' => CheckRole::class,
]);
```

### routes/api.php

**Thay Đổi:**

- Thêm auth:sanctum vào điểm cuối /me
- Thêm middleware role:teacher,admin cho tuyến đường giảng viên

**Dòng Chính:**

```php
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::middleware(['auth:sanctum', 'role:teacher,admin'])->prefix('teacher')->group(...);
```

### app/Http/Middleware/CheckRole.php (MỚI)

**Mục Đích:** Thực thi xác thực dựa trên vai trò
**Xử Lý:**

- Xác thực người dùng có vai trò bắt buộc
- Trả về 403 Forbidden nếu không được phép
- Chấp nhận nhiều vai trò dưới dạng tham số

### app/Traits/ApiResponse.php (MỚI)

**Mục Đích:** Chuẩn hóa phản hồi API
**Phương Thức:**

- `successResponse()`: Định dạng thành công tiêu chuẩn
- `errorResponse()`: Định dạng lỗi tiêu chuẩn
- `paginatedResponse()`: Cho các kết quả được phân trang

### app/Http/Resources/UserResource.php (MỚI)

**Mục Đích:** Chuẩn hóa dữ liệu người dùng trong phản hồi
**Loại Trừ:** password, remember_token
**Bao Gồm:** user_id, name, email, role, major_id, avatar, timestamps

---

## File Frontend

### src/pages/auth/useLoginLogic.js

**Thay Đổi:**

- Gửi user_role với yêu cầu đăng nhập
- Loại bỏ xác thực va chạm vai trò phía máy khách (được chuyển đến backend)
- Cải tiến xử lý lỗi với phân loại mã trạng thái
- Thông báo lỗi tốt hơn với thời lượng hiển thị thích hợp

**Xử Lý Lỗi:**

```javascript
// 429: Khóa tài khoản
// 422: Va chạm vai trò
// 401: Thông tin xác thực sai
// Khác: Lỗi chung
```

### src/contexts/AuthProvider.jsx

**Thay Đổi:**

- Cập nhật login() để kiểm tra res.success trước khi lưu token
- Ném lỗi cải tiến với thông báo máy chủ

**Dòng Chính:**

```javascript
if (!res?.success || !res?.token || !res?.user) {
  throw new Error(res?.message || "Sai tài khoản hoặc mật khẩu!");
}
```

### src/api/axiosClient.js

**Thay Đổi:**

- Cải tiến đánh chặn phản hồi
- Thêm xử lý cho 403 (Forbidden)
- Thêm xử lý cho 429 (Too Many Requests)
- Cải tiến ghi nhật ký lỗi

---

## File Cấu Hình (Không Có Thay Đổi)

### backend-laravel/config/cors.php

- Không có thay đổi (đã được cấu hình cho API)

### backend-laravel/config/sanctum.php

- Không có thay đổi (đã được cấu hình đúng cách)

### backend-laravel/config/database.php

- Không có thay đổi

---

## File Tài Liệu Mới

### AUTHENTICATION_VI.md

- Tài liệu hoàn chỉnh hệ thống xác thực
- Thông số kỹ thuật điểm cuối API
- Tổng quan tính năng bảo mật
- Biểu đồ kiến trúc

### TESTING_AUTH_VI.md

- 10 trường hợp kiểm thử toàn diện
- Lệnh curl cho kiểm thử API
- Truy vấn cơ sở dữ liệu để xác minh
- Kiểm thử bảng điều khiển trình duyệt
- Hướng dẫn khắc phục sự cố

### AUTH_CHANGES_SUMMARY_VI.md

- Tổng quan mức cao các thay đổi
- Mô tả vấn đề và giải pháp
- Biểu đồ quy trình dòng dữ liệu
- Gợi ý cải tiến trong tương lai

---

## Yêu Cầu Di Chuyển

**Không yêu cầu di chuyển cơ sở dữ liệu.**

Hệ thống sử dụng các bảng hiện có:

- Bảng `users` (cấu trúc hiện có)
- Bảng `activity_logs` (để ghi nhật ký)
- Bộ lưu trữ RateLimiter (Redis hoặc cơ sở dữ liệu, Laravel xử lý)

---

## Danh Sách Kiểm Tra Triển Khai

- [ ] Triển khai các thay đổi backend
- [ ] Chạy `php artisan config:cache` (nếu sử dụng caching config)
- [ ] Triển khai các thay đổi frontend
- [ ] Kiểm thử đăng nhập với va chạm vai trò
- [ ] Kiểm thử khóa tài khoản sau 5 lần thử
- [ ] Xác minh nhật ký hoạt động được tạo
- [ ] Kiểm tra quản lý token hoạt động đúng cách
- [ ] Xác minh bảo vệ tuyến đường hoạt động

---

## Kế Hoạch Khôi Phục

Nếu xảy ra vấn đề:

1. **Hoàn Nguyên AuthService.php**: Loại bỏ luôn khóa, giữ xác thực vai trò
2. **Hoàn Nguyên AuthController.php**: Loại bỏ ghi nhật ký từ logout
3. **Hoàn Nguyên LoginRequest.php**: Loại bỏ xác thực user_role
4. **Hoàn Nguyên routes/api.php**: Loại bỏ middleware vai trò
5. **Hoàn Nguyên frontend**: Loại bỏ user_role từ yêu cầu đăng nhập

---

## Tác Động Hiệu Suất

- **Tối Thiểu**: RateLimiter thêm ~1-2ms mỗi lần đăng nhập
- **Ghi Nhật Ký Hoạt Động**: Không đồng bộ (không bị chặn)
- **Middleware**: Chỉ ảnh hưởng tuyến đường được bảo vệ

---

## Cân Nhắc Bảo Mật

✅ Mật khẩu không bao giờ được ghi nhật ký
✅ Dữ liệu nhạy cảm được loại trừ khỏi phản hồi
✅ Giới hạn tỷ lệ ngăn chặn brute force
✅ Xác thực vai trò phía máy chủ (không thể bỏ qua)
✅ Bypass admin sử dụng kiểm tra vai trò hợp pháp
✅ Đường dẫn kiểm toán hoạt động được duy trì
✅ CORS được cấu hình đúng cách
✅ Xác thực dựa trên token với Sanctum
