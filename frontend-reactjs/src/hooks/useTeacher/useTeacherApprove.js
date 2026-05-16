import { useState } from "react";
import { teacherApi } from "../../api";
import { toast } from "react-toastify";

export default function useTeacherApprove() {
  const [loading_approve, setLoading] = useState(false);
  const [error_approve, setError] = useState(null);

  const teacherApprove = async (productId, moderationPayload = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await teacherApi.approve(productId, moderationPayload);
      console.log(res);

      if (!res.result) {
        const message =
          res?.reason || res?.message || "AI đã chặn duyệt sản phẩm";
        setError(message);
        toast.error(message);
        return null;
      }

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.reason ||
        err?.response?.data?.message ||
        "Không duyệt được sản phẩm";
      setError(message);
      toast.error(message);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading_approve,
    error_approve,
    teacherApprove,
  };
}
