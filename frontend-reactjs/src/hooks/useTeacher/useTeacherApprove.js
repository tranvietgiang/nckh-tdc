import { useState } from "react";
import { teacherApi } from "../../api";
import { toast } from "react-toastify";

export default function useTeacherApprove() {
  const [loading_approve, setLoading] = useState(false);
  const [error_approve, setError] = useState(null);

  const teacherApprove = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await teacherApi.approve(productId);

      console.log(res);
      if (!res.teacher_approve_result) {
        toast.error(res?.message_teacher_approve_result || "Duyệt thất bại!");
        return;
      }

      return res.data;
    } catch (err) {
      toast.error("Không duyệt được sản phẩm");
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
