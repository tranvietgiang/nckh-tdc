import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import useProductDetailTeacher from "../../hooks/useProduct/useProductDetailTeacher";
import useImageViewer from "../../shared/useImageViewer";
import useTitle from "../../hooks/common/useTitle";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatDate";
import { getStatusColor } from "../../components/common/getStatusColor";
import { getStatusText } from "../../components/common/getStatusText";
import { getMajorTheme } from "../../utils/uploadProductScreen/uploadRegistry";

import { useHandleApprove } from "../../hooks/useTeacher/useHandleApprove";
import { useHandleSubmitReview } from "../../hooks/useTeacher/useHandleSubmitReview";
import { useHandleSubmitRejection } from "../../hooks/useTeacher/useHandleSubmitRejection";

import useTeacherApprove from "../../hooks/useTeacher/useTeacherApprove";
import useTeacherReject from "../../hooks/useTeacher/useTeacherReject";
import useReviewToggle from "../../hooks/common/useReviewToggle";

import LoadingSpinner from "../../components/common/LoadingOverlay";
import { confirmToast } from "../../components/common/ConfirmToast";
import BackButton from "../../components/common/BackButton";
import { Icons } from "../../components/common/Icon";
import { useHome } from "../../hooks/common/useHome";
const TeacherProductDetailScreen = () => {
  useTitle("Xem chi tiết sản phẩm - Giảng viên");
  const navigate = useNavigate();
  const { state } = useLocation();

  const id = state?.productId;
  useHome(id);

  const { product, loading, error, mutate } = useProductDetailTeacher(id);
  const { openViewer, ImageViewerModal } = useImageViewer();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  const { teacherApprove, loading_approve, error_approve } =
    useTeacherApprove();

  const { teacherReject, loading_reject, error_reject } = useTeacherReject();

  const images = product?.images || [];
  const productData = product?.product || {};
  const reviews = product?.reviews || [];

  // Lấy theme theo major_id
  const theme = getMajorTheme(productData?.major_id);

  const handleApproveOriginal = useHandleApprove(
    confirmToast,
    setIsSubmitting,
    toast,
    navigate,
    teacherApprove,
  );

  const handleSubmitReviewOriginal = useHandleSubmitReview(
    confirmToast,
    setIsSubmitting,
    toast,
    mutate,
    navigate,
  );

  const submitRejectionOriginal = useHandleSubmitRejection(
    feedback,
    setIsSubmitting,
    toast,
    setShowFeedbackModal,
    setFeedback,
    navigate,
    teacherReject,
  );

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
          <div
            className={`w-12 h-12 border-4 border-${theme.primary}-600 border-t-transparent rounded-full animate-spin mx-auto mb-4`}
          ></div>
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
            <Icons.AlertCircle />
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
          <Icons.AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
                <Icons.AlertCircle className="w-5 h-5 text-red-600" />
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
        <div className="mb-6">
          <BackButton loading={loading} />
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
                <span className="flex items-center gap-1">
                  <Icons.Calendar className="w-4 h-4" />
                  Ngày đăng: {formatDate(productData?.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery ảnh */}
        {(productData?.thumbnail || images.length > 0) && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.Image className="w-5 h-5" />
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
                <Icons.ZoomIn />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {images.map((img) => (
                <button
                  key={img.product_image_id}
                  onClick={() => openViewer(img.image_url)}
                  className={`group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-${theme.primary}-500 transition`}
                >
                  <img
                    src={img.image_url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Icons.ZoomInSmall />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.Info className="w-5 h-5" />
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
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.CheckCircle className="w-5 h-5" />
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
        {(productData?.demo_link || productData?.github_link) && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.Link className="w-5 h-5" />
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
                  <Icons.Github />
                  <span className="flex-1 text-sm text-gray-700">
                    {productData?.github_link}
                  </span>
                  <Icons.ExternalLink />
                </a>
              )}
              {productData?.demo_link && (
                <a
                  href={productData?.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <Icons.Monitor />
                  <span className="flex-1 text-sm text-gray-700">
                    {productData?.demo_link}
                  </span>
                  <Icons.ExternalLink />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Files */}
        {product.files && product.files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.FileText className="w-5 h-5" />
              Tệp đính kèm
            </h2>
            <div className="space-y-2">
              {product.files.map((file) => {
                const fileName = file.file_url?.split("/").pop() || "Tệp tin";
                const fileExt =
                  file.file_type?.toUpperCase() ||
                  fileName.split(".").pop().toUpperCase();
                let fileType = "FILE";
                if (["PDF"].includes(fileExt)) fileType = "PDF";
                if (["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(fileExt))
                  fileType = "IMAGE";
                if (["MP4", "MOV", "AVI", "MKV"].includes(fileExt))
                  fileType = "VIDEO";

                return (
                  <a
                    key={file.product_file_id}
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div
                      className={`w-10 h-10 ${theme.light} rounded-lg flex items-center justify-center`}
                    >
                      <Icons.FileIcon type={fileType} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {fileName}
                      </p>
                      <p className="text-xs text-gray-500">Tải xuống để xem</p>
                    </div>
                    <Icons.Download className={`w-5 h-5 ${theme.text}`} />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2
              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
              <Icons.Tag className="w-5 h-5" />
              Công nghệ sử dụng
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag.tag_id || tag.id}
                  className={`px-3 py-1.5 bg-gradient-to-r ${theme.gradient} text-white text-sm rounded-lg shadow-sm flex items-center gap-1`}
                >
                  <Icons.Tag className="w-3 h-3" />#{tag.tag_name || tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nhận xét */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2
            className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
          >
            <Icons.MessageCircle className="w-5 h-5" />
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
                className={`px-5 py-2 ${theme.button} text-white rounded-lg transition text-sm font-medium flex items-center gap-2 disabled:opacity-50`}
              >
                <Icons.Send className="w-4 h-4" />
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
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                        >
                          {review.teacher?.fullname?.charAt(0) || "G"}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900 text-sm flex items-center gap-1">
                              <Icons.User className="w-3 h-3" />
                              {review.teacher?.fullname ||
                                review.teacher_name ||
                                "Giảng viên"}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Icons.Clock className="w-3 h-3" />
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
                    className={`${theme.text} hover:${theme.text} text-sm font-medium flex items-center gap-1`}
                  >
                    <Icons.ChevronDown className="w-4 h-4" />
                    Xem thêm
                  </button>
                )}

                {canCollapse && (
                  <button
                    onClick={collapse}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Icons.ChevronUp className="w-4 h-4" />
                    Thu gọn
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icons.MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
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
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <Icons.XCircle className="w-4 h-4" />
                {loading_reject ? "Đang từ chối..." : "Từ chối"}
              </button>
              <button
                onClick={handleApprove}
                disabled={isSubmitting || loading_approve}
                className={`px-6 py-2.5 ${theme.button} text-white rounded-lg transition font-medium shadow-md flex items-center gap-2 disabled:opacity-50`}
              >
                <Icons.CheckCircle className="w-4 h-4" />
                {loading_approve ? "Đang duyệt..." : "Duyệt sản phẩm"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY LOADING TOÀN MÀN HÌNH */}
      {isSubmitting && (
        <LoadingSpinner fullScreen={true} message="Đang xử lý..." size="md" />
      )}
    </div>
  );
};

export default TeacherProductDetailScreen;
