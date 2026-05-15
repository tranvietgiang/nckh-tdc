// useLoginLogic.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLE } from "../../utils/constants";
import { toast } from "react-toastify";
import { validateLogin } from "./validateLogin";

export const useLoginLogic = () => {
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [userRole, setUserRole] = useState("student");

  useEffect(() => {
    document.title = "Đăng nhập - TDC";
    setAnimated(true);

    const savedUser = localStorage.getItem("savedUser");
    if (savedUser) {
      setUsername(savedUser);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errorMsg = validateLogin(username, password);
    if (errorMsg) {
      toast.dismiss();
      toast.error(errorMsg, { autoClose: 2000 });
      setLoading(false);
      return;
    }

    try {
      const res = await login({ username, password });

      if (remember) {
        localStorage.setItem("savedUser", username);
      } else {
        localStorage.removeItem("savedUser");
      }

      toast.dismiss();

      // Kiểm tra role chọn vs role thực tế
      const actualRole = res.user.role;

      if (userRole === "student" && actualRole !== ROLE.STUDENT) {
        toast.error("Tài khoản này không phải sinh viên!");
        setLoading(false);
        return;
      }

      if (userRole === "lecturer" && actualRole === ROLE.STUDENT) {
        toast.error("Tài khoản này không phải giảng viên!");
        setLoading(false);
        return;
      }

      // Điều hướng theo role thực tế
      if (actualRole === ROLE.STUDENT) {
        window.location.href = "/nckh-student";
      } else if (actualRole === ROLE.TEACHER) {
        window.location.href = "/nckh-teacher";
      } else if (actualRole === ROLE.ADMIN) {
        window.location.href = "/nckh-admin";
      }
    } catch (error) {
      toast.dismiss();

      if (error.response?.status === 429) {
        toast.error(error.response.data.message);
      } else if (error.response) {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      } else {
        toast.error(error.message || "Không thể kết nối tới máy chủ!");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    showPassword,
    username,
    password,
    remember,
    loading,
    animated,
    userRole,
    // Setters
    setShowPassword,
    setUsername,
    setPassword,
    setRemember,
    setUserRole,
    // Handlers
    handleLogin,
  };
};
