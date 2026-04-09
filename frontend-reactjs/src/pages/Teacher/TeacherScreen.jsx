import React, { useState, useContext, useMemo } from "react";
import UserDropdown from "../../common/UserDropdown";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../contexts/AuthContext";
import useMajorName from "../../hooks/useMajorName";
import useTeacherStatistic from "../../hooks/useTeacher/useTeacherStatistic";
import useTeacherPendingApproval from "../../hooks/useTeacher/useTeacherPendingApproval";
import { useViewDetail } from "../../common/useViewDetail";
import useImageViewer from "../../hooks/useImageViewer";
import { getStatusColor } from "../../common/getStatusColor";
import { getStatusText } from "../../common/getStatusText";
import { formatDate } from "../../common/formatDate";

// ========== Extracted components ==========
const ProductCard = ({ product, type, onViewDetail, onOpenImageViewer }) => {
  const statusColor = getStatusColor(type);
  const statusText = getStatusText(type);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            onClick={() => onOpenImageViewer(product.thumbnail)}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
          />
          {type !== "pending" && (
            <div
              className={`absolute top-1 right-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusColor}`}
            >
              {statusText}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.title}
            </h3>
            {type === "pending" && (
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
              >
                {statusText}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="text-gray-600">
              Sinh viên: {product.student_fullname}
            </span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-gray-600">
              {product.student_class ?? "Chưa có lớp"}
            </span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-gray-600">{product.major_name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
              {product.category_name}
            </span>
            <span className="text-xs text-gray-500">
              Ngày gửi: {formatDate(product?.created_at)}
            </span>
            {product.approved_at && type === "approved" && (
              <span className="text-xs text-gray-500">
                Duyệt: {formatDate(product?.approved_at)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              onClick={() => onViewDetail(product.product_id)}
              className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition"
            >
              Xem chi tiết
            </button>
            {product.github_link && (
              <a
                href={product.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition"
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
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition"
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
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ message }) => (
  <div className="bg-white rounded-xl shadow-md p-12 text-center">
    <div className="text-6xl mb-4">📭</div>
    <p className="text-gray-500">{message}</p>
  </div>
);

// ========== Main Component ==========
const TeacherScreen = () => {
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  useTitle("Trang chủ giáo viên");

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const { teacherStatistic } = useTeacherStatistic();
  const { ProductsData, loading, error } = useTeacherPendingApproval();
  const handleViewDetail = useViewDetail("product-detail-teacher");
  const { openViewer, ImageViewerModal } = useImageViewer();

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

  const filterBySearch = (list) => {
    if (!searchTerm) return list;
    return list.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.student_fullname?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const filteredPending = filterBySearch(pendingProducts);
  const filteredApproved = filterBySearch(approvedProducts);
  const filteredRejected = filterBySearch(rejectedProducts);

  const stats = [
    {
      label: "Tổng sản phẩm",
      value: teacher.totalProducts,
      color: "purple",
    },
    {
      label: "Chờ duyệt",
      value: pendingProducts.length,
      color: "yellow",
    },
    {
      label: "Đã duyệt",
      value: approvedProducts.length,
      color: "green",
    },
    {
      label: "Từ chối",
      value: rejectedProducts.length,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Giảng viên Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">
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

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl p-4 shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-${stat.color}-600`}>
                      {stat.label}
                    </p>
                    <p
                      className={`text-2xl font-bold text-${stat.color}-700 mt-1`}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs và Search */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
            <div className="flex space-x-2">
              {["pending", "approved", "rejected"].map((tab) => {
                const counts = {
                  pending: pendingProducts.length,
                  approved: approvedProducts.length,
                  rejected: rejectedProducts.length,
                };
                const colors = {
                  pending: "yellow",
                  approved: "green",
                  rejected: "red",
                };
                const labels = {
                  pending: "Chờ duyệt",
                  approved: "Đã duyệt",
                  rejected: "Từ chối",
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      filter === tab
                        ? `bg-${colors[tab]}-500 text-white shadow-md`
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {labels[tab]} ({counts[tab]})
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm hoặc sinh viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingSkeleton />}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl">
            Lỗi: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {filter === "pending" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
                  Sản phẩm cần duyệt
                </h2>
                {filteredPending.length === 0 ? (
                  <EmptyState message="Không có sản phẩm chờ duyệt" />
                ) : (
                  <div className="space-y-4">
                    {filteredPending.map((product) => (
                      <ProductCard
                        key={product.product_id}
                        product={product}
                        type="pending"
                        onViewDetail={handleViewDetail}
                        onOpenImageViewer={openViewer}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {filter === "approved" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                  Sản phẩm đã duyệt
                </h2>
                {filteredApproved.length === 0 ? (
                  <EmptyState message="Không có sản phẩm đã duyệt" />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredApproved.map((product) => (
                      <ProductCard
                        key={product.product_id}
                        product={product}
                        type="approved"
                        onViewDetail={handleViewDetail}
                        onOpenImageViewer={openViewer}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {filter === "rejected" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                  Sản phẩm bị từ chối
                </h2>
                {filteredRejected.length === 0 ? (
                  <EmptyState message="Không có sản phẩm bị từ chối" />
                ) : (
                  <div className="space-y-4">
                    {filteredRejected.map((product) => (
                      <ProductCard
                        key={product.product_id}
                        product={product}
                        type="rejected"
                        onViewDetail={handleViewDetail}
                        onOpenImageViewer={openViewer}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal xem ảnh từ hook */}
      <ImageViewerModal />
    </div>
  );
};

export default TeacherScreen;
