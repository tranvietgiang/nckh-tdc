import { useEffect, useState } from "react";
import { majorApi } from "../../api";

export default function useMajorAll() {
  const [majors, setMajors] = useState([]);
  const [loadingMajorAll, setLoading] = useState(true);
  useEffect(() => {
    const fetchMajors = async () => {
      setLoading(true);
      try {
        const res = await majorApi.getAll();
        setMajors(res.majors);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  return { majors, loadingMajorAll };
}
