import { useEffect, useState } from "react";
import { productApi } from "../api";
export default function useProductAll() {
  const [product, setProductAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductAll = async () => {
      try {
        setLoading(true);
        const res = await productApi.getProductAll();
        setProductAll(res || []);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProductAll();
  }, []);
  return { product, loading, error };
}
