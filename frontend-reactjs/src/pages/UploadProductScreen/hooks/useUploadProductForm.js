import { useEffect, useState } from "react";
import {
  initialFormData,
  validateUploadStep,
} from "../utils/uploadFormHelpers";

export default function useUploadProductForm(currentStudent) {
  const [formData, setFormData] = useState(initialFormData);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [touchedSteps, setTouchedSteps] = useState({});

  const majors = [
    {
      id: 1,
      name: "Phát triển phần mềm",
      code: "PTPM",
      color: "blue",
      icon: "💻",
    },
    {
      id: 2,
      name: "Khoa học dữ liệu",
      code: "KHDL",
      color: "green",
      icon: "📊",
    },
    { id: 3, name: "Mạng máy tính", code: "MMT", color: "purple", icon: "🌐" },
    { id: 4, name: "Thiết kế đồ họa", code: "TKĐH", color: "pink", icon: "🎨" },
  ];

  const categories = [
    { id: 1, name: "Đồ án tốt nghiệp", icon: "🎓", color: "amber" },
    { id: 2, name: "Đồ án môn học", icon: "📚", color: "indigo" },
    { id: 3, name: "Sản phẩm nghiên cứu", icon: "🔬", color: "emerald" },
    { id: 4, name: "Bài tập lớn", icon: "📝", color: "cyan" },
    { id: 5, name: "Sản phẩm cá nhân", icon: "⭐", color: "rose" },
  ];

  const steps = [
    { id: 1, name: "Thông tin cơ bản", icon: "📋" },
    { id: 2, name: "Hình ảnh & Files", icon: "🖼️" },
    { id: 3, name: "Tags & Links", icon: "🔗" },
  ];

  const isStepValid = (step) => {
    const stepErrors = validateUploadStep({
      step,
      formData,
      images,
      files,
    });
    return Object.keys(stepErrors).length === 0;
  };

  const isAllStepsCompleted = () => {
    return isStepValid(1) && isStepValid(2) && isStepValid(3);
  };

  const handleNextStep = () => {
    const stepErrors = validateUploadStep({
      step: currentStep,
      formData,
      images,
      files,
    });

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setTouchedSteps((prev) => ({ ...prev, [currentStep]: true }));
      return;
    }

    setErrors({});
    setTouchedSteps((prev) => ({ ...prev, [currentStep]: true }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSelectMajor = (id) => {
    setFormData((prev) => ({
      ...prev,
      major_id: id,
    }));

    if (errors.major_id) {
      setErrors((prev) => ({ ...prev, major_id: null }));
    }
  };

  const handleSelectCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      cate_id: id,
    }));

    if (errors.cate_id) {
      setErrors((prev) => ({ ...prev, cate_id: null }));
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      if (!tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
      }

      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const fileList = Array.from(e.target.files || []);

    const newImages = fileList.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
    }));

    setImages((prev) => [...prev, ...newImages]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    setThumbnailIndex((prev) => Math.max(0, prev - 1));
  };

  const setAsThumbnail = (index) => {
    setThumbnailIndex(index);
  };

  const handleFileUpload = (e) => {
    const fileList = Array.from(e.target.files || []);

    const newFiles = fileList.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      type: file.name.split(".").pop().toUpperCase(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    if (errors.files) {
      setErrors((prev) => ({ ...prev, files: null }));
    }
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep !== 3) return;

    const allErrors = {
      ...validateUploadStep({ step: 1, formData, images, files }),
      ...validateUploadStep({ step: 2, formData, images, files }),
      ...validateUploadStep({ step: 3, formData, images, files }),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("content", formData.content || "");
      payload.append("github_link", formData.github_link || "");
      payload.append("demo_link", formData.demo_link || "");
      payload.append("major_id", formData.major_id);
      payload.append("cate_id", formData.cate_id);
      payload.append("student_id", currentStudent?.id || "");

      tags.forEach((tag) => {
        payload.append("tags[]", tag);
      });

      images.forEach((img, index) => {
        payload.append("images[]", img.file);
        payload.append(
          "image_meta[]",
          JSON.stringify({
            name: img.name,
            is_thumbnail: index === thumbnailIndex,
          }),
        );
      });

      files.forEach((file) => {
        payload.append("files[]", file.file);
      });

      // đổi API của m ở đây
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Upload thất bại");
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return {
    formData,
    setFormData,
    tags,
    setTags,
    tagInput,
    setTagInput,
    images,
    files,
    thumbnailIndex,
    loading,
    errors,
    currentStep,
    touchedSteps,
    selectedImage,
    submitStatus,
    majors,
    categories,
    steps,
    isStepValid,
    isAllStepsCompleted,
    handleNextStep,
    handlePrevStep,
    handleChange,
    handleSelectMajor,
    handleSelectCategory,
    handleAddTag,
    removeTag,
    handleImageUpload,
    removeImage,
    setAsThumbnail,
    handleFileUpload,
    removeFile,
    handleSubmit,
    setSelectedImage,
    setSubmitStatus,
  };
}
