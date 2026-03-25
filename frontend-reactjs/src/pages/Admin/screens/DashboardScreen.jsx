import React from "react";

const DashboardScreen = () => {
  const stats = {
    totalUsers: 1250,
    totalStudents: 1200,
    totalTeachers: 48,
    totalAdmins: 2,
    totalProducts: 156,
    pendingProducts: 12,
    approvedProducts: 132,
    rejectedProducts: 12,
    totalViews: 45678,
  };

  const recentUsers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@student.tdc.edu.vn",
      role: "student",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      email: "binh.tran@student.tdc.edu.vn",
      role: "student",
      status: "active",
    },
    {
      id: 3,
      name: "ThS. Trần Thị Bình",
      email: "binh.tran@tdc.edu.vn",
      role: "teacher",
      status: "active",
    },
    {
      id: 4,
      name: "Lê Văn Cường",
      email: "cuong.le@student.tdc.edu.vn",
      role: "student",
      status: "inactive",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Nguyễn Văn An",
      action: "đăng sản phẩm mới",
      target: "TaskFlow App",
      time: "5 phút trước",
    },
    {
      id: 2,
      user: "ThS. Trần Thị Bình",
      action: "duyệt sản phẩm",
      target: "TechStore",
      time: "1 giờ trước",
    },
    {
      id: 3,
      user: "Admin",
      action: "cập nhật thông tin",
      target: "chuyên ngành",
      time: "3 giờ trước",
    },
    {
      id: 4,
      user: "Lê Thị Hạnh",
      action: "đăng ký tài khoản",
      target: "sinh viên mới",
      time: "5 giờ trước",
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng người dùng</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-600">SV: {stats.totalStudents}</span>
            <span className="text-purple-600">GV: {stats.totalTeachers}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-xl">📦</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-600">✓ {stats.approvedProducts}</span>
            <span className="text-yellow-600">⏳ {stats.pendingProducts}</span>
            <span className="text-red-600">✗ {stats.rejectedProducts}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lượt xem</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalViews}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-xl">👁️</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            ↑ 12% so với tháng trước
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Chuyên ngành</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-xl">🎓</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            PTPM, KHDL, MMT, TKĐH
          </div>
        </div>
      </div>

      {/* Tables/cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Người dùng gần đây
          </h2>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.role === "student"
                        ? "bg-blue-100 text-blue-600"
                        : user.role === "teacher"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.role === "student"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "teacher"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role === "student"
                      ? "Sinh viên"
                      : user.role === "teacher"
                        ? "Giảng viên"
                        : "Admin"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
            Xem tất cả →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Hoạt động gần đây
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 py-2 border-b last:border-0"
              >
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">
                      {activity.user}
                    </span>
                    <span className="text-gray-600"> {activity.action}</span>
                    <span className="font-medium text-gray-900">
                      {" "}
                      {activity.target}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-sm font-medium">Thêm user mới</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center">
            <span className="text-2xl mb-2 block">📋</span>
            <span className="text-sm font-medium">
              Duyệt sản phẩm ({stats.pendingProducts})
            </span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="text-sm font-medium">Xuất báo cáo</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center">
            <span className="text-2xl mb-2 block">⚙️</span>
            <span className="text-sm font-medium">Cấu hình hệ thống</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
