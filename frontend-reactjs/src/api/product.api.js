import axiosClient from "./axiosClient";

const productApi = {
    getProductById: (id) => axiosClient.get(`/product/${id}`)
};

export default productApi;