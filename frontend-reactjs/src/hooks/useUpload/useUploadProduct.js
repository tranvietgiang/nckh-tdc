import { useState } from "react";
import { uploadApi } from "../../api";

export default function useUploadProduct() {
  const [isUploadingProduct, setLoading] = useState(false);

  const uploadProduct = async (data) => {
    setLoading(true);

    try {
      const res = await uploadApi.uploadProduct(data);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    isUploadingProduct,
    uploadProduct,
  };
}
