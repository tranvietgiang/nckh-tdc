import React, { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../../common/UserDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../hooks/useTitle";
import useMajorName from "../../hooks/useMajorName";
import useProductAll from "../../hooks/useProduct/useProductAll";
import { mapCurrentStudent } from "../../utils/userMapper";
// import { deleteProduct } from "../../services/productService"; // bỏ comment
import { confirmToast } from "../../common/ConfirmToast";

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
  const { products, loading, error, refetch } = useProductAll();
  const currentStudent = mapCurrentStudent(user, majorName);

  const myProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "pending":
        return myProducts.filter((p) => p.status === "pending");
      case "approved":
        return myProducts.filter((p) => p.status === "approved");
      case "rejected":
        return myProducts.filter((p) => p.status === "rejected");
      default:
        return myProducts;
    }
  }, [myProducts, activeTab]);

  const stats = useMemo(() => {
    return {
      total: myProducts.length,
      approved: myProducts.filter((p) => p.status === "approved").length,
      pending: myProducts.filter((p) => p.status === "pending").length,
      rejected: myProducts.filter((p) => p.status === "rejected").length,
    };
  }, [myProducts]);

  // Animated stats effect
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

  // const handleDelete = async (productId, productTitle) => {
  //   const confirmed = await confirmToast({
  //     title: "Xóa sản phẩm",
  //     message: `Bạn có chắc chắn muốn xóa sản phẩm "${productTitle}"? Hành động này không thể hoàn tác.`,
  //     confirmText: "Xóa",
  //     cancelText: "Hủy",
  //     type: "danger",
  //   });
  //   if (confirmed) {
  //     try {
  //       await deleteProduct(productId);
  //       refetch();
  //     } catch (err) {
  //       console.error("Delete failed", err);
  //     }
  //   }
  // };

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Có lỗi xảy ra</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header giữ nguyên như cũ */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/upload-product")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
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
              Đăng sản phẩm mới
            </button>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentStudent.name ?? ""}
                </h1>
                <p className="text-gray-600 mt-1">{majorName ?? ""}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentStudent.email ?? ""}
                </p>
              </div>
              <UserDropdown />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-sm text-blue-600 font-medium">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {animatedStats.total}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                {animatedStats.pending}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {animatedStats.approved}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-sm text-red-600 font-medium">Từ chối</p>
              <p className="text-2xl font-bold text-red-700 mt-1">
                {animatedStats.rejected}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 mt-8 border-b">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === "pending"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Chờ duyệt ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === "approved"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Đã duyệt ({stats.approved})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === "rejected"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Từ chối ({stats.rejected})
            </button>
          </div>
        </div>
      </div>

      {/* Product List - CẢI TIẾN NÚT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div
                onClick={() => handleViewDetail(item.product_id)}
                className="relative h-48 cursor-pointer overflow-hidden"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status === "approved"
                      ? "Đã duyệt"
                      : item.status === "pending"
                        ? "Chờ duyệt"
                        : "Từ chối"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {item.category_name || "Chưa phân loại"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {item.submitted_at || ""}
                  </span>
                </div>

                {item.status === "approved" && (
                  <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                    <div className="flex items-center gap-1">
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
                    </div>
                    <div className="flex items-center gap-1">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {item.likes ?? 0}
                    </div>
                  </div>
                )}

                {item.feedback && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-800">
                      <span className="font-semibold">Phản hồi:</span>{" "}
                      {item.feedback}
                    </p>
                  </div>
                )}

                {/* ========== CẢI TIẾN NÚT ========== */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <button
                    onClick={() => handleViewDetail(item.product_id)}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Xem chi tiết
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Sửa
                    </button>
                    <button
                      // onClick={() => handleDelete(item.product_id, item.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Chưa có sản phẩm
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "pending" &&
                "Bạn chưa có sản phẩm nào đang chờ duyệt."}
              {activeTab === "approved" &&
                "Bạn chưa có sản phẩm nào được duyệt."}
              {activeTab === "rejected" &&
                "Bạn chưa có sản phẩm nào bị từ chối."}
              {activeTab === "all" &&
                "Bắt đầu bằng cách đăng sản phẩm đầu tiên của bạn."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScreen;
