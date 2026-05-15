# Tài Liệu Tham Khảo Nhanh - Hệ Thống Xác Thực

## Biến Môi Trường Cần Thiết

### Backend (.env)

```
APP_NAME=NCKH-TDC
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:...

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nckh_tdc
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SANCTUM_TOKEN_PREFIX=1

RATE_LIMITER=redis  # hoặc database
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:8000/api
```

---

## Các Lệnh Thường Dùng

### Lệnh Backend

```bash
# Xóa giới hạn tỷ lệ
php artisan tinker
>>> Illuminate\Support\Facades\RateLimiter::clear('login.lockout:username')
>>> exit

# Kiểm tra lần đăng nhập không thành công
php artisan tinker
>>> App\Models\ActivityLog::where('action', 'login')->latest()->limit(10)->get()

# Xóa tất cả token xác thực
php artisan tinker
>>> DB::table('personal_access_tokens')->truncate()
```

### Phát Triển Frontend

```bash
cd frontend-reactjs
npm install
npm run dev
```

---

## Mã Trạng Thái HTTP Trong Đăng Nhập

| Mã  | Tình Huống             | Phản Hồi                                                     |
| --- | ---------------------- | ------------------------------------------------------------ |
| 200 | Thành công             | `{success: true, user: {...}, token: "..."}`                 |
| 401 | Thông tin xác thực sai | `{success: false, message: "Sai tài khoản hoặc mật khẩu!"}`  |
| 422 | Va chạm vai trò        | `{success: false, message: "Tài khoản này không phải ...!"}` |
| 429 | Tài khoản bị khóa      | `{success: false, message: "Tài khoản bị khóa tạm thời..."}` |

---

## Ánh Xạ Vai Trò

```
Frontend       Backend Cơ Sở Dữ Liệu
sinh viên  →   student
giảng viên →   teacher
quản trị viên  →   admin
```

---

## Định Dạng Authorization Header

```
Authorization: Bearer 1|AbCdEfGhIjKlMnOpQrStUvWxYz...
```

---

## Mẹo Gỡ Lỗi

### Kiểm Tra xem token có được lưu trữ không

```javascript
localStorage.getItem("auth_token");
localStorage.getItem("auth_user");
```

### Giám Sát các cuộc gọi API

F12 → Network → Lọc theo XHR/Fetch

### Kiểm Tra vai trò người dùng trong bảng điều khiển

```javascript
const user = JSON.parse(localStorage.getItem("auth_user"));
console.log(user.role);
```

### Xác Minh tính hợp lệ của token

```php
// Trong tinker
$token = 'token_của_bạn';
$model = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
$model->tokenable; // trả về người dùng
```

---

## Ma Trận Khắc Phục Sự Cố

| Vấn Đề                             | Kiểm Tra                                                 |
| ---------------------------------- | -------------------------------------------------------- |
| Đăng nhập không thành công với 401 | Tên đăng nhập/mật khẩu đúng, người dùng tồn tại trong DB |
| Đăng nhập không thành công với 422 | Vai trò người dùng phù hợp với vai trò được chọn         |
| Đăng nhập không thành công với 429 | Chờ 15 phút hoặc xóa RateLimiter                         |
| Token không được duy trì           | Kiểm tra localStorage, xác minh AuthProvider             |
| Các tuyến đường trả về 401         | Định dạng token đúng, có tiền tố Bearer                  |
| Các tuyến đường trả về 403         | Vai trò người dùng phù hợp với vai trò bắt buộc          |
| Lỗi CORS                           | Kiểm tra config/cors.php, URL frontend được cho phép     |
| Hoạt động không được ghi nhật ký   | Kiểm tra bảng activity_logs, xác minh tạo                |

---

## Kiểm Thử Một Tính Năng

### Kiểm Thử xác thực vai trò chỉ

```bash
# 1. Khởi động Laravel
cd backend-laravel
php artisan serve

# 2. Trong thiết bị đầu cuối khác, kiểm tra API
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student1","password":"password","user_role":"lecturer"}'

# Kết quả dự kiến: lỗi 422
```

### Kiểm Thử khóa

```bash
# Chạy 6 lần với mật khẩu sai
for i in {1..6}; do
  curl -X POST http://localhost:8000/api/login \
    -H "Content-Type: application/json" \
    -d '{"username":"student1","password":"wrong","user_role":"student"}'
  echo "\nLần thử $i"
done

# Lần thử thứ 6 phải trả về 429
```

---

## Điểm Chuẩn Hiệu Suất

- Yêu cầu đăng nhập: ~100-200ms (với truy vấn DB)
- Kiểm tra tuyến đường được bảo vệ: ~5-10ms
- Xác minh token: ~2-5ms
- Kiểm tra giới hạn tỷ lệ: ~1-3ms

---

## Danh Sách Kiểm Tra Bảo Mật Trước Khi Triển Khai Sản Xuất

- [ ] HTTPS được thực thi
- [ ] CORS được cấu hình đúng (không phải wildcard)
- [ ] Giới hạn tỷ lệ được bật
- [ ] Ghi nhật ký hoạt động hoạt động
- [ ] Mật khẩu được băm bằng bcrypt
- [ ] Hết hạn token được đặt
- [ ] Thông tin xác thực admin mạnh mẽ
- [ ] Sao lưu cơ sở dữ liệu được lên lịch
- [ ] Nhật ký được giám sát
- [ ] Xử lý lỗi không rò rỉ thông tin
