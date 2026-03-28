import axiosClient from "./axiosClient";

const uploadApi = {
  countPublishedProducts: () => axiosClient.get("/upload/count-published"),
  uploadProduct: (data) => axiosClient.post("upload/add", data),
};

export default uploadApi;
