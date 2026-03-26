import axiosClient from "./axiosClient";

const uploadApi = {
  countPublishedProducts: () => axiosClient.get("/upload/count-published"),
};

export default uploadApi;
