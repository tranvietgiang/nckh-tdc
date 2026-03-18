import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useProductDetail from "../../hooks/useProductDetail";

const ProductDetailScreen = () => {
  const { state } = useLocation();
  const id = state?.productId;

  const { product, loading, error } = useProductDetail(id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  console.log("id:", id);
  console.log("product:", product);

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
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition"
          >
            <svg
              className="w-8 h-8"
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

          <div
            className="relative max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage?.image_url}
              alt="Product"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm">
            <a
              href="/"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Trang chủ
            </a>
            <span className="text-gray-400">›</span>
            <a
              href="/products"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Sản phẩm
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium truncate">
              {product.title}
            </span>
          </nav>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : product.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status === "approved"
                      ? "Đã duyệt"
                      : product.status === "pending"
                        ? "Chờ duyệt"
                        : "Từ chối"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {product.major?.major_name}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                    {product.category?.name}
                  </span>
                  <span className="text-gray-500">
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(product.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-1">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {product.activity_logs?.views || 0} lượt xem
                </span>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {product.activity_logs?.shares || 0} lượt chia sẻ
                </span>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {product.activity_logs?.downloads || 0} lượt tải
                </span>
              </div>
            </div>

            {product.status === "approved" && product.approved_by_user && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
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
                <span className="text-sm text-green-800">
                  Đã được duyệt bởi {product.approved_by_user.fullname} vào ngày{" "}
                  {new Date(product.approved_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h2>

              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images?.[0]?.image_url || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                  onClick={() =>
                    setSelectedImage(
                      product.images?.[0] || { image_url: product.thumbnail },
                    )
                  }
                />
              </div>

              {product.images?.length > 1 && (
                <div className="grid grid-cols-5 gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={img.product_image_id || index}
                      onClick={() => setSelectedImage(img)}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition"
                    >
                      <img
                        src={img.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-3 font-medium text-sm transition ${
                      activeTab === "overview"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab("files")}
                    className={`px-6 py-3 font-medium text-sm transition ${
                      activeTab === "files"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Files đính kèm ({product.files?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-3 font-medium text-sm transition ${
                      activeTab === "reviews"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Đánh giá từ giảng viên ({product.reviews?.length || 0})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}

                {activeTab === "files" && (
                  <div className="space-y-4">
                    {product.files?.length > 0 ? (
                      product.files.map((file) => {
                        const fileName = file.file_url.split("/").pop();
                        const fileExt =
                          file.file_type?.toUpperCase() ||
                          fileName.split(".").pop().toUpperCase();

                        return (
                          <div
                            key={file.product_file_id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                                {fileExt}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {fileName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Ngày tải lên:{" "}
                                  {new Date(file.created_at).toLocaleDateString(
                                    "vi-VN",
                                  )}
                                </p>
                              </div>
                            </div>
                            <a
                              href={file.file_url}
                              download
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                            >
                              Tải xuống
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        Chưa có file đính kèm
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {product.reviews?.length > 0 ? (
                      product.reviews.map((review) => (
                        <div
                          key={review.review_id}
                          className="border-b last:border-0 pb-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.teacher?.fullname?.charAt(0) || "G"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {review.teacher?.fullname}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Giảng viên
                                  </p>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    review.created_at,
                                  ).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-2">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        Chưa có đánh giá từ giảng viên
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin tác giả</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {product.user_id?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {product.user_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.major?.major_name}
                  </p>
                </div>
              </div>
            </div>

            {product.tags?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Công nghệ sử dụng
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.tag_id}
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm"
                    >
                      #{tag.tag_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Liên kết</h2>
              <div className="space-y-3">
                {product.github_link && (
                  <a
                    href={product.github_link}
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
                    <span className="flex-1 text-sm font-medium">
                      GitHub Repository
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

                {product.demo_link && (
                  <a
                    href={product.demo_link}
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
                    <span className="flex-1 text-sm font-medium">Xem Demo</span>
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

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin thêm</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày đăng:</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(product.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cập nhật cuối:</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(product.updated_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                {product.approved_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ngày duyệt:</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(product.approved_at).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
