import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLE } from "../../utils/constants";

export const useBlockNavigation = (loading) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (loading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading]);

  const handleSafeBack = (goBack) => {
    if (loading) {
      alert("Đang gửi dữ liệu, không thể quay lại!");
      return;
    }
    goBack();
  };

  return { handleSafeBack };
};

export const useRouterProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const goToProfile = (url) => user && navigate(url);

  return { goToProfile };
};

export const useBackToPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return goBack;
};
