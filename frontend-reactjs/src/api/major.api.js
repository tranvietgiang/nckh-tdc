import axiosClient from "./axiosClient";

const majorApi = {
  getById: (id) => axiosClient.get(`/major/${id}`),
  getAll: () => axiosClient.get("/visitor/majors"),
};

export default majorApi;
