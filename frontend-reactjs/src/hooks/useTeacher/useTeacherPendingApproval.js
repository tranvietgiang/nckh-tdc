import { useEffect, useState } from "react";
import { teacherApi } from "../../api";
export default function useTeacherPendingApproval() {
  const [ProductsData, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeacherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await teacherApi.getData();
        setTeacher(res.data || []);
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
  }, []);
  return {
    ProductsData,
    loading,
    error,
  };
}
