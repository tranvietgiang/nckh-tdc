import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../../common/UserDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../hooks/useTitle";
import useMajorName from "../../hooks/useMajorName";
import useProductAll from "../../hooks/useProduct/useProductAll";
import { mapCurrentStudent } from "../../utils/userMapper";
const StudentScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  useTitle("Trang chủ sinh viên");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const { products, loading, error } = useProductAll();
  const currentStudent = mapCurrentStudent(user, majorName);
  console.log(products);

  const handleViewDetail = (id) => {
    navigate("/product-detail", { state: { productId: id } });
  };

  // const currentStudent = {
  //   id: user?.user_id,
  //   name: user?.name,
  //   email: user?.email,
  //   major: majorName,
  //   avatar: null,
  // };

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

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Có lỗi xảy ra</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {stats.total}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {stats.approved}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                {stats.pending}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-600 font-medium">Từ chối</p>
              <p className="text-2xl font-bold text-red-700 mt-1">
                {stats.rejected}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div
                onClick={() => handleViewDetail(item.product_id)}
                className="relative h-48 cursor-pointer"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
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

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
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
                    <div>{item.views ?? 0} lượt xem</div>
                    <div>{item.likes ?? 0} lượt thích</div>
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

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleViewDetail(item.product_id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Xem chi tiết
                  </button>
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
