import React, { useState, useContext, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetailTeacher from "../../hooks/useProduct/useProductDetailTeacher";
import useImageViewer from "../../shared/useImageViewer";
import useTitle from "../../hooks/common/useTitle";
import { toast } from "react-toastify";
import useBackToPage from "../../utils/backToPage";
import { formatDate } from "../../utils/formatDate";
import { getStatusColor } from "../../components/common/getStatusColor";
import { getStatusText } from "../../components/common/getStatusText";
import { useHandleApprove } from "../../components/teacher/useHandleApprove";
import { useHandleSubmitReview } from "../../components/teacher/handleSubmitReview";
import { useSubmitRejection } from "../../components/teacher/submitRejection";
import { AuthContext } from "../../contexts/AuthContext";
import useTeacherApprove from "../../hooks/useTeacher/useTeacherApprove";
import useTeacherReject from "../../hooks/useTeacher/useTeacherReject";
import useReviewToggle from "../../hooks/common/useReviewToggle";
import LoadingSpinner from "../../components/common/LoadingOverlay";
import { confirmToast } from "../../components/common/ConfirmToast";

const TeacherProductDetailScreen = () => {
  useTitle("Xem chi tiết sản phẩm - Giảng viên");
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.productId;
  const goBack = useBackToPage();

  const { product, loading, error, mutate } = useProductDetailTeacher(id);
  const { openViewer, ImageViewerModal } = useImageViewer();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  // const [reviewLimit, setReviewLimit] = useState(3); // ban đầu hiển thị 3

  const { teacherApprove, loading_approve, error_approve } =
    useTeacherApprove();

  const { teacherReject, loading_reject, error_reject } = useTeacherReject();

  // Hook duyệt sản phẩm (có thể đã quản lý isSubmitting bên trong)
  const handleApproveOriginal = useHandleApprove(
    confirmToast,
    setIsSubmitting,
    toast,
    navigate,
    teacherApprove,
  );

  // Hook gửi nhận xét
  const handleSubmitReviewOriginal = useHandleSubmitReview(
    confirmToast,
    setIsSubmitting,
    toast,
    mutate,
    navigate,
  );

  // Hook từ chối
  const submitRejectionOriginal = useSubmitRejection(
    feedback,
    setIsSubmitting,
    toast,
    setShowFeedbackModal,
    setFeedback,
    navigate,
    teacherReject,
  );

  // Bọc lại để đảm bảo loading tắt dù có lỗi
  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await handleApproveOriginal(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmitReviewOriginal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitRejection = async () => {
    setIsSubmitting(true);
    try {
      await submitRejectionOriginal(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const { getDisplayed, canShowMore, canCollapse, showMore, collapse } =
    useReviewToggle(3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">Không tìm thấy sản phẩm</p>
        </div>
      </div>
    );
  }

  if (error_approve) {
    return (
      <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
        {error_approve}
      </div>
    );
  }

  if (error_reject) {
    return (
      <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
        {error_reject}
      </div>
    );
  }

  const images = product.images || [];
  const productData = product?.product || {};
  // Trong component TeacherProductDetailScreen, sau các useState khác

  const reviews = product?.reviews || [];

  const displayedReviews = getDisplayed(reviews);

  const handleReject = () => setShowFeedbackModal(true);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ImageViewerModal />

      {/* Modal từ chối */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Từ chối sản phẩm
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Vui lòng nhập lý do từ chối để sinh viên biết và chỉnh sửa.
            </p>
            <textarea
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập lý do từ chối sản phẩm..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={submitRejection}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận từ chối"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (loading) return;
              goBack();
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Quay lại
          </button>
        </div>

        {/* Product Title & Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {productData?.title}
                  </h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(productData?.status)}`}
                >
                  {getStatusText(productData?.status)}
                </div>
              </div>
              <p className="text-gray-600 mb-3">{productData?.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Ngày đăng: {formatDate(productData?.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery ảnh */}
        {images.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Hình ảnh sản phẩm
            </h2>
            <div
              className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4 cursor-pointer relative group"
              onClick={() => openViewer(productData?.thumbnail)}
            >
              <img
                src={productData?.thumbnail}
                alt={productData?.title}
                className="w-full h-full object-contain duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {images.map((img) => (
                <button
                  key={img.product_image_id}
                  onClick={() => openViewer(img.image_url)}
                  className="group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition"
                >
                  <img
                    src={img.image_url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Thông tin cơ bản
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Chuyên ngành</span>
                <span className="font-medium text-gray-900">
                  {productData.major_name || "—"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Mã chuyên ngành</span>
                <span className="font-medium text-gray-900">
                  {productData.major_code || "—"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Danh mục</span>
                <span className="font-medium text-gray-900">
                  {productData.category_name || "—"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Tác giả</span>
                <span className="font-medium text-gray-900">
                  {product.author?.name || "—"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Email tác giả</span>
                <span className="font-medium text-gray-900">
                  {product.author?.email || "—"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Mã số sinh viên</span>
                <span className="font-medium text-gray-900">
                  {product.author?.mssv || "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Thông tin duyệt
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Người duyệt</span>
                <span className="font-medium text-gray-900">
                  {user?.name || "lỗi"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Ngày duyệt</span>
                <span className="font-medium text-gray-900">
                  {formatDate(productData?.approved_at)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Trạng thái</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(productData.status)}`}
                >
                  {getStatusText(productData?.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        {productData?.demo_link && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Liên kết
            </h2>
            <div className="space-y-3">
              {productData?.github_link && (
                <a
                  href={productData?.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="flex-1 text-sm text-gray-700">
                    {productData?.github_link}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {productData?.demo_link && (
                <a
                  href={productData?.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="flex-1 text-sm text-gray-700">
                    {productData?.demo_link}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Files */}
        {product.files && product.files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Tệp đính kèm
            </h2>
            <div className="space-y-2">
              {product.files.map((file) => (
                <a
                  key={file.product_file_id}
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {file.file_type?.toUpperCase() || "FILE"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {file.file_url?.split("/").pop() || "Tệp tin"}
                    </p>
                    <p className="text-xs text-gray-500">Tải xuống để xem</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-5-5A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Công nghệ sử dụng
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag.tag_id || tag.id}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg shadow-sm"
                >
                  #{tag.tag_name || tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nhận xét */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Nhận xét từ giảng viên
          </h2>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <textarea
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Viết nhận xét về sản phẩm này..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Gửi nhận xét
              </button>
            </div>
          </div>

          {reviews?.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-xs text-gray-400">
                  {reviews.length} nhận xét
                </span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              <div className="space-y-4">
                {displayedReviews.map((review, idx) => (
                  <React.Fragment key={review.review_id}>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.teacher?.fullname?.charAt(0) || "G"}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {review.teacher?.fullname ||
                                review.teacher_name ||
                                "Giảng viên"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(review.created_at)}
                            </p>
                          </div>

                          <p className="text-gray-700 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>

                    {(idx + 1) % 3 === 0 &&
                      idx !== displayedReviews.length - 1 && (
                        <hr className="my-4 border-t border-dashed border-gray-300" />
                      )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                {canShowMore && (
                  <button
                    onClick={showMore}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Xem thêm
                  </button>
                )}

                {canCollapse && (
                  <button
                    onClick={collapse}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Thu gọn
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-500 text-sm">Chưa có nhận xét nào</p>
              <p className="text-gray-400 text-xs mt-1">
                Hãy là người đầu tiên nhận xét!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {productData.status === "pending" && (
          <div className="sticky bottom-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleReject}
                disabled={loading_reject || isSubmitting}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-md disabled:opacity-50"
              >
                {loading_reject ? "Đang từ chối..." : "Từ chối"}
              </button>
              <button
                onClick={handleApprove}
                disabled={isSubmitting || loading_approve}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md disabled:opacity-50"
              >
                {loading_approve ? "Đang duyệt..." : "Duyệt sản phẩm"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY LOADING TOÀN MÀN HÌNH */}
      {/* Sử dụng LoadingSpinner fullScreen cho isSubmitting */}
      {isSubmitting && (
        <LoadingSpinner fullScreen={true} message="Đang xử lý..." size="md" />
      )}
    </div>
  );
};

export default TeacherProductDetailScreen;
