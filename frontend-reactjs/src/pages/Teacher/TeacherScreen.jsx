import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../../common/UserDropdown";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../contexts/AuthContext";
import useMajorName from "../../hooks/useMajorName";
import useTeacherStatistic from "../../hooks/useTeacher/useTeacherStatistic";
import useTeacherPendingApproval from "../../hooks/useTeacher/useTeacherPendingApproval";

import { useViewDetail } from "../../common/useViewDetail";
import { confirmToast } from "../../common/ConfirmToast";
const TeacherScreen = () => {
  const [filter, setFilter] = useState("pending");
  const [previewImage, setPreviewImage] = useState(null);
  useTitle("Trang chủ giáo viên");

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const { teacherStatistic } = useTeacherStatistic();
  const { ProductsData, loading, error } = useTeacherPendingApproval();

  const handleViewDetail = useViewDetail("product-detail-teacher");

  const teacher = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    major: majorName ?? "",
    rejectedProducts: teacherStatistic?.total_rejectedProduct ?? 0,
    totalProducts: teacherStatistic?.total_product ?? 0,
  };

  const pendingProducts = ProductsData?.pending_result ?? [];
  const approvedProducts = ProductsData?.approved_result ?? [];
  const rejectedProducts = ProductsData?.rejected_result ?? [];

  const handleApprove = () => {
    confirmToast({
      message: "Bạn có chắc chắn muốn duyệt sản phẩm này?",
      onConfirm: async () => {
        setIsSubmitting(true);
        try {
          // Gọi API duyệt sản phẩm
          // await approveProduct(id);
          toast.success("✅ Duyệt sản phẩm thành công!");
          mutate();
          setTimeout(() => navigate("/teacher/pending-reviews"), 1500);
        } catch {
          toast.error("❌ Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Giảng viên Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và duyệt sản phẩm sinh viên
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {teacher.name}
                </p>
                <p className="text-xs text-gray-500">{majorName}</p>
                <p className="text-xs text-gray-500">{teacher.email}</p>
              </div>
              <UserDropdown />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-medium">
                Tổng sản phẩm
              </p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                {teacher.totalProducts}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                {pendingProducts.length}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {approvedProducts.length}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-600 font-medium">Từ chối</p>
              <p className="text-2xl font-bold text-red-700 mt-1">
                {rejectedProducts.length}
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setFilter("pending")}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Chờ duyệt ({pendingProducts.length})
            </button>

            <button
              onClick={() => setFilter("approved")}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition ${
                filter === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đã duyệt ({approvedProducts.length})
            </button>

            <button
              onClick={() => setFilter("rejected")}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition ${
                filter === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Từ chối ({rejectedProducts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pending */}
        {filter === "pending" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm cần duyệt
            </h2>

            {loading && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
                Đang tải dữ liệu...
              </div>
            )}

            {error && (
              <div className="bg-white rounded-xl shadow-md p-6 text-red-600">
                Có lỗi xảy ra: {error}
              </div>
            )}

            {!loading && !error && pendingProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-500">
                Không có sản phẩm chờ duyệt
              </div>
            )}

            {!loading &&
              !error &&
              pendingProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex gap-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      onClick={() => setPreviewImage(product.thumbnail)}
                      className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-90"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.description}
                          </p>
                        </div>

                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          Chờ duyệt
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="text-gray-600">
                          Sinh viên: {product.student_fullname}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          {product.student_class ?? "Chưa có lớp"}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          {product.major_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {product.category_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Ngày gửi:{" "}
                          {new Date(product.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                          Duyệt
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">
                          Từ chối
                        </button>
                        <button
                          onClick={() => handleViewDetail(product.product_id)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition"
                        >
                          Xem chi tiết
                        </button>
                      </div>

                      <div className="flex gap-4 mt-3">
                        {product.github_link && (
                          <a
                            href={product.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                          </a>
                        )}

                        {product.demo_link && (
                          <a
                            href={product.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Approved */}
        {filter === "approved" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm đã duyệt
            </h2>

            {loading && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
                Đang tải dữ liệu...
              </div>
            )}

            {error && (
              <div className="bg-white rounded-xl shadow-md p-6 text-red-600">
                Có lỗi xảy ra: {error}
              </div>
            )}

            {!loading && !error && approvedProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-500">
                Không có sản phẩm đã duyệt
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="bg-white rounded-xl shadow-md p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        onClick={() => setPreviewImage(product.thumbnail)}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {product.student_fullname}
                          </span>
                          <span className="text-xs text-gray-500">
                            {product.approved_at
                              ? new Date(
                                  product.approved_at,
                                ).toLocaleDateString("vi-VN")
                              : "Chưa duyệt"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rejected */}
        {filter === "rejected" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm bị từ chối
            </h2>

            {loading && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
                Đang tải dữ liệu...
              </div>
            )}

            {error && (
              <div className="bg-white rounded-xl shadow-md p-6 text-red-600">
                Có lỗi xảy ra: {error}
              </div>
            )}

            {!loading && !error && rejectedProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-500">
                Không có sản phẩm bị từ chối
              </div>
            )}

            {!loading &&
              !error &&
              rejectedProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex gap-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      onClick={() => setPreviewImage(product.thumbnail)}
                      className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-90"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.description}
                          </p>
                        </div>

                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Từ chối
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="text-gray-600">
                          Sinh viên: {product.student_fullname}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          {product.student_class ?? "Chưa có lớp"}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          {product.major_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {product.category_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Ngày gửi:{" "}
                          {new Date(product.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>

                      <div className="flex gap-4 mt-3">
                        {product.github_link && (
                          <a
                            href={product.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                          </a>
                        )}

                        {product.demo_link && (
                          <a
                            href={product.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Preview Image */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold"
            >
              ×
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherScreen;
