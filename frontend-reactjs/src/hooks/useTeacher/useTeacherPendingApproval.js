import { useEffect, useRef, useState } from "react";
import { teacherApi } from "../../api";
import { toast } from "react-toastify";
export default function useTeacherPendingApproval() {
  const [ProductsData, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const toastId = "product-all-toast-gv";
    const getTeacherData = async () => {
      setLoading(true);
      setError(null);
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const res = await teacherApi.getData();
        setTeacher(res.data || []);
        toast.success("Tải dữ liệu thành công", { toastId });
      } catch (err) {
        if (
          err.response?.status === 404 ||
          err.response?.data?.teacher_data_result === false
        ) {
          setTeacher([]);
          setError(err.response?.data?.message || "Không tìm thấy sản phẩm");
        } else {
          setError("Không tải được chi tiết sản phẩm");
        }
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTeacherData();
    // 👇 cleanup khi đổi route / unmount
    return () => {
      toast.dismiss(toastId);
    };
  }, []);
  return {
    ProductsData,
    loading,
    error,
  };
}
