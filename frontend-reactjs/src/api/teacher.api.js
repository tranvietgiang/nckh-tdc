import axiosClient from "./axiosClient";

const teacherApi = {
  getStatistic: () => axiosClient.get("/teacher/statistic"),
  getData: () => axiosClient.get("/teacher"),
  approve: (productId, data = {}) =>
    axiosClient.post(`/teacher/product/${productId}/approve`, data),
  reject: (data) => axiosClient.post("/teacher/product/reject", data),
};

export default teacherApi;
