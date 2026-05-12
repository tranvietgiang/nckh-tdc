export const initialFormData = {
  user_id: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  class: "",
  role: "student",
  major_id: "",
};

export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.user_id.trim()) {
    errors.user_id = "Vui lòng nhập mã số";
  } else if (
    formData.role === "student" &&
    !/^SV\d{7}$/.test(formData.user_id)
  ) {
    errors.user_id = "Mã sinh viên phải có dạng SV + 7 số (VD: SV2023001)";
  } else if (
    formData.role === "teacher" &&
    !/^GV\d{7}$/.test(formData.user_id)
  ) {
    errors.user_id = "Mã giảng viên phải có dạng GV + 7 số (VD: GV2023001)";
  }

  if (!formData.name.trim()) {
    errors.name = "Vui lòng nhập họ tên";
  }

  if (!formData.email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!formData.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else if (formData.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (!formData.password_confirmation) {
    errors.password_confirmation = "Vui lòng xác nhận mật khẩu";
  } else if (formData.password !== formData.password_confirmation) {
    errors.password_confirmation = "Mật khẩu xác nhận không khớp";
  }

  if (formData.role === "student" && !formData.class.trim()) {
    errors.class = "Vui lòng nhập lớp";
  }

  if (!formData.major_id) {
    errors.major_id = "Vui lòng chọn chuyên ngành";
  }

  return errors;
};

export const filterUsers = (users, searchTerm, filter) => {
  return users.filter((user) => {
    if (filter !== "all" && user.role !== filter) return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();

    return (
      user.user_id.toLowerCase().includes(term) ||
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });
};

export const getRoleText = (role) => {
  switch (role) {
    case "student":
      return "Sinh viên";
    case "teacher":
      return "Giảng viên";
    case "admin":
      return "Admin";
    default:
      return role;
  }
};

export const getRoleColor = (role) => {
  switch (role) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "teacher":
      return "bg-purple-100 text-purple-800";
    case "admin":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
