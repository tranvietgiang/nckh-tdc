import axiosClient from "./axiosClient";

const teacherApi = {
  getStatistic: () => axiosClient.get("/teacher/statistic"),
  getData: () => axiosClient.get("/teacher"),
};

export default teacherApi;
