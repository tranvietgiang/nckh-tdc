import axiosClient from "./axiosClient";

const majorApi = {
  getById: (id) => axiosClient.get(`/major/${id}`),
};

export default majorApi;