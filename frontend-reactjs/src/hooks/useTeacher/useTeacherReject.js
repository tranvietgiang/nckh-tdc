import { useState } from "react";
import { teacherApi } from "../../api";
import { toast } from "react-toastify";

export default function useTeacherReject() {
  const [loading_reject, setLoading] = useState(false);
  const [error_reject, setError] = useState(null);

  const teacherReject = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await teacherApi.reject(data);

      // console.log(res);
      if (!res.result) {
        toast.error(res?.message);
        return;
      }

      return res;
    } catch (err) {
      toast.error("Không từ chối được sản phẩm");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading_reject,
    error_reject,
    teacherReject,
  };
}
