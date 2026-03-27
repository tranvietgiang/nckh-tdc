export const initialFormData = {
  title: "",
  description: "",
  content: "",
  github_link: "",
  demo_link: "",
  major_id: "",
  cate_id: "",
};

export const validateUploadStep = ({
  step,
  formData,
  images = [],
  files = [],
}) => {
  const errors = {};

  if (step === 1) {
    if (!formData.title.trim()) errors.title = "Vui lòng nhập tên sản phẩm";
    if (!formData.description?.trim())
      errors.description = "Vui lòng nhập mô tả";
    if (!formData.major_id) errors.major_id = "Chọn chuyên ngành";
    if (!formData.cate_id) errors.cate_id = "Chọn danh mục";
  }

  if (step === 2) {
    if (images.length === 0) errors.images = "Cần ít nhất 1 ảnh";
    if (images.length > 10) errors.images = "Tối đa 10 ảnh";
    if (files.length > 5) errors.files = "Tối đa 5 file";
  }

  if (step === 3) {
    if (formData.github_link && !isValidUrl(formData.github_link)) {
      errors.github_link = "Link GitHub không hợp lệ";
    }
    if (formData.demo_link && !isValidUrl(formData.demo_link)) {
      errors.demo_link = "Link demo không hợp lệ";
    }
  }

  return errors;
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
