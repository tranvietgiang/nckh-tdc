import { useEffect, useState } from "react";
import { productApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useProductDetailTeacher(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    const toastId = "product-detail-toast";

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await productApi.getProductByIdTeacher(productId);

        toast.success("Tải dữ liệu chi tiết sản phẩm thành công", {
          toastId,
        });

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
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();

    // 👇 cleanup khi đổi route / unmount
    return () => {
      toast.dismiss(toastId);
    };
  }, [productId, navigate]);

  return { product, loading, error };
}
