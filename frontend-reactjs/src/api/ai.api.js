import axiosClient from "./axiosClient";

const aiApi = {
  sendMessage: (message) => axiosClient.post("/ai/send", { message }),
};

export default aiApi;
