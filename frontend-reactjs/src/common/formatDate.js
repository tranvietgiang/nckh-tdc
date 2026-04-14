// Format date
export const formatDate = (dateString) => {
  if (!dateString) return "Chưa có";
  return new Date(dateString).toLocaleDateString("vi-VN");
};
