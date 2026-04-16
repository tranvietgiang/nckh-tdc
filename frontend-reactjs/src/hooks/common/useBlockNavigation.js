import { useEffect } from "react";

const useBlockNavigation = (loading) => {
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

export default useBlockNavigation;
