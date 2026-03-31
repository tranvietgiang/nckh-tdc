import { useState, useEffect } from "react";
import { categoryApi } from "../api";
export default function useCategory() {
  const [isLoadingCategories, setLoading] = useState();
  const [categories, setCategory] = useState([]);
  const [categoryError, setError] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(true);
      try {
        const res = await categoryApi.getAll();
        setLoading(false);
        setError(false);
        setCategory(res.data);
      } catch (err) {
        console.error(err);
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
