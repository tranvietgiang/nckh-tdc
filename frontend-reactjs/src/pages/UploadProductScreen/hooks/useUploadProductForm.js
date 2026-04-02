import { useEffect, useState } from "react";
import {
  initialFormData,
  validateUploadStep,
} from "../utils/validateUploadStep";
import useUploadProduct from "../../../hooks/useUpload/useUploadProduct";
import { toast } from "react-toastify";

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
  const [drafts, setDrafts] = useState([]);
  const { isUploadingProduct, uploadProduct } = useUploadProduct();

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

    if (isUploadingProduct) return;

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("content", formData.content || "");
      payload.append("github_link", formData.github_link || "");
      payload.append("demo_link", formData.demo_link || "");
      payload.append("major_id", formData.major_id);
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
      const res = await uploadProduct(payload);
      console.log(res);

      // if (!res.ok) {
      //   throw new Error("Upload thất bại");
      // }

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

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now(), // 🔥 quan trọng
      formData,
      images,
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

  useEffect(() => {
    const drafts = localStorage.getItem("product_drafts"); // ✅ đúng key

    if (drafts) {
      try {
        const parsed = JSON.parse(drafts);

        if (Array.isArray(parsed) && parsed.length > 0) {
          const latestDraft = parsed[0]; // lấy bản mới nhất

          setFormData((prev) => ({
            ...prev,
            ...latestDraft.formData,
          }));

          setImages(latestDraft.images ?? []);
          setFiles(latestDraft.files ?? []);
          setTags(latestDraft.tags ?? []);
          setCurrentStep(latestDraft.currentStep ?? 1);
        }
      } catch (err) {
        console.error("Lỗi parse draft:", err);
      }
    }
  }, []);

  const handleViewDraft = () => {
    const stored = JSON.parse(localStorage.getItem("product_drafts")) || [];

    setDrafts(Array.isArray(stored) ? stored : []);
    setOpenViewDraft(true);
  };

  const handleLoadDraft = (draft) => {
    setFormData(draft.formData || {});
    setImages(draft.images || []);
    setFiles(draft.files || []);
    setTags(draft.tags || []);
    setCurrentStep(draft.currentStep || 1);

    setOpenViewDraft(false); // đóng modal
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
