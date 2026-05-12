import axiosClient from "./axiosClient";

const majorApi = {
  getById: (id) => axiosClient.get(`/major/${id}`),
  getAll: () => axiosClient.get("/visitor/majors"),
  getMajorCode: (id) => axiosClient.get(`/major/code/${id}`),
};

export default majorApi;
