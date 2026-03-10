import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  me: () => axiosClient.get("/me"),
};

export default authApi;
