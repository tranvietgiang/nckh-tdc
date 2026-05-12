export const useHandleApprove = (
  confirmToast,
  setIsSubmitting,
  toast,
  navigate,
  teacherApprove,
) => {
  return (productId) => {
    confirmToast({
      message: "Bạn có chắc chắn muốn duyệt sản phẩm này?",
      onConfirm: async () => {
        setIsSubmitting(true);

        try {
          await teacherApprove(productId);

          toast.success("Duyệt sản phẩm thành công", {
            autoClose: 1500,
            onClose: () => {
              navigate("/nckh-teacher");
            },
          });
        } catch (err) {
          toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
          console.error(err);
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };
};
