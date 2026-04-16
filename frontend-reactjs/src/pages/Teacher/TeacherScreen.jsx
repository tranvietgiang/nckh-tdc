import React, { useState, useContext } from "react";
import UserDropdown from "../../shared/UserDropdown";
import useTitle from "../../hooks/common/useTitle";
import { AuthContext } from "../../contexts/AuthContext";
import useMajorName from "../../hooks/common/useMajorName";
import useTeacherStatistic from "../../hooks/useTeacher/useTeacherStatistic";
import useTeacherPendingApproval from "../../hooks/useTeacher/useTeacherPendingApproval";
import { useViewDetail } from "../../hooks/common/useViewDetail";
import useImageViewer from "../../shared/useImageViewer";
import { getStatusColor } from "../../components/common/getStatusColor";
import { getStatusText } from "../../components/common/getStatusText";
import { formatDate } from "../../utils/formatDate";

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

// Collapsible Stat Card Component
const CollapsibleStatCard = ({ label, value, color, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    purple: {
      bg: "from-purple-50 to-purple-100",
      text: "text-purple-600",
      value: "text-purple-700",
      border: "border-purple-200",
    },
    yellow: {
      bg: "from-yellow-50 to-yellow-100",
      text: "text-yellow-600",
      value: "text-yellow-700",
      border: "border-yellow-200",
    },
    green: {
      bg: "from-green-50 to-green-100",
      text: "text-green-600",
      value: "text-green-700",
      border: "border-green-200",
    },
    red: {
      bg: "from-red-50 to-red-100",
      text: "text-red-600",
      value: "text-red-700",
      border: "border-red-200",
    },
  };

  const classes = colorClasses[color] || colorClasses.purple;

  return (
    <div
      className={`bg-gradient-to-br ${classes.bg} rounded-xl shadow-sm hover:shadow-md transition overflow-hidden`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${classes.text}`}>{label}</p>
            <p className={`text-2xl font-bold ${classes.value} mt-1`}>
              {value}
            </p>
          </div>
          <svg
            className={`w-5 h-5 ${classes.text} transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div
          className={`px-4 pb-4 border-t ${classes.border} pt-3 animate-fadeIn`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
// ========== Main Component ==========
const TeacherScreen = () => {
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
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
      detail: "Tất cả sản phẩm đã được gửi lên hệ thống",
    },
    {
      label: "Chờ duyệt",
      value: pendingProducts.length,
      color: "yellow",
      detail: "Sản phẩm đang chờ giảng viên duyệt",
    },
    {
      label: "Đã duyệt",
      value: approvedProducts.length,
      color: "green",
      detail: "Sản phẩm đã được duyệt và công khai",
    },
    {
      label: "Từ chối",
      value: rejectedProducts.length,
      color: "red",
      detail: "Sản phẩm bị từ chối cần chỉnh sửa",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header mới - gọn đẹp */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Thanh header chính - luôn hiển thị */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Nút toggle */}
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isHeaderExpanded ? "" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Icon Dashboard */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-base font-semibold text-gray-800">
                  Giảng viên Dashboard
                </h1>
                {!isHeaderExpanded && (
                  <p className="text-xs text-gray-400">
                    Quản lý sản phẩm sinh viên
                  </p>
                )}
              </div>
            </div>

            {/* Thông tin giáo viên - dạng ngang */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-full">
                <div className="w-7 h-7 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {teacher.name?.charAt(0) || "G"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {teacher.name}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-500">{majorName}</span>
                </div>
              </div>
              <UserDropdown />
            </div>
          </div>

          {/* Phần mở rộng */}
          {isHeaderExpanded && (
            <div className="animate-fadeIn pb-4">
              {/* Stats Cards - Dạng lưới đẹp hơn */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-r ${
                      stat.color === "purple"
                        ? "from-purple-50 to-purple-50/50"
                        : stat.color === "yellow"
                          ? "from-yellow-50 to-yellow-50/50"
                          : stat.color === "green"
                            ? "from-green-50 to-green-50/50"
                            : "from-red-50 to-red-50/50"
                    } rounded-xl p-3 cursor-pointer hover:shadow-md transition-all`}
                    onClick={() => {
                      // Chuyển tab tương ứng khi click vào stat card
                      if (stat.label === "Chờ duyệt") setFilter("pending");
                      else if (stat.label === "Đã duyệt") setFilter("approved");
                      else if (stat.label === "Từ chối") setFilter("rejected");
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs font-medium ${
                            stat.color === "purple"
                              ? "text-purple-600"
                              : stat.color === "yellow"
                                ? "text-yellow-600"
                                : stat.color === "green"
                                  ? "text-green-600"
                                  : "text-red-600"
                          }`}
                        >
                          {stat.label}
                        </p>
                        <p
                          className={`text-xl font-bold mt-0.5 ${
                            stat.color === "purple"
                              ? "text-purple-700"
                              : stat.color === "yellow"
                                ? "text-yellow-700"
                                : stat.color === "green"
                                  ? "text-green-700"
                                  : "text-red-700"
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                      <span className="text-2xl opacity-50">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs và Search - gọn hơn */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                <div className="flex gap-1.5">
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
                        className={`px-4 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 ${
                          filter === tab
                            ? `bg-${colors[tab]}-500 text-white shadow-sm`
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
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
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs w-56 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <svg
                    className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400"
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
          )}
        </div>
      </div>

      {/* Content - giữ nguyên */}
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
                  {filteredPending.length > 0 && (
                    <span className="text-sm font-normal text-gray-500">
                      (Hiển thị {filteredPending.length} sản phẩm)
                    </span>
                  )}
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
                  {filteredApproved.length > 0 && (
                    <span className="text-sm font-normal text-gray-500">
                      (Hiển thị {filteredApproved.length} sản phẩm)
                    </span>
                  )}
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
                  {filteredRejected.length > 0 && (
                    <span className="text-sm font-normal text-gray-500">
                      (Hiển thị {filteredRejected.length} sản phẩm)
                    </span>
                  )}
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

      <ImageViewerModal />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TeacherScreen;
