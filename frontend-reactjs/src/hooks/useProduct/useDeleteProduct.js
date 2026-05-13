import { useEffect, useState } from "react";
import { productApi } from "../../api";
import { toast } from "react-toastify";

export default function useDeleteProduct() {
  const [deleteLoading, setLoading] = useState(false);
  const [deleteStatus, setStatus] = useState(false);

  useEffect(() => {
    const toastId = "product-delete-toast-sv";
    const deleteProduct = async () => {
      try {
        setLoading(true);
        const res = await productApi.deleteProduct();
        setStatus(res.status);
        toast.success("Xóa dữ liệu liệu thành công", { toastId });
      } catch (error) {
        console.error(error);
        setStatus(false);
      } finally {
        setLoading(false);
      }
    };

    deleteProduct();

    // 👇 cleanup khi đổi route / unmount
    return () => {
      toast.dismiss(toastId);
    };
  }, []);
  return { deleteLoading, deleteStatus };
}
