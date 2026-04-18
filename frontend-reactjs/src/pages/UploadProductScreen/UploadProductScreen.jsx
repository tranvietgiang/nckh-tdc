import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/common/BackButton";
import { AuthContext } from "../../contexts/AuthContext";
import { mapCurrentStudent } from "../../utils/userMapper";
import useMajorName from "../../hooks/common/useMajorName";
import useUploadPublishedCount from "../../hooks/useUpload/useUploadPublishedCount";
import useTitle from "../../hooks/common/useTitle";

import { getUploadResources } from "../../utils/uploadProductScreen/uploadRegistry";

const UploadProductScreen = () => {
  // const goBack = useBackToPage();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);

  const currentStudent = mapCurrentStudent(user, majorName);

  const { upload_count, upload_loading, upload_error } =
    useUploadPublishedCount();

  // registry động theo ngành
  const { useHook, FormComponent, title, description, gradient, icon } =
    getUploadResources(user?.major_id, majorName);

  useTitle(title);

  const form = useHook();

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
    steps,
    statusApi,

    isStepValid,
    isAllStepsCompleted,

    handleNextStep,
    handlePrevStep,
    handleChange,
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

    drafts,
    openViewDraft,
    setOpenViewDraft,
    handleSaveDraft,
    handleViewDraft,
    handleLoadDraft,
    handleDeleteDraft,
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* MODAL IMAGE */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-7xl"
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-h-[90vh] max-w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {submitStatus === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-3 text-center text-2xl font-bold text-green-600">
              Đăng thành công
            </h3>

            <p className="mb-5 text-center text-gray-600">
              Sản phẩm đã gửi tới giảng viên duyệt.
            </p>

            <button
              onClick={() => navigate("/nckh-student")}
              className={`w-full rounded-xl bg-gradient-to-r ${gradient} px-4 py-3 font-semibold text-white`}
            >
              Xem sản phẩm của tôi
            </button>
          </div>
        </div>
      )}

      {/* ERROR */}
      {submitStatus === "error" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-3 text-center text-2xl font-bold text-red-600">
              Upload thất bại
            </h3>

            <p className="mb-5 text-center text-gray-600">
              {statusApi?.message || "Có lỗi xảy ra"}
            </p>

            <button
              onClick={() => setSubmitStatus(null)}
              className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4">
        {/* BACK */}
        <BackButton loading={loading} />

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${gradient}`}
          >
            <span className="text-4xl">{icon}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>

          <p className="mt-2 text-gray-600">{description}</p>
        </div>

        {/* STEP */}
        <div className="mb-8 flex items-center justify-between gap-3">
          {steps.map((step, index) => {
            const isValid = isStepValid(step.id);
            const isTouched = touchedSteps[step.id];

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold
                    ${
                      currentStep === step.id
                        ? `bg-gradient-to-r ${gradient} text-white`
                        : isValid && isTouched
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>

                  <span className="mt-2 text-sm">{step.name}</span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 rounded ${
                      currentStep > step.id
                        ? `bg-gradient-to-r ${gradient}`
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* STUDENT */}
        <div
          className={`mb-8 rounded-2xl bg-gradient-to-r ${gradient} p-6 text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{currentStudent?.name}</h2>
              <p className="text-white/80">
                {currentStudent?.class} - {currentStudent?.major}
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">
                {upload_loading ? "..." : upload_error ? "Lỗi" : upload_count}
              </div>
              <div className="text-sm text-white/70">sản phẩm đã đăng</div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <FormComponent
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          currentStep={currentStep}
          handleSelectCategory={handleSelectCategory}
          handleImageUpload={handleImageUpload}
          images={images}
          thumbnailIndex={thumbnailIndex}
          removeImage={removeImage}
          setAsThumbnail={setAsThumbnail}
          handleFileUpload={handleFileUpload}
          files={files}
          removeFile={removeFile}
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleAddTag={handleAddTag}
          tags={tags}
          removeTag={removeTag}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          loading={loading}
          isAllStepsCompleted={isAllStepsCompleted}
          currentStudent={currentStudent}
          setSelectedImage={setSelectedImage}
          drafts={drafts}
          openViewDraft={openViewDraft}
          setOpenViewDraft={setOpenViewDraft}
          handleSaveDraft={handleSaveDraft}
          handleViewDraft={handleViewDraft}
          handleLoadDraft={handleLoadDraft}
          handleDeleteDraft={handleDeleteDraft}
        />
      </div>
    </div>
  );
};

export default UploadProductScreen;
