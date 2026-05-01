import { useEffect, useState } from "react";
import { majorApi } from "../../api";
export default function useMajorCode(majorId) {
  const [majorCode, setMajorCode] = useState("");
  const [loadingMajorCode, setLoading] = useState(false);
  const [errorMajorCode, setError] = useState(null);

  useEffect(() => {
    if (!majorId) return;

    const fetchMajorCode = async () => {
      setLoading(true);

      try {
        const res = await majorApi.getMajorCode(majorId);
        setMajorCode(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchMajorCode();
  }, [majorId]);

  return { majorCode, loadingMajorCode, errorMajorCode };
}
