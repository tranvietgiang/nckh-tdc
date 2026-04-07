import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ValidateUrl({ children }) {
  const { token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (token) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from || "/"} replace />;
  }

  return children; // ✅ quan trọng
}

export default ValidateUrl;
