import { useState, useEffect,useContext  } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
import { setToken, setUser } from "../../utils/storage";
import { ROLE } from "../../utils/constants";

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

    try {
      const res = await login({
        username,
        password,
      });

      const { user, token } = res;

      setUser(user);
      setToken(token);

      if (remember) {
        localStorage.setItem("savedUser", username);
        localStorage.setItem("savedPass", password);
      } else {
        localStorage.removeItem("savedUser");
        localStorage.removeItem("savedPass");
      }

      if (user.role === ROLE.STUDENT) navigate("/nckh-student");
      else if (user.role === ROLE.TEACHER) navigate("/nckh-teacher");
      else if (user.role === ROLE.ADMIN) navigate("/nckh-admin");
      
    } catch (error) {
      if (error.response) {
        console.error("Lỗi server:", error.response.data);
        alert(error.response.data.message || "Sai tài khoản hoặc mật khẩu!");
      } else {
        alert("Không thể kết nối tới máy chủ!");
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

    <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
      Đăng nhập hệ thống
    </h2>

    {/* Tên đăng nhập */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1E63C6]"
        maxLength={30}
      />
    </div>

    {/* Mật khẩu */}
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1E63C6] pr-10"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
      </button>
    </div>

    {/* Checkbox */}
    <div className="flex items-center mb-6">
      <input
        type="checkbox"
        id="remember"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
        className="mr-2 accent-[#1E63C6]"
      />
      <label htmlFor="remember" className="text-gray-600">
        Ghi nhớ đăng nhập
      </label>
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