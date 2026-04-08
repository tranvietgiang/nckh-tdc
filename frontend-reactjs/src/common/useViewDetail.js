import { useNavigate } from "react-router-dom";

export function useViewDetail(url) {
  const navigate = useNavigate(); // 1. Lấy hàm navigate từ React Router
  return (id) => navigate(`/${url}`, { state: { productId: id } }); // 2. Trả về 1 hàm nhận id và điều hướng
}
