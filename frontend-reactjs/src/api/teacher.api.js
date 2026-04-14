import axiosClient from "./axiosClient";

const teacherApi = {
  getStatistic: () => axiosClient.get("/teacher/statistic"),
  getData: () => axiosClient.get("/teacher"),
  approve: (productId) =>
    axiosClient.post(`/teacher/product/${productId}/approve`),
  reject: (data) => axiosClient.post("/teacher/product/reject", data),
};

export default teacherApi;
