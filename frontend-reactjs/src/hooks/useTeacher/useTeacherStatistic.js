import { useEffect, useState } from "react";
import { teacherApi } from "../../api";

export default function useTeacherStatistic() {
  const [teacherStatistic, setTeacher] = useState(null);

  useEffect(() => {
    const getTeacherStatistic = async () => {
      try {
        const res = await teacherApi.getStatistic();
        setTeacher(res.data || null);
      } catch (err) {
        console.error(err);
      }
    };
    getTeacherStatistic();
  }, []);

  return { teacherStatistic };
}
