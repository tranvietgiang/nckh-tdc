import { useEffect, useState } from "react";
import { uploadApi } from "../../api";
export default function useUploadProduct(data) {
  const [isUploadingProduct, setLoading] = useState(false);
  useEffect(() => {
    const upload = async () => {
      setLoading(true);
      try {
        const res = await uploadApi.uploadProduct(data);
        if (res.upload_add_result) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    upload();
  }, [data]);

  return {
    isUploadingProduct,
  };
}
