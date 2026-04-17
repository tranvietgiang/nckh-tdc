export const initialFormData = {
  title: "",
  description: "",
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
    // TITLE
    if (!formData.title.trim()) {
      errors.title = "Vui lòng nhập tên sản phẩm";
    } else if (formData.title.length < 5) {
      errors.title = "Tên phải ≥ 5 ký tự";
    } else if (formData.title.length > 100) {
      errors.title = "Tên tối đa 100 ký tự";
    }

    // DESCRIPTION
    if (!formData.description?.trim()) {
      errors.description = "Vui lòng nhập mô tả";
    } else if (formData.description.length < 10) {
      errors.description = "Mô tả phải ≥ 10 ký tự";
    } else if (formData.description.length > 300) {
      errors.description = "Mô tả tối đa 300 ký tự";
    }

    // CATEGORY
    if (!formData.cate_id) {
      errors.cate_id = "Chọn danh mục";
    }
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
