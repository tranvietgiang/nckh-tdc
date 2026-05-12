import { useState, useEffect } from "react";
import { categoryApi } from "../../api";

export default function useCategory() {
  const [isLoadingCategories, setLoading] = useState(false);
  const [categories, setCategory] = useState([]);
  const [categoryError, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await categoryApi.getAll();
        setCategory(res.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    isLoadingCategories,
    categories,
    categoryError,
  };
}
