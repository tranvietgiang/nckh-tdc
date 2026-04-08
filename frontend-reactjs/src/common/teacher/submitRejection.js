export const useSubmitRejection = async (
  feedback,
  setIsSubmitting,
  toast,
  setShowFeedbackModal,
  setFeedback,
  mutate,
  navigate,
) => {
  if (!feedback.trim()) {
    toast.warning("Vui lòng nhập lý do từ chối!");
    return;
  }

  setIsSubmitting(true);
  try {
    // Gọi API từ chối sản phẩm với feedback
    // await rejectProduct(id, { feedback });
    toast.success("Đã gửi phản hồi từ chối!");
    setShowFeedbackModal(false);
    setFeedback("");
    mutate();
    setTimeout(() => navigate("/teacher/pending-reviews"), 1500);
  } catch (error) {
    console.error(error);
    toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
  } finally {
    setIsSubmitting(false);
  }
};
