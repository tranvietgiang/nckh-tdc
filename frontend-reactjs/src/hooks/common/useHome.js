import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useHome = (id) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/not-found");
    }
  }, [id, navigate]);
};
