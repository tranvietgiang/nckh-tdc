import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useTitle from "../hooks/common/useTitle";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import { ROLE } from "../utils/constants";
import BackButton from "../components/common/BackButton";

const ProfileScreen = () => {
  useTitle("Hồ sơ cá nhân");
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    mssv: user?.mssv || "",
    major_name: user?.major_name || "",
    class_name: user?.class_name || "",
  });

  // Reset form data về giá trị ban đầu của user
  const resetFormData = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      mssv: user?.mssv || "",
      major_name: user?.major_name || "",
      class_name: user?.class_name || "",
    });
  };

  const handleEdit = () => {
    resetFormData();
    setIsEditing(true);
  };

  const handleCancel = () => {
    resetFormData();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Call API to update profile
      // await updateProfileAPI(formData);
      setUser({ ...user, ...formData });
      toast.success("Cập nhật hồ sơ thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return { text: "Quản trị viên", color: "purple", icon: "👑" };
      case ROLE.TEACHER:
        return { text: "Giảng viên", color: "blue", icon: "👨‍🏫" };
      case ROLE.STUDENT:
        return { text: "Sinh viên", color: "green", icon: "🎓" };
      default:
        return null; // Không hiển thị gì nếu không có role
    }
  };

  const roleBadge = getRoleBadge();

  const stats = [
    {
      label: "Sản phẩm đã duyệt",
      value: user?.approved_count || 0,
      color: "green",
    },
    {
      label: "Sản phẩm chờ duyệt",
      value: user?.pending_count || 0,
      color: "yellow",
    },
    {
      label: "Sản phẩm từ chối",
      value: user?.rejected_count || 0,
      color: "red",
    },
    {
      label: "Tổng sản phẩm",
      value: user?.total_products || 0,
      color: "purple",
    },
  ];

  const InfoField = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 w-32">{label}</span>
      <span className="text-sm text-gray-900 mt-1 sm:mt-0">{value || "—"}</span>
    </div>
  );

  const EditableField = ({ label, name, type = "text", placeholder }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
      <label className="text-sm font-medium text-gray-500 w-32">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={3}
          className="flex-1 mt-1 sm:mt-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="flex-1 mt-1 sm:mt-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BackButton />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-6 sm:left-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-1">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-14 sm:pt-16 pb-6 px-4 sm:px-8">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  {roleBadge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${roleBadge.color}-100 text-${roleBadge.color}-700`}
                    >
                      {roleBadge.icon} {roleBadge.text}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{user?.email}</p>
                {user?.role === ROLE.STUDENT && user?.mssv && (
                  <p className="text-xs text-gray-400 mt-1">
                    MSSV: {user.mssv}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Hủy
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang lưu...
                        </>
                      ) : (
                        <>
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Lưu thay đổi
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-8 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Thông tin cá nhân
            </h3>
          </div>

          <div className="p-4 sm:p-8">
            {isEditing ? (
              <>
                <EditableField
                  label="Họ tên"
                  name="name"
                  placeholder="Nhập họ tên"
                />
                <EditableField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Nhập email"
                />
                <EditableField
                  label="Số điện thoại"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                />
                <EditableField
                  label="Địa chỉ"
                  name="address"
                  placeholder="Nhập địa chỉ"
                />
                <EditableField
                  label="Giới thiệu"
                  name="bio"
                  type="textarea"
                  placeholder="Giới thiệu về bản thân..."
                />

                {user?.role === ROLE.STUDENT && (
                  <>
                    <EditableField
                      label="MSSV"
                      name="mssv"
                      placeholder="Nhập MSSV"
                    />
                    <EditableField
                      label="Lớp"
                      name="class_name"
                      placeholder="Nhập tên lớp"
                    />
                    <EditableField
                      label="Chuyên ngành"
                      name="major_name"
                      placeholder="Nhập chuyên ngành"
                    />
                  </>
                )}

                {user?.role === ROLE.TEACHER && (
                  <EditableField
                    label="Chuyên ngành"
                    name="major_name"
                    placeholder="Nhập chuyên ngành"
                  />
                )}
              </>
            ) : (
              <>
                <InfoField label="Họ tên" value={user?.name} />
                <InfoField label="Email" value={user?.email} />
                <InfoField label="Số điện thoại" value={user?.phone} />
                <InfoField label="Địa chỉ" value={user?.address} />
                <InfoField label="Giới thiệu" value={user?.bio} />

                {user?.role === ROLE.STUDENT && (
                  <>
                    <InfoField label="MSSV" value={user?.mssv} />
                    <InfoField label="Lớp" value={user?.class_name} />
                    <InfoField label="Chuyên ngành" value={user?.major_name} />
                  </>
                )}

                {user?.role === ROLE.TEACHER && (
                  <InfoField label="Chuyên ngành" value={user?.major_name} />
                )}

                {user?.role === ROLE.ADMIN && (
                  <InfoField label="Vai trò" value="Quản trị viên hệ thống" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Thống kê - chỉ hiển thị cho Teacher và Student */}
        {(user?.role === ROLE.TEACHER || user?.role === ROLE.STUDENT) && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-8 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Thống kê sản phẩm
              </h3>
            </div>
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl p-4`}
                  >
                    <p className={`text-xs font-medium text-${stat.color}-600`}>
                      {stat.label}
                    </p>
                    <p
                      className={`text-2xl font-bold text-${stat.color}-700 mt-1`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Thông tin hệ thống */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-8 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
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
              Thông tin hệ thống
            </h3>
          </div>
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoField
                label="Ngày tham gia"
                value={formatDate(user?.created_at)}
              />
              <InfoField
                label="Lần đăng nhập cuối"
                value={formatDate(user?.last_login)}
              />
              <InfoField
                label="Trạng thái"
                value={
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-700">Hoạt động</span>
                  </span>
                }
              />
              <InfoField label="ID tài khoản" value={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
