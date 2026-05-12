import React from "react";

const inputClass = (hasError) =>
  `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

const CreateUserModal = ({
  open,
  formData,
  errors,
  majors,
  loading,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {formData.role === "student"
                ? "Thêm sinh viên mới"
                : "Thêm giảng viên mới"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã {formData.role === "student" ? "sinh viên" : "giảng viên"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={onChange}
              placeholder={
                formData.role === "student" ? "SV2023001" : "GV2023001"
              }
              className={inputClass(errors.user_id)}
            />
            {errors.user_id && (
              <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className={inputClass(errors.password)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={onChange}
              className={inputClass(errors.password_confirmation)}
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {formData.role === "student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lớp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={onChange}
                placeholder="VD: DHKTPM18A"
                className={inputClass(errors.class)}
              />
              {errors.class && (
                <p className="mt-1 text-sm text-red-600">{errors.class}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chuyên ngành <span className="text-red-500">*</span>
            </label>
            <select
              name="major_id"
              value={formData.major_id}
              onChange={onChange}
              className={inputClass(errors.major_id)}
            >
              <option value="">-- Chọn chuyên ngành --</option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name} ({major.code})
                </option>
              ))}
            </select>
            {errors.major_id && (
              <p className="mt-1 text-sm text-red-600">{errors.major_id}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
