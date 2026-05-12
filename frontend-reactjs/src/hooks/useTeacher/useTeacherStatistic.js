import { useEffect, useRef, useState } from "react";
import { teacherApi } from "../../api";
import { toast } from "react-toastify";

export default function useTeacherStatistic() {
  const [teacherStatistic, setTeacher] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const toastId = "statistic-gv";
    const getTeacherStatistic = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const res = await teacherApi.getStatistic();
        toast.success("Tải dữ liệu thống kê thành công", { toastId });
        setTeacher(res.data || null);
      } catch (err) {
        console.error(err);
      }
    };
    getTeacherStatistic();
    // 👇 cleanup khi đổi route / unmount
    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  return { teacherStatistic };
}
