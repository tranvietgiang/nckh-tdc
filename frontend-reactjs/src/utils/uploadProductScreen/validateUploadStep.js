// utils/uploadProductScreen/validateUploadStep.js

/* =========================================================
   INITIAL FORM DATA
========================================================= */
export const initialCNTTFormData = {
  // chung
  title: "",
  description: "",
  cate_id: "",
  awards: "",
  github_link: "",
  demo_link: "",

  // riêng CNTT
  programming_language: "",
  framework: "",
  database_used: "",
};

export const initialGraphicFormData = {
  // chung
  title: "",
  description: "",
  cate_id: "",
  awards: "",

  // riêng đồ họa
  design_type: "",
  tools_used: "",
  behance_link: "",
  drive_link: "",
};

export const initialAIFormData = {
  // chung
  title: "",
  description: "",
  cate_id: "",
  awards: "",
  github_link: "",
  demo_link: "",

  // riêng AI
  model_used: "",
  framework: "",
  language: "",
  dataset_used: "",
  accuracy_score: "",
};

export const initialNetworkFormData = {
  // chung
  title: "",
  description: "",
  cate_id: "",
  awards: "",

  // riêng mạng
  simulation_tool: "",
  network_protocol: "",
  topology_type: "",
  config_file: "",
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

    if (!formData.tools_used?.trim()) {
      errors.tools_used = "Vui lòng nhập công cụ sử dụng";
    }
  }

  if (step === 2) {
    validateMedia(images, files, errors);
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
