import axiosClient from "./axiosClient";

const aiApi = {
  sendMessage: (message) => axiosClient.post("/ai/send", { message }),
  searchProducts: (message) => axiosClient.post("/ai/search", { message }),
};

export default aiApi;
