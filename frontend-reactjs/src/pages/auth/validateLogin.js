export const validateLogin = (username, password) => {
  if (!username || !password) {
    return "Vui lòng nhập đầy đủ thông tin!";
  }

  if (username.length < 4) {
    return "Tên đăng nhập phải có ít nhất 4 ký tự!";
  }

  if (username.length > 30) {
    return "Tên đăng nhập không quá 30 ký tự!";
  }

  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự!";
  }

  if (password.length > 50) {
    return "Mật khẩu không quá 50 ký tự!";
  }

  return null;
};
