import axiosClient from "./axiosClient";

const productApi = {
  getProductById: (id) => axiosClient.get(`/product/${id}`),
  getProductAll: () => axiosClient.get("/products"),
  getProductByIdTeacher: (id) => axiosClient.get(`/teacher/product/${id}`),
  getProductRejectTeacher: (id) =>
    axiosClient.get(`/teacher/products/${id}/reject`),
  getProductApproveTeacher: (id) =>
    axiosClient.get(`/teacher/products/${id}/approve`),
};

export default productApi;
