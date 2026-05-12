import React, { useRef, useState } from "react";
import UserDropdown from "../shared/UserDropdown";
import useClickOutside from "../hooks/common/useClickOutside";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "users", label: "Quản lý người dùng", icon: "👥" },
  { key: "products", label: "Quản lý sản phẩm", icon: "📦" },
  { key: "majors", label: "Quản lý chuyên ngành", icon: "🎓" },
  { key: "settings", label: "Cài đặt hệ thống", icon: "⚙️" },
];

const AdminLayout = ({ activeSection, setActiveSection, title, children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const closeDropdownRef = useRef(null);

  useClickOutside(closeDropdownRef, () => {
    setShowMobileMenu(false);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">Khoa CNTT - TDC</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-800 transition flex items-center gap-3 ${
                activeSection === item.key
                  ? "bg-gray-800 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <div className="relative lg:hidden" ref={closeDropdownRef}>
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    Menu
                  </button>

                  {showMobileMenu && (
                    <div className="absolute right-0 mt-2 w-60 bg-white border rounded-xl shadow-lg z-50">
                      <div className="p-2">
                        {menuItems.map((item) => (
                          <button
                            key={item.key}
                            onClick={() => {
                              setActiveSection(item.key);
                              setShowMobileMenu(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 ${
                              activeSection === item.key
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            <span className="mr-2">{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <UserDropdown />
              </div>
            </div>
          </div>

          {/* Nội dung page */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
