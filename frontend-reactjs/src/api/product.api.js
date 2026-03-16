import axiosClient from "./axiosClient";

const productApi = {
  getProductById: (id) => axiosClient.get(`/product/${id}`),
  getProductAll: () => axiosClient.get("/products"),
};

export default productApi;
