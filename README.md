<img width="791" height="230" alt="image" src="https://github.com/user-attachments/assets/9596e6e3-bd3e-4cd4-9213-5cff9665e47b" /># 🎓 Hệ thống quản lý và trưng bày sản phẩm Khoa CNTT

## 📌 Giới thiệu đề tài

Đây là đề tài nghiên cứu khoa học:

**“Xây dựng hệ thống quản lý và trưng bày sản phẩm Khoa Công nghệ Thông tin – Trường Cao đẳng Công nghệ Thủ Đức”**

Hệ thống được xây dựng nhằm hỗ trợ việc **quản lý, lưu trữ và trưng bày các sản phẩm học tập của sinh viên CNTT**, bao gồm đồ án, dự án, sản phẩm thiết kế và phần mềm.

Mục tiêu chính là tạo ra một nền tảng tập trung giúp sinh viên dễ dàng chia sẻ sản phẩm, giảng viên dễ dàng quản lý và nhà trường có thể quảng bá hoạt động đào tạo.

---

## 🏫 Bối cảnh thực hiện

Đề tài được triển khai tại:

:contentReference[oaicite:0]{index=0}

Trong thực tế, các sản phẩm của sinh viên Khoa CNTT hiện chưa được lưu trữ tập trung, gây khó khăn trong việc:
- Tìm kiếm và tham khảo sản phẩm
- Quản lý và phân loại theo chuyên ngành
- Trưng bày và giới thiệu sản phẩm học tập

---

## 🚀 Công nghệ sử dụng

| Thành phần | Công nghệ |
|------|----------|
| Backend | Laravel 12 |
| Frontend | ReactJS |
| Database | MySQL |
| Container | Docker |
| Environment | Vagrant + VirtualBox |

---
<img width="791" height="230" alt="image" src="https://github.com/user-attachments/assets/20508fea-b1b7-4ea9-be84-b2b02e63b55a" />


## ✨ Chức năng chính

### 👤 Người dùng (Sinh viên)
- Đăng tải sản phẩm học tập
- Xem và tìm kiếm sản phẩm
- Cập nhật thông tin sản phẩm

### 👨‍🏫 Giảng viên
- Duyệt và kiểm tra sản phẩm
- Phản hồi nội dung sinh viên

### 🛠️ Quản trị viên
- Quản lý toàn bộ hệ thống
- Phân quyền người dùng
- Quản lý danh mục, sản phẩm, thống kê

---

## 📦 Tính năng hệ thống

- 📁 Quản lý sản phẩm CNTT
- 🗂️ Phân loại theo danh mục / chuyên ngành
- 🔍 Tìm kiếm và lọc dữ liệu
- 🧾 Duyệt nội dung trước khi hiển thị
- 📊 Thống kê hệ thống
- 📤 Xuất dữ liệu (Excel / PDF)

---

## 🏗️ Kiến trúc hệ thống

Hệ thống được thiết kế theo mô hình tách biệt:

- **Frontend (ReactJS):** Giao diện người dùng
- **Backend (Laravel API):** Xử lý nghiệp vụ
- **Database (MySQL):** Lưu trữ dữ liệu

Ngoài ra:
- Docker dùng để container hóa hệ thống
- Vagrant + VirtualBox mô phỏng môi trường server thật

---

## 📁 Cấu trúc project

```bash
├── backend        # Laravel API
├── client         # ReactJS frontend
├── docker-compose.yml
├── Vagrantfile
└── README.md
