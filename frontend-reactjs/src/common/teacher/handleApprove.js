export const useHandleApprove = (
  confirmToast,
  setIsSubmitting,
  toast,
  mutate,
  navigate,
) => {
  confirmToast({
    message: "Bạn có chắc chắn muốn duyệt sản phẩm này?",
    onConfirm: async () => {
      setIsSubmitting(true);
      try {
        // Gọi API duyệt sản phẩm
        // await approveProduct(id);
        toast.success("✅ Duyệt sản phẩm thành công!");
        mutate();
        setTimeout(() => navigate("/teacher/pending-reviews"), 1500);
      } catch {
        toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
      } finally {
        setIsSubmitting(false);
      }
    },
  });
};
