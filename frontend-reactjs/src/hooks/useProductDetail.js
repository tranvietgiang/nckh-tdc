import { useEffect, useState } from "react";
import { productApi } from "../api";
import { useNavigate } from "react-router-dom";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await productApi.getProductById(productId);

        setProduct(res);
      } catch (err) {
        if (
          err.response?.status === 404 ||
          err.response?.data?.product_result === false
        ) {
          navigate("/not-found");
          setProduct(null);
          setError(err.response?.data?.message || "Không tìm thấy sản phẩm");
        } else {
          setError("Không tải được chi tiết sản phẩm");
        }
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, navigate]);

  return {
    product,
    loading,
    error,
  };
}
