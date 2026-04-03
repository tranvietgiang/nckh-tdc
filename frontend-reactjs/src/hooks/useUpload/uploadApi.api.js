import axios from "axios";
import { getToken } from "../../utils/storage"; // lấy token từ sessionStorage

const API_URL = import.meta.env.VITE_API_URL;

export const uploadApi = {
  uploadProduct: async (formData) => {
    console.log("Upload formData:", formData);

    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",

          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Upload error:", error.response || error);
      throw error;
    }
  },
};
