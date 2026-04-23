import axiosClient from "./axiosClient";

const majorApi = {
  getById: (id) => axiosClient.get(`/major/${id}`),
  getAll: () => axiosClient.get("/majors"),
};

export default majorApi;
