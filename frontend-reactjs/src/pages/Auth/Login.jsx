import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { ROLE } from "../../utils/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateLogin } from "./validateLogin";
import { FaUser, FaLock } from "react-icons/fa";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // Khi load trang: tự động điền lại nếu trước đó có lưu thông tin
  useEffect(() => {
    document.title = "Đăng nhập";

    const savedUser = localStorage.getItem("savedUser");
    const savedPass = localStorage.getItem("savedPass");

    if (savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
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
      const res = await login({
        username,
        password,
      });

      if (remember) {
        localStorage.setItem("savedUser", username);
        localStorage.setItem("savedPass", password);
      } else {
        localStorage.removeItem("savedUser");
        localStorage.removeItem("savedPass");
      }

      toast.dismiss();
      if (res.user.role === ROLE.STUDENT) navigate("/nckh-student");
      else if (res.user.role === ROLE.TEACHER) navigate("/nckh-teacher");
      else if (res.user.role === ROLE.ADMIN) navigate("/nckh-admin");
    } catch (error) {
      // console.log("error:", error);

      toast.dismiss();

      if (error.response?.status === 429) {
        toast.error(error.response.data.message);
        return;
      }

      if (error.response) {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      } else {
        toast.error(error.message || "Không thể kết nối tới máy chủ!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f6fb]">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg border border-gray-200 rounded-xl p-10 w-[380px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/nckh-visitor" className="group">
            <img
              src="/Images/logo-tdc-orginal.webp"
              alt="TDC"
              className="h-14 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:-translate-y-1 hover:drop-shadow-lg"
            />
          </Link>
        </div>

        <h1 className="text-[18px] font-semibold text-blue-800 tracking-wide mb-1">
          TRƯỜNG CAO ĐẲNG CÔNG NGHỆ
        </h1>

        <h2 className="text-2xl font-extrabold text-blue-800 tracking-wider mb-3">
          THỦ ĐỨC
        </h2>

        <p className="text-sm font-medium text-gray-600 uppercase tracking-widest mb-5">
          HỆ THỐNG QUẢN LÝ VÀ TRƯNG BÀY SẢN PHẨM
        </p>

        {/* Tên đăng nhập */}
        <div className="relative mb-6">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1E63C6] focus:border-transparent"
            maxLength={100}
          />
        </div>

        {/* Mật khẩu */}
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            maxLength={100}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-[#1E63C6] focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E63C6] hover:bg-[#174EA6] disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </div>
  );
}
