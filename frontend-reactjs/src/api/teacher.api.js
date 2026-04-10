import axiosClient from "./axiosClient";

const teacherApi = {
  getStatistic: () => axiosClient.get("/teacher/statistic"),
  getData: () => axiosClient.get("/teacher"),
  approve: (productId) =>
    axiosClient.post(`/teacher/product/${productId}/approve`),
};

export default teacherApi;
