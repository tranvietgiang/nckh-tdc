export const useHandleApprove = (
  confirmToast,
  setIsSubmitting,
  toast,
  mutate,
  navigate,
) => {
  const handleApprove = () => {
    confirmToast({
      message: "Bạn có chắc chắn muốn duyệt sản phẩm này?",
      onConfirm: async () => {
        setIsSubmitting(true);
        try {
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

  return handleApprove;
};
