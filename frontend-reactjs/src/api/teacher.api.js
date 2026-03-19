import axiosClient from "./axiosClient";

const teacherApi = {
  getStatistic: () => axiosClient.get("/teacher/statistic"),
};

export default teacherApi;
