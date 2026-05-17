import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { Icons } from "../../components/common/Icon";

export default function CompareProductAi() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentProduct, matches = [] } = location.state || {};

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Đã duyệt",
        icon: "CheckCircle",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Chờ duyệt",
        icon: "Clock",
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Từ chối",
        icon: "AlertCircle",
      },
    };

    return statusMap[status] || statusMap.pending;
  };

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <Icons.AlertCircle className="text-red-600" />
            <p className="text-red-700">lỗi khi tải data</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <Icons.ChevronLeft />
            Quay lại
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            So sánh sản phẩm AI
          </h1>
          <p className="text-gray-600">
            Hiển thị các sản phẩm có cùng mô hình, framework và ngôn ngữ lập
            trình
          </p>
        </div>

        {/* Current Product */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sản phẩm của bạn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Sản phẩm</p>
              <p className="font-semibold">{currentProduct.title}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Model</p>
              <p className="font-semibold">
                {currentProduct.ai_detail?.model_used || "Chưa cập nhật"}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Framework</p>
              <p className="font-semibold">
                {currentProduct.ai_detail?.framework || "Chưa cập nhật"}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Ngôn ngữ</p>
              <p className="font-semibold">
                {currentProduct.ai_detail?.language || "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div>
          {matches.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sản phẩm tương tự ({matches.length})
              </h2>

              <div className="space-y-4">
                {matches.map((product) => {
                  const statusConfig = getStatusBadge(product.status);

                  return (
                    <div
                      key={product.product_id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* LEFT */}
                        <div className="md:col-span-4 space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{product.title}</h3>
                            <span
                              className={`px-2 py-1 rounded text-xs ${statusConfig.bg} ${statusConfig.text}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500">
                            {product.description}
                          </p>

                          <div className="text-sm">
                            <div>Tác giả: {product.fullname}</div>
                            <div>Ngày: {formatDate(product.created_at)}</div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs">Model</p>
                            <p className="font-semibold text-sm">
                              {product.model_used || "N/A"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs">Framework</p>
                            <p className="font-semibold text-sm">
                              {product.framework || "N/A"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs">Language</p>
                            <p className="font-semibold text-sm">
                              {product.language || "N/A"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs">Dataset</p>
                            <p className="font-semibold text-sm">
                              {product.dataset_used || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-white p-10 text-center rounded-xl">
              <Icons.Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold">
                Không tìm thấy sản phẩm tương tự
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
