import React, { useContext } from "react";
import useBackToPage from "../../hooks/useBackToPage";
import { AuthContext } from "../../contexts/AuthContext";
import { mapCurrentStudent } from "../../utils/userMapper";
import useMajorName from "../../hooks/useMajorName";
import useUploadPublishedCount from "../../hooks/useUpload/useUpload";
import useUploadProductForm from "./hooks/useUploadProductForm";
// import useBlockNavigation from "../../hooks/useBlockNavigation";
const UploadProductScreen = () => {
  const goBack = useBackToPage();
  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const currentStudent = mapCurrentStudent(user, majorName);

  const { upload_count, upload_loading, upload_error } =
    useUploadPublishedCount();

  const {
    formData,
    tags,
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
  } = useUploadProductForm(currentStudent);
  // const { handleSafeBack } = useBlockNavigation(loading);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white/80 transition hover:bg-black/40 hover:text-white"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative max-h-[90vh] max-w-7xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            />

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
              <span className="max-w-[200px] truncate">
                {selectedImage.name}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/50"></span>
              <span>{selectedImage.size}MB</span>
              {selectedImage.id === images[thumbnailIndex]?.id && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/50"></span>
                  <span className="flex items-center gap-1">
                    <span>👑</span> Ảnh đại diện
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {submitStatus === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
          <div className="w-full max-w-md animate-scaleIn rounded-2xl bg-white p-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
              Đăng sản phẩm thành công!
            </h3>

            <p className="mb-6 text-center text-gray-600">
              Sản phẩm của bạn đã được gửi đến giảng viên chuyên ngành{" "}
              {currentStudent?.major} để duyệt. Bạn sẽ nhận được thông báo khi
              sản phẩm được phê duyệt.
            </p>

            <div className="mb-6 rounded-lg bg-blue-50 p-3">
              <p className="flex items-center gap-2 text-sm text-blue-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thời gian duyệt dự kiến: 24-48 giờ
              </p>
            </div>

            <button
              onClick={() => setSubmitStatus(null)}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-medium text-white transition hover:from-blue-700 hover:to-indigo-700"
            >
              Xem sản phẩm của tôi
            </button>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
          <div className="w-full max-w-md animate-scaleIn rounded-2xl bg-white p-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
              Upload thất bại
            </h3>

            <p className="mb-6 text-center text-gray-600">
              Có lỗi xảy ra khi gửi sản phẩm. Kiểm tra lại API hoặc dữ liệu rồi
              thử lại.
            </p>

            <button
              onClick={() => setSubmitStatus(null)}
              className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-3 font-medium text-white transition hover:from-red-600 hover:to-rose-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            if (loading) return;
            goBack();
          }}
          disabled={loading}
          className={`rounded-lg px-4 py-2 ${
            loading
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Quay lại
        </button>

        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent">
            Đăng sản phẩm mới
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Chia sẻ sản phẩm công nghệ của bạn với cộng đồng. Điền đầy đủ thông
            tin để giảng viên duyệt nhanh nhất.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isValid = isStepValid(step.id);
              const isTouched = touchedSteps[step.id];

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-semibold transition-all duration-300 ${
                        currentStep === step.id
                          ? "scale-110 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : isValid && isTouched
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isValid && isTouched && step.id !== currentStep ? (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>

                    <span
                      className={`mt-2 text-sm font-medium ${
                        currentStep === step.id
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-1 flex-1 rounded ${
                        currentStep > index + 1
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-2xl font-bold backdrop-blur">
                {currentStudent?.name?.charAt(0) || "S"}
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {currentStudent?.name}
                </h2>
                <p className="text-blue-100">
                  {currentStudent?.class} - {currentStudent?.major}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">
                {upload_loading ? "..." : upload_error ? "Lỗi" : upload_count}
              </div>

              <div className="text-blue-200">
                {upload_loading
                  ? "Đang tải..."
                  : upload_error
                    ? "Không tải được dữ liệu"
                    : "sản phẩm đã đăng"}
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            if (
              !window.confirm("Bạn chắc chắn muốn gửi sản phẩm này để duyệt?")
            ) {
              e.preventDefault();
              return;
            }
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          <div
            className={`overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ${
              currentStep === 1
                ? "scale-100 opacity-100"
                : "hidden scale-95 opacity-50"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <span>📋</span> Thông tin cơ bản
              </h2>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full rounded-xl border-2 px-4 py-3 ${
                    errors.title
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="VD: App Quản Lý Công Việc - TaskFlow"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-xl border-2 px-4 py-3 ${
                    errors.description
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Mô tả ngắn gọn về sản phẩm..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full rounded-xl border-2 px-4 py-3 ${
                    errors.content
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Mô tả chi tiết về sản phẩm..."
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Chuyên ngành <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {majors.map((major) => (
                      <button
                        key={major.id}
                        type="button"
                        onClick={() => handleSelectMajor(major.id)}
                        className={`rounded-xl border-2 p-4 transition-all ${
                          formData.major_id === major.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="mb-1 text-2xl">{major.icon}</div>
                        <div className="text-sm font-medium">{major.name}</div>
                        <div className="text-xs text-gray-500">
                          {major.code}
                        </div>
                      </button>
                    ))}
                  </div>

                  {errors.major_id && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.major_id}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Danh mục <span className="text-red-500">*</span>
                  </label>

                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const isSelected = formData.cate_id === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-100"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              isSelected ? "bg-indigo-200" : "bg-gray-100"
                            }`}
                          >
                            <span className="text-xl">{cat.icon}</span>
                          </div>

                          <div className="flex-1 text-left">
                            <p
                              className={`font-medium ${
                                isSelected ? "text-indigo-700" : "text-gray-700"
                              }`}
                            >
                              {cat.name}
                            </p>

                            {isSelected && (
                              <p className="mt-0.5 flex items-center gap-1 text-xs text-indigo-600">
                                <svg
                                  className="h-3 w-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Đang chọn
                              </p>
                            )}
                          </div>

                          {isSelected && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {errors.cate_id && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.cate_id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ${
              currentStep === 2
                ? "scale-100 opacity-100"
                : "hidden scale-95 opacity-50"
            }`}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <span>🖼️</span> Hình ảnh & Files
              </h2>
            </div>

            <div className="space-y-8 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hình ảnh sản phẩm <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="group relative block w-full cursor-pointer rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-12 transition-all hover:from-purple-100 hover:to-pink-100"
                  >
                    <div className="text-center">
                      <div className="mb-4 inline-flex rounded-full bg-white p-4 shadow-lg transition-transform group-hover:scale-110">
                        <svg
                          className="h-8 w-8 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="mb-2 text-lg font-medium text-gray-700">
                        Kéo thả hoặc click để tải ảnh lên
                      </p>
                      <p className="text-sm text-gray-500">
                        Hỗ trợ: JPG, PNG, GIF • Tối đa 10 ảnh • Mỗi ảnh ≤ 5MB
                      </p>
                    </div>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700">
                      <span>📸 Hình ảnh đã tải lên ({images.length}/10)</span>
                      <span className="text-xs text-gray-500">
                        Click vào ảnh để phóng to
                      </span>
                    </p>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {images.map((image, index) => (
                        <div key={image.id} className="relative">
                          {/* KHUNG ẢNH */}
                          <div className="group relative">
                            <div
                              className={`aspect-square cursor-pointer overflow-hidden rounded-xl border-4 transition-all ${
                                index === thumbnailIndex
                                  ? "scale-105 border-purple-500 shadow-xl"
                                  : "border-transparent hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={image.url}
                                alt={image.name}
                                className="h-full w-full object-cover"
                                onClick={() => setSelectedImage(image)}
                              />
                            </div>

                            {/* OVERLAY CHỈ PHỦ ẢNH */}
                            <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                              {/* NÚT PHÓNG TO */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(image);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-600"
                                title="Phóng to"
                              >
                                🔍
                              </button>

                              {/* NÚT XOÁ (ICON RÕ HƠN) */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(image.id);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
                                title="Xóa"
                              >
                                ❌
                              </button>
                            </div>

                            {/* ICON ẢNH ĐẠI DIỆN */}
                            {index === thumbnailIndex && (
                              <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white shadow-lg">
                                👑
                              </div>
                            )}
                          </div>

                          {/* NÚT KHÔNG BỊ CHE */}
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAsThumbnail(index)}
                              className={`w-full rounded-lg px-2 py-1 text-xs ${
                                index === thumbnailIndex
                                  ? "bg-purple-100 font-medium text-purple-700"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {index === thumbnailIndex
                                ? "Ảnh đại diện"
                                : "Đặt đại diện"}
                            </button>
                          </div>

                          <div className="mt-1 truncate text-xs text-gray-500">
                            {image.name} • {image.size}MB
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errors.images && (
                  <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  File đính kèm
                </label>

                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="group relative block w-full cursor-pointer rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 transition-all hover:from-indigo-100 hover:to-blue-100"
                  >
                    <div className="text-center">
                      <div className="mb-3 inline-flex rounded-full bg-white p-3 shadow-lg transition-transform group-hover:scale-110">
                        <svg
                          className="h-6 w-6 text-indigo-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414 6.586a6 6 0 106.364 6.364l6.364-6.364"
                          />
                        </svg>
                      </div>
                      <p className="mb-1 text-base font-medium text-gray-700">
                        Tải lên báo cáo, source code, tài liệu
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, ZIP, RAR • Tối đa 5 files • Mỗi file ≤ 50MB
                      </p>
                    </div>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium text-gray-700">
                      📁 Files đã tải lên ({files.length}/5)
                    </p>

                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="group flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
                      >
                        <div className="flex flex-1 items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-600">
                            {file.type}
                          </div>

                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.size} MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 opacity-0 transition hover:bg-red-200 group-hover:opacity-100"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.files && (
                  <p className="mt-2 text-sm text-red-600">{errors.files}</p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ${
              currentStep === 3
                ? "scale-100 opacity-100"
                : "hidden scale-95 opacity-50"
            }`}
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <span>🔗</span> Tags & Liên kết
              </h2>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Công nghệ sử dụng
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
                  placeholder="Nhập công nghệ và nhấn Enter (VD: React, Node.js...)"
                />

                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-sm font-medium text-white"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-white/80"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="github_link"
                    value={formData.github_link}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 ${
                      errors.github_link
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="https://github.com/username/repo"
                  />
                  {errors.github_link && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.github_link}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Demo Link
                  </label>
                  <input
                    type="url"
                    name="demo_link"
                    value={formData.demo_link}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 ${
                      errors.demo_link
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="https://demo.vercel.app"
                  />
                  {errors.demo_link && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.demo_link}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`rounded-xl border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 ${
                currentStep === 1 ? "invisible" : ""
              }`}
            >
              ← Quay lại
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Lưu nháp
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                >
                  Tiếp theo
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isAllStepsCompleted()}
                  className={`flex items-center gap-2 rounded-xl px-8 py-3 font-medium shadow-lg hover:shadow-xl ${
                    isAllStepsCompleted()
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Gửi duyệt
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">📌 Lưu ý:</span> Sản
              phẩm của bạn sẽ được gửi đến giảng viên chuyên ngành{" "}
              <span className="font-semibold">{currentStudent?.major}</span> để
              xét duyệt trong vòng 24-48 giờ.
            </p>

            {currentStep === 3 && !isAllStepsCompleted() && (
              <p className="mt-2 text-sm text-red-600">
                ⚠️ Vui lòng hoàn thành bước 1 và 2 trước khi gửi duyệt
              </p>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UploadProductScreen;
