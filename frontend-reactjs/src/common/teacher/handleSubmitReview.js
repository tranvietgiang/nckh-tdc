export const useHandleSubmitReview = async (
  reviewComment,
  toast,
  setIsSubmitting,
  setReviewComment,
  mutate,
) => {
  if (!reviewComment.trim()) {
    toast.warning("Vui lòng nhập nhận xét!");
    return;
  }

  setIsSubmitting(true);
  try {
    // Gọi API gửi nhận xét
    // await submitReview(id, { comment: reviewComment });
    toast.success("✅ Đã gửi nhận xét thành công!");
    setReviewComment("");
    mutate();
  } catch (error) {
    console.error(error);
    toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
  } finally {
    setIsSubmitting(false);
  }
};
