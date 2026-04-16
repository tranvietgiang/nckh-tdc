import { STATUS } from "../../utils/constants";

export default function ProductCard({ item, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div
        onClick={() => onView(item.product_id)}
        className="relative h-48 cursor-pointer overflow-hidden"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition"
        />

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              item.status === STATUS.APPROVED
                ? "bg-green-100 text-green-800"
                : item.status === STATUS.PENDING
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {item.status === STATUS.APPROVED
              ? "Đã duyệt"
              : item.status === STATUS.PENDING
                ? "Chờ duyệt"
                : "Từ chối"}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between text-sm mb-3">
          <span className="text-xs bg-purple-100 px-2 py-1 rounded">
            {item.category_name || "Chưa phân loại"}
          </span>
          <span className="text-xs text-gray-500">
            {item.submitted_at || ""}
          </span>
        </div>

        {/* nút */}
        <div className="mt-auto flex justify-between">
          <button onClick={() => onView(item.product_id)}>Xem</button>

          <div className="flex gap-2">
            {item.status === STATUS.PENDING && (
              <button onClick={() => onEdit(item)}>Sửa</button>
            )}

            {item.status !== STATUS.APPROVED && (
              <button onClick={() => onDelete(item.product_id, item.title)}>
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
