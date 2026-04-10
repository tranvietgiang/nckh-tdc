import { useEffect, useState } from "react";
import { productApi } from "../../api";
import { toast } from "react-toastify";
export default function useProductAll() {
  const [products, setProductAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const toastId = "product-detail-toast-sv-all";
    const getProductAll = async () => {
      try {
        setLoading(true);
        const res = await productApi.getProductAll();
        toast.success("Tải dữ liệu thành công", { toastId });
        setProductAll(res || []);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProductAll();

    // 👇 cleanup khi đổi route / unmount
    return () => {
      toast.dismiss(toastId);
    };
  }, []);
  return { products, loading, error };
}
