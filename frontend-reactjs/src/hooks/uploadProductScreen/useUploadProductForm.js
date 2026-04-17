import { useEffect, useState, useContext } from "react";
import {
  initialFormData,
  validateUploadStep,
} from "../../utils/uploadProductScreen/validateUploadStep";
import { uploadApi } from "../useUpload/uploadApi.api";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
export default function useUploadProductForm() {
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
  const [openViewDraft, setOpenViewDraft] = useState(false);
  const [statusApi, setStatusApi] = useState({});
  const [drafts, setDrafts] = useState([]);
  const { user } = useContext(AuthContext);

  // console.log(majorName);
  // const navigate = useNavigate();
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

      // Hiển thị toast cho từng lỗi
      Object.values(stepErrors).forEach((msg) => {
        toast.error(msg, { autoClose: 2000 });
      });

      return; // dừng chuyển bước
    }

    // nếu không có lỗi
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

    // Giới hạn tổng số file là 10
    if (images.length + fileList.length > 10) {
      toast.error("Chỉ được tải lên tối đa 10 ảnh");
      return;
    }
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
      payload.append("major_id", user.major_id);
      payload.append("cate_id", formData.cate_id);

      console.log(payload);
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

      // hàm upload api
      const res = await uploadApi.uploadProduct(payload);

      if (!res.success) {
        setSubmitStatus("error");
        setStatusApi(res.error);
        return;
      }

      setSubmitStatus("success");
      setStatusApi(null); // reset nếu thành công
    } catch (error) {
      console.error("error:", error);
      setStatusApi(error);
      console.log(error);
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

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleSaveDraft = async () => {
    const imagesBase64 = await Promise.all(
      images.map(async (img) => ({
        id: img.id,
        url: await toBase64(img.file), // 🔥 convert
        name: img.name,
        size: img.size,
      })),
    );

    const draftData = {
      id: Date.now(),
      formData,
      images: imagesBase64, // ✅ đã safe
      files,
      tags,
      currentStep,
      createdAt: new Date().toISOString(),
    };

    const existingDrafts =
      JSON.parse(localStorage.getItem("product_drafts")) || [];

    const updatedDrafts = [draftData, ...existingDrafts];

    localStorage.setItem("product_drafts", JSON.stringify(updatedDrafts));

    toast.success("Đã lưu nháp!");
  };

  const handleViewDraft = () => {
    const stored = JSON.parse(localStorage.getItem("product_drafts")) || [];

    setDrafts(Array.isArray(stored) ? stored : []);
    setOpenViewDraft(true);
  };

  const handleLoadDraft = (draft) => {
    setFormData(draft.formData || {});

    // 🔥 convert lại format images
    const loadedImages = (draft.images || []).map((img, index) => ({
      id: img.id || Date.now() + index,
      file: null, // ❗ không có file nữa
      url: img.url, // ✅ base64 vẫn hiển thị được
      name: img.name,
      size: img.size,
    }));

    setImages(loadedImages);
    setFiles(draft.files || []);
    setTags(draft.tags || []);
    setCurrentStep(draft.currentStep || 1);

    setOpenViewDraft(false);
    toast.success("Đã load bản nháp!");
  };

  const handleDeleteDraft = (id) => {
    const stored = JSON.parse(localStorage.getItem("product_drafts")) || [];

    // ❌ loại bỏ luôn draft có id đó
    const updatedDrafts = stored.filter((draft) => draft.id !== id);

    // ✅ ghi đè lại localStorage
    localStorage.setItem("product_drafts", JSON.stringify(updatedDrafts));

    // ✅ update UI
    setDrafts(updatedDrafts);

    toast.success("Đã xóa bản nháp!");
  };

  return {
    formData,
    setFormData,
    statusApi,
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
    steps,
    openViewDraft,
    drafts,
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
    handleSaveDraft,
    handleViewDraft,
    handleLoadDraft,
    setOpenViewDraft,
    handleDeleteDraft,
  };
}
