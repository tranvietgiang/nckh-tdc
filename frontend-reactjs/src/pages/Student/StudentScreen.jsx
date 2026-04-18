import React, { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../../shared/UserDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../hooks/common/useTitle";
import useMajorName from "../../hooks/common/useMajorName";
import useProductAll from "../../hooks/useProduct/useProductAll";
import { mapCurrentStudent } from "../../utils/userMapper";
import { STATUS } from "../../utils/constants";

const StudentScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  useTitle("Trang chủ sinh viên");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const { products, loading, error } = useProductAll();
  const currentStudent = mapCurrentStudent(user, majorName);

  // Lấy màu theo ngành (đồng bộ với upload)
  const getMajorTheme = () => {
    const majorId = user?.major_id;

    switch (Number(majorId)) {
      case 1: // CNTT
        return {
          headerGradient: "from-blue-600 to-indigo-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          badgeBg: "bg-blue-700",
          textColor: "text-blue-700",
          hoverText: "hover:text-blue-700",
          hoverBg: "hover:bg-blue-50",
          statIconBg: "bg-blue-500/30",
          statIconHover: "group-hover:bg-blue-500/40",
          statText: "text-blue-100",
          tabActive: "text-blue-600",
          tabHover: "hover:text-blue-600",
        };
      case 2: // Đồ họa
        return {
          headerGradient: "from-rose-600 to-orange-600",
          buttonBg: "bg-rose-600 hover:bg-rose-700",
          badgeBg: "bg-rose-700",
          textColor: "text-rose-700",
          hoverText: "hover:text-rose-700",
          hoverBg: "hover:bg-rose-50",
          statIconBg: "bg-rose-500/30",
          statIconHover: "group-hover:bg-rose-500/40",
          statText: "text-rose-100",
          tabActive: "text-rose-600",
          tabHover: "hover:text-rose-600",
        };
      case 3: // Mạng máy tính
        return {
          headerGradient: "from-cyan-700 to-blue-800",
          buttonBg: "bg-cyan-700 hover:bg-cyan-800",
          badgeBg: "bg-cyan-800",
          textColor: "text-cyan-700",
          hoverText: "hover:text-cyan-700",
          hoverBg: "hover:bg-cyan-50",
          statIconBg: "bg-cyan-500/30",
          statIconHover: "group-hover:bg-cyan-500/40",
          statText: "text-cyan-100",
          tabActive: "text-cyan-600",
          tabHover: "hover:text-cyan-600",
        };
      case 4: // AI
        return {
          headerGradient: "from-purple-700 to-indigo-800",
          buttonBg: "bg-purple-700 hover:bg-purple-800",
          badgeBg: "bg-purple-800",
          textColor: "text-purple-700",
          hoverText: "hover:text-purple-700",
          hoverBg: "hover:bg-purple-50",
          statIconBg: "bg-purple-500/30",
          statIconHover: "group-hover:bg-purple-500/40",
          statText: "text-purple-100",
          tabActive: "text-purple-600",
          tabHover: "hover:text-purple-600",
        };
      default:
        return {
          headerGradient: "from-blue-600 to-indigo-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          badgeBg: "bg-blue-700",
          textColor: "text-blue-700",
          hoverText: "hover:text-blue-700",
          hoverBg: "hover:bg-blue-50",
          statIconBg: "bg-blue-500/30",
          statIconHover: "group-hover:bg-blue-500/40",
          statText: "text-blue-100",
          tabActive: "text-blue-600",
          tabHover: "hover:text-blue-600",
        };
    }
  };

  const theme = getMajorTheme(majorName);

  const myProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case STATUS.PENDING:
        return myProducts.filter((p) => p.status === STATUS.PENDING);
      case STATUS.APPROVED:
        return myProducts.filter((p) => p.status === STATUS.APPROVED);
      case STATUS.REJECTED:
        return myProducts.filter((p) => p.status === STATUS.REJECTED);
      default:
        return myProducts;
    }
  }, [myProducts, activeTab]);

  const stats = useMemo(() => {
    return {
      total: myProducts.length,
      approved: myProducts.filter((p) => p.status === STATUS.APPROVED).length,
      pending: myProducts.filter((p) => p.status === STATUS.PENDING).length,
      rejected: myProducts.filter((p) => p.status === STATUS.REJECTED).length,
    };
  }, [myProducts]);

  useEffect(() => {
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    let step = 0;
    const startStats = { total: 0, approved: 0, pending: 0, rejected: 0 };
    const endStats = stats;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      setAnimatedStats({
        total: Math.floor(
          startStats.total + (endStats.total - startStats.total) * progress,
        ),
        approved: Math.floor(
          startStats.approved +
            (endStats.approved - startStats.approved) * progress,
        ),
        pending: Math.floor(
          startStats.pending +
            (endStats.pending - startStats.pending) * progress,
        ),
        rejected: Math.floor(
          startStats.rejected +
            (endStats.rejected - startStats.rejected) * progress,
        ),
      });
      if (progress === 1) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [stats]);

  const handleViewDetail = (id) => {
    navigate("/product-detail", { state: { productId: id } });
  };

  const handleEdit = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case STATUS.APPROVED:
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          badgeBg: "bg-emerald-100",
          badgeText: "text-emerald-700",
          label: "Đã duyệt",
        };
      case STATUS.PENDING:
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          badgeBg: "bg-amber-100",
          badgeText: "text-amber-700",
          label: "Chờ duyệt",
        };
      case STATUS.REJECTED:
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          border: "border-rose-200",
          badgeBg: "bg-rose-100",
          badgeText: "text-rose-700",
          label: "Từ chối",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-700",
          label: "Không xác định",
        };
    }
  };

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Có lỗi xảy ra</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Màu theo từng ngành */}
      <div className={`bg-gradient-to-r ${theme.headerGradient} shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between md:justify-start">
              <button
                onClick={() => navigate("/upload-product")}
                className={`px-5 py-2.5 ${theme.buttonBg} text-white rounded-xl transition-all duration-200 flex items-center gap-2 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transform`}
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium">Đăng sản phẩm mới</span>
              </button>
              <div className="md:hidden ml-4">
                <UserDropdown />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <h1 className="text-xl font-bold text-white">
                  {currentStudent.name ?? ""}
                </h1>
                <p className={`${theme.statText} text-sm mt-0.5`}>
                  {majorName ?? ""}
                </p>
                <p className="text-white/60 text-xs mt-0.5">
                  {currentStudent.email ?? ""}
                </p>
              </div>
              <UserDropdown />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div
              onClick={() => setActiveTab("all")}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme.statText} text-sm font-medium mb-1`}>
                    Tổng sản phẩm
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {animatedStats.total}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab(STATUS.PENDING)}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme.statText} text-sm font-medium mb-1`}>
                    Chờ duyệt
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {animatedStats.pending}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
            </div>

            <div
              onClick={() => setActiveTab(STATUS.APPROVED)}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme.statText} text-sm font-medium mb-1`}>
                    Đã duyệt
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {animatedStats.approved}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
            </div>

            <div
              onClick={() => setActiveTab(STATUS.REJECTED)}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme.statText} text-sm font-medium mb-1`}>
                    Từ chối
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {animatedStats.rejected}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mt-8 border-b border-white/20">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
                activeTab === "all"
                  ? `bg-white ${theme.tabActive} shadow-lg`
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab(STATUS.PENDING)}
              className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
                activeTab === STATUS.PENDING
                  ? `bg-white ${theme.tabActive} shadow-lg`
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Chờ duyệt ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab(STATUS.APPROVED)}
              className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
                activeTab === STATUS.APPROVED
                  ? `bg-white ${theme.tabActive} shadow-lg`
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Đã duyệt ({stats.approved})
            </button>
            <button
              onClick={() => setActiveTab(STATUS.REJECTED)}
              className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
                activeTab === STATUS.REJECTED
                  ? `bg-white ${theme.tabActive} shadow-lg`
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Từ chối ({stats.rejected})
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => {
            const statusStyle = getStatusStyle(item.status);
            return (
              <div
                key={item.product_id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-300"
              >
                <div
                  onClick={() => handleViewDetail(item.product_id)}
                  className="relative h-44 cursor-pointer overflow-hidden bg-slate-100"
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-md ${statusStyle.badgeBg} ${statusStyle.badgeText}`}
                    >
                      {statusStyle.label}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-md ${theme.badgeBg} text-white shadow-sm`}
                    >
                      {majorName || "CNTT"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-end mb-2">
                    <span className="text-xs text-slate-400">
                      {item.submitted_at
                        ? new Date(item.submitted_at).toLocaleDateString(
                            "vi-VN",
                          )
                        : ""}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleViewDetail(item.product_id)}
                    className={`font-semibold text-slate-800 mb-2 line-clamp-1 cursor-pointer ${theme.hoverText} transition`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                    {item.description || "Chưa có mô tả"}
                  </p>

                  <div className="mb-3">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-slate-100 text-slate-600">
                      {item.category_name || "Sản phẩm"}
                    </span>
                  </div>

                  {item.status === "approved" && (
                    <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5"
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
                        {item.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {item.likes ?? 0}
                      </span>
                    </div>
                  )}

                  {item.feedback && (
                    <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Phản hồi:</span>{" "}
                        {item.feedback}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button
                      onClick={() => handleViewDetail(item.product_id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 ${theme.hoverBg} ${theme.hoverText} transition-all duration-200`}
                    >
                      Xem chi tiết
                    </button>

                    {item.status === STATUS.PENDING && (
                      <button
                        onClick={() => handleEdit(item)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 ${theme.hoverBg} ${theme.hoverText} transition-all duration-200`}
                      >
                        Sửa
                      </button>
                    )}

                    {item.status !== STATUS.APPROVED && (
                      <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-500 hover:text-white transition-all duration-200">
                        Xóa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
            <svg
              className="mx-auto h-12 w-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">
              Chưa có sản phẩm
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {activeTab === "pending" &&
                "Bạn chưa có sản phẩm nào đang chờ duyệt."}
              {activeTab === "approved" &&
                "Bạn chưa có sản phẩm nào được duyệt."}
              {activeTab === "rejected" &&
                "Bạn chưa có sản phẩm nào bị từ chối."}
              {activeTab === "all" &&
                "Bắt đầu bằng cách đăng sản phẩm đầu tiên của bạn."}
            </p>
            <button
              onClick={() => navigate("/upload-product")}
              className={`mt-4 px-4 py-2 ${theme.buttonBg} text-white rounded-lg transition`}
            >
              + Đăng sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScreen;
