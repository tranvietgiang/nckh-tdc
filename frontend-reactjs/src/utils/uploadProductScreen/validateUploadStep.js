// utils/uploadProductScreen/validateUploadStep.js

/* =========================================================
   INITIAL FORM DATA
========================================================= */

export const initialCNTTFormData = {
  title: "",
  description: "",
  github_link: "",
  demo_link: "",
  cate_id: "",
};

export const initialGraphicFormData = {
  title: "",
  description: "",
  design_type: "",
  tools: "",
  behance_link: "",
  drive_link: "",
  cate_id: "",
};

export const initialAIFormData = {
  title: "",
  description: "",
  model_type: "",
  dataset_link: "",
  demo_link: "",
  github_link: "",
  cate_id: "",
};

export const initialNetworkFormData = {
  title: "",
  description: "",
  network_type: "",
  simulation_link: "",
  report_link: "",
  cate_id: "",
};

/* =========================================================
   COMMON VALIDATE
========================================================= */

const validateBasicInfo = (formData, errors) => {
  if (!formData.title?.trim()) {
    errors.title = "Vui lòng nhập tên sản phẩm";
  } else if (formData.title.length < 5) {
    errors.title = "Tên phải từ 5 ký tự";
  } else if (formData.title.length > 100) {
    errors.title = "Tên tối đa 100 ký tự";
  }

  if (!formData.description?.trim()) {
    errors.description = "Vui lòng nhập mô tả";
  } else if (formData.description.length < 10) {
    errors.description = "Mô tả phải từ 10 ký tự";
  } else if (formData.description.length > 300) {
    errors.description = "Mô tả tối đa 300 ký tự";
  }

  if (!formData.cate_id) {
    errors.cate_id = "Vui lòng chọn danh mục";
  }
};

const validateMedia = (images = [], files = [], errors) => {
  if (images.length === 0) {
    errors.images = "Cần ít nhất 1 hình ảnh";
  }

  if (images.length > 10) {
    errors.images = "Tối đa 10 hình ảnh";
  }

  if (files.length > 5) {
    errors.files = "Tối đa 5 file";
  }
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/* =========================================================
   CNTT
========================================================= */

export const validateCNTTStep = ({
  step,
  formData,
  images = [],
  files = [],
}) => {
  const errors = {};

  if (step === 1) {
    validateBasicInfo(formData, errors);
  }

  if (step === 2) {
    validateMedia(images, files, errors);
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

/* =========================================================
   ĐỒ HỌA
========================================================= */

export const validateGraphicStep = ({
  step,
  formData,
  images = [],
  files = [],
}) => {
  const errors = {};

  if (step === 1) {
    validateBasicInfo(formData, errors);

    if (!formData.design_type) {
      errors.design_type = "Vui lòng chọn loại ấn phẩm";
    }
  }

  if (step === 2) {
    validateMedia(images, files, errors);
  }

  if (step === 3) {
    if (formData.behance_link && !isValidUrl(formData.behance_link)) {
      errors.behance_link = "Link Behance không hợp lệ";
    }

    if (formData.drive_link && !isValidUrl(formData.drive_link)) {
      errors.drive_link = "Link Google Drive không hợp lệ";
    }
  }

  return errors;
};

/* =========================================================
   AI
========================================================= */

export const validateAIStep = ({ step, formData, images = [], files = [] }) => {
  const errors = {};

  if (step === 1) {
    validateBasicInfo(formData, errors);

    if (!formData.model_type) {
      errors.model_type = "Vui lòng chọn loại mô hình AI";
    }
  }

  if (step === 2) {
    validateMedia(images, files, errors);
  }

  if (step === 3) {
    if (formData.dataset_link && !isValidUrl(formData.dataset_link)) {
      errors.dataset_link = "Link dataset không hợp lệ";
    }

    if (formData.demo_link && !isValidUrl(formData.demo_link)) {
      errors.demo_link = "Link demo không hợp lệ";
    }

    if (formData.github_link && !isValidUrl(formData.github_link)) {
      errors.github_link = "Link GitHub không hợp lệ";
    }
  }

  return errors;
};

/* =========================================================
   NETWORK
========================================================= */

export const validateNetworkStep = ({
  step,
  formData,
  images = [],
  files = [],
}) => {
  const errors = {};

  if (step === 1) {
    validateBasicInfo(formData, errors);

    if (!formData.network_type) {
      errors.network_type = "Vui lòng chọn loại hệ thống mạng";
    }
  }

  if (step === 2) {
    validateMedia(images, files, errors);
  }

  if (step === 3) {
    if (formData.simulation_link && !isValidUrl(formData.simulation_link)) {
      errors.simulation_link = "Link mô phỏng không hợp lệ";
    }

    if (formData.report_link && !isValidUrl(formData.report_link)) {
      errors.report_link = "Link báo cáo không hợp lệ";
    }
  }

  return errors;
};
