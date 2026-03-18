import { useEffect, useState } from "react";
import { productApi } from "../api";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return {
    product,
    loading,
    error,
  };
}
