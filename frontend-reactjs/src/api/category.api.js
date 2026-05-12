import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => axiosClient.get("/category/all"),
};

export default categoryApi;
