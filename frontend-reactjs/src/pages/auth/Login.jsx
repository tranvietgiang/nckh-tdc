// Login.jsx
import { useLoginLogic } from "./useLoginLogic";
import { LoginUI } from "./LoginUI";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const {
    showPassword,
    username,
    password,
    remember,
    loading,
    animated,
    userRole,
    setShowPassword,
    setUsername,
    setPassword,
    setRemember,
    setUserRole,
    handleLogin,
  } = useLoginLogic();

  return (
    <LoginUI
      navigate={navigate}
      animated={animated}
      userRole={userRole}
      setUserRole={setUserRole}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      remember={remember}
      setRemember={setRemember}
      loading={loading}
      handleLogin={handleLogin}
    />
  );
}
