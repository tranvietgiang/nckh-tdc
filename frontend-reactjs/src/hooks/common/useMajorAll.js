import { useEffect, useState } from "react";
import { majorApi } from "../../api";

export default function useMajorAll() {
  const [majorAll, setMajorAll] = useState([]);
  const [loadingMajorAll, setLoading] = useState(true);
  useEffect(() => {
    const fetchMajors = async () => {
      setLoading(true);
      try {
        const res = await majorApi.getAll();
        setMajorAll(res);
        // console.log(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  return { majorAll, loadingMajorAll };
}
