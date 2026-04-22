// Login.jsx
import { useLoginLogic } from "./useLoginLogic";
import { LoginUI } from "./LoginUI";

export default function Login() {
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
