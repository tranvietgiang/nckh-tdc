import axiosClient from "./axiosClient";

const productApi = {
  getProductById: (id) => axiosClient.get(`/product/${id}`),
  getProductAll: () => axiosClient.get("/products"),
  getProductByIdTeacher: (id) => axiosClient.get(`/teacher/product/${id}`),
  getProductRejectTeacher: (id) =>
    axiosClient.get(`/teacher/products/${id}/reject`),
  getProductApproveTeacher: (id) =>
    axiosClient.get(`/teacher/products/${id}/approve`),
  deleteProduct: (id) => axiosClient.post(`/student/delete`, id),
  getVisitorProducts: () => axiosClient.get("/visitor/products"),
};

export default productApi;
