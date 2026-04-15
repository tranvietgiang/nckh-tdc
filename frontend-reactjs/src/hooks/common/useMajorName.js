import { useEffect, useState } from "react";
import { majorApi } from "../../api";

export default function useMajorName(majorId) {
  const [majorName, setMajorName] = useState("");

  useEffect(() => {
    if (!majorId) return;

    const fetchMajor = async () => {
      try {
        const res = await majorApi.getById(majorId);
        setMajorName(res.major_name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMajor();
  }, [majorId]);

  return { majorName };
}
