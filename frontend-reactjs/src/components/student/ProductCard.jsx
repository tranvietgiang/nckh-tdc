import { STATUS } from "../../utils/constants";

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

const ProductCard = ({
  product,
  majorName,
  theme,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  const statusStyle = getStatusStyle(product.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-300">
      <div
        onClick={() => onViewDetail(product.product_id)}
        className="relative h-44 cursor-pointer overflow-hidden bg-slate-100"
      >
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
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
            {product.submitted_at
              ? new Date(product.submitted_at).toLocaleDateString("vi-VN")
              : ""}
          </span>
        </div>

        <h3
          onClick={() => onViewDetail(product.product_id)}
          className={`font-semibold text-slate-800 mb-2 line-clamp-1 cursor-pointer ${theme.hoverText} transition`}
        >
          {product.title}
        </h3>

        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
          {product.description || "Chưa có mô tả"}
        </p>

        <div className="mb-3">
          <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-slate-100 text-slate-600">
            {product.category_name || "Sản phẩm"}
          </span>
        </div>

        {product.status === "approved" && (
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
              {product.views ?? 0}
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
              {product.likes ?? 0}
            </span>
          </div>
        )}

        {product.feedback && (
          <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border-l-4 border-slate-300">
            <p className="text-xs text-slate-600">
              <span className="font-medium">Phản hồi:</span> {product.feedback}
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={() => onViewDetail(product.product_id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 ${theme.hoverBg} ${theme.hoverText} transition-all duration-200`}
          >
            Xem chi tiết
          </button>

          {product.status === STATUS.PENDING && (
            <button
              onClick={() => onEdit(product)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 ${theme.hoverBg} ${theme.hoverText} transition-all duration-200`}
            >
              Sửa
            </button>
          )}

          {product.status !== STATUS.APPROVED && (
            <button
              onClick={() => onDelete(product.product_id)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-500 hover:text-white transition-all duration-200"
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
