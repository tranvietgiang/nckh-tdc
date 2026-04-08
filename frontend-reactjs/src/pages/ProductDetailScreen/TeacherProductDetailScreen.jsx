import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetail from "../../hooks/useProduct/useProductDetail";
import useTitle from "../../hooks/useTitle";
import { confirmToast } from "../../common/ConfirmToast";
import { toast } from "react-toastify";
const TeacherProductDetailScreen = () => {
  useTitle("Xem chi tiết sản phẩm - Giảng viên");
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.productId;

  const { product, loading, error, mutate } = useProductDetail(id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleViewDetail = useViewDetail();

  // Hàm duyệt sản phẩm
  const handleApprove = () => {
    confirmToast({
      message: "Bạn có chắc chắn muốn duyệt sản phẩm này?",
      onConfirm: async () => {
        setIsSubmitting(true);
        try {
          // Gọi API duyệt sản phẩm
          // await approveProduct(id);
          toast.success("✅ Duyệt sản phẩm thành công!");
          mutate(); // Refresh dữ liệu
          setTimeout(() => navigate("/teacher/pending-reviews"), 1500);
        } catch (error) {
          toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  // Hàm từ chối sản phẩm (mở modal)
  const handleReject = () => {
    setShowFeedbackModal(true);
  };

  // Gửi phản hồi từ chối
  const submitRejection = async () => {
    if (!feedback.trim()) {
      toast.warning("Vui lòng nhập lý do từ chối!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Gọi API từ chối sản phẩm với feedback
      // await rejectProduct(id, { feedback });
      toast.success("Đã gửi phản hồi từ chối!");
      setShowFeedbackModal(false);
      setFeedback("");
      mutate();
      setTimeout(() => navigate("/teacher/pending-reviews"), 1500);
    } catch (error) {
      toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h2>
          <p className="text-gray-600">
            Sản phẩm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Modal phản hồi từ chối */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Từ chối sản phẩm
                </h3>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Nhập lý do từ chối sản phẩm..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={submitRejection}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận từ chối"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm">
            <a
              href="/teacher/dashboard"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Dashboard
            </a>
            <span className="text-gray-400">›</span>
            <a
              href="/teacher/pending-reviews"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Sản phẩm chờ duyệt
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium truncate">
              {product.title}
            </span>
          </nav>
        </div>

        {/* Action Buttons cho giảng viên (chỉ hiển thị khi sản phẩm đang chờ duyệt) */}
        {product.status === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600"
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
                </div>
                <div>
                  <p className="font-semibold text-yellow-800">
                    Sản phẩm đang chờ duyệt
                  </p>
                  <p className="text-sm text-yellow-700">
                    Vui lòng xem xét và đưa ra quyết định duyệt hoặc từ chối sản
                    phẩm này.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Từ chối
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Duyệt sản phẩm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Banner cho sản phẩm đã duyệt/từ chối */}
        {product.status === "approved" && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
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
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  Sản phẩm đã được duyệt
                </p>
                <p className="text-sm text-green-700">
                  Sản phẩm này đã được duyệt và công khai trên hệ thống.
                </p>
              </div>
            </div>
          </div>
        )}

        {product.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-800">
                  Sản phẩm đã bị từ chối
                </p>
                <p className="text-sm text-red-700">
                  Sản phẩm này đã bị từ chối. Sinh viên cần chỉnh sửa và gửi
                  lại.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phần còn lại giữ nguyên như màn hình chi tiết sản phẩm bình thường */}
        {/* ... (các phần header, gallery, tabs, sidebar giống như ProductDetailScreen) ... */}
      </div>
    </div>
  );
};

export default TeacherProductDetailScreen;
