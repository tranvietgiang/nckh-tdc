import React, { useMemo, useState } from "react";
import UserTable from "./components/UserTable";
import CreateUserModal from "./components/CreateUserModal";
import UserStats from "./components/UserStats";
import {
  initialFormData,
  validateUserForm,
  filterUsers,
} from "./utils/userManagerHelpers";

const UsersScreen = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([
    {
      user_id: "SV2023001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@student.tdc.edu.vn",
      role: "student",
      class: "DHKTPM18A",
      major_id: 1,
      major_name: "Phát triển phần mềm",
      avatar: null,
      created_at: "2024-01-15",
    },
    {
      user_id: "SV2023002",
      name: "Trần Thị Bình",
      email: "binh.tran@student.tdc.edu.vn",
      role: "student",
      class: "DHKTPM19B",
      major_id: 1,
      major_name: "Phát triển phần mềm",
      avatar: null,
      created_at: "2024-01-16",
    },
    {
      user_id: "GV2023001",
      name: "ThS. Trần Thị Bình",
      email: "binh.tran@tdc.edu.vn",
      role: "teacher",
      class: null,
      major_id: 2,
      major_name: "Khoa học dữ liệu",
      avatar: null,
      created_at: "2024-01-10",
    },
    {
      user_id: "GV2023002",
      name: "TS. Nguyễn Văn Phúc",
      email: "phuc.nguyen@tdc.edu.vn",
      role: "teacher",
      class: null,
      major_id: 1,
      major_name: "Phát triển phần mềm",
      avatar: null,
      created_at: "2024-01-10",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const majors = [
    { id: 1, name: "Phát triển phần mềm", code: "PTPM" },
    { id: 2, name: "Khoa học dữ liệu", code: "KHDL" },
    { id: 3, name: "Mạng máy tính", code: "MMT" },
    { id: 4, name: "Thiết kế đồ họa", code: "TKĐH" },
  ];

  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchTerm, filter);
  }, [users, searchTerm, filter]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleCloseModal = () => {
    if (loading) return;
    setShowCreateModal(false);
    resetForm();
  };

  const openCreateModal = (role) => {
    setFormData({ ...initialFormData, role });
    setErrors({});
    setShowCreateModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const major = majors.find((m) => m.id === Number(formData.major_id));

      const newUser = {
        user_id: formData.user_id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        class: formData.role === "student" ? formData.class : null,
        major_id: Number(formData.major_id),
        major_name: major?.name || "",
        avatar: null,
        created_at: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [newUser, ...prev]);
      setLoading(false);
      setShowCreateModal(false);
      resetForm();

      alert(
        `✅ Tạo ${formData.role === "student" ? "sinh viên" : "giảng viên"} thành công!`,
      );
    }, 1000);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${userId}?`)) {
      setUsers((prev) => prev.filter((user) => user.user_id !== userId));
      alert("✅ Xóa người dùng thành công!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý người dùng
            </h1>
            <p className="text-gray-600 mt-1">
              Thêm, sửa, xóa tài khoản sinh viên và giảng viên
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => openCreateModal("student")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
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
              Thêm sinh viên
            </button>

            <button
              onClick={() => openCreateModal("teacher")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
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
              Thêm giảng viên
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="Tìm kiếm theo mã, tên, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>

              <button
                onClick={() => setFilter("student")}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "student"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sinh viên
              </button>

              <button
                onClick={() => setFilter("teacher")}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "teacher"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Giảng viên
              </button>
            </div>
          </div>
        </div>

        <UserTable users={filteredUsers} onDelete={handleDeleteUser} />

        <UserStats users={users} />

        <CreateUserModal
          open={showCreateModal}
          formData={formData}
          errors={errors}
          majors={majors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleCreateUser}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default UsersScreen;
