import { useNavigate } from "react-router-dom";

export function useViewDetail(url) {
  const navigate = useNavigate();
  return (id) => navigate(`/${url}`, { state: { productId: id } });
}
