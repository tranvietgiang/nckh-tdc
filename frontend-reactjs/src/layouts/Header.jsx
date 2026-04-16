// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import UserDropdown from "../shared/UserDropdown";

const DashboardLayout = ({
  title, // e.g., "Giảng viên Dashboard" or "Sinh viên Dashboard"
  subtitle, // optional subtitle shown when collapsed
  user, // { name, email, major? }
  majorName, // major name string
  stats, // array of { label, value, color, onClick, icon? }
  tabs, // array of { key, label, count, color }
  activeTab, // current tab key
  onTabChange, // (tabKey) => void
  searchValue, // search input value
  onSearchChange, // (e) => void
  children, // main page content
}) => {
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);

  // Helper to get color classes for stats
  const getStatColorClasses = (color) => {
    switch (color) {
      case "purple":
        return {
          bg: "from-purple-50 to-purple-50/50",
          text: "text-purple-600",
          value: "text-purple-700",
        };
      case "yellow":
        return {
          bg: "from-yellow-50 to-yellow-50/50",
          text: "text-yellow-600",
          value: "text-yellow-700",
        };
      case "green":
        return {
          bg: "from-green-50 to-green-50/50",
          text: "text-green-600",
          value: "text-green-700",
        };
      case "red":
        return {
          bg: "from-red-50 to-red-50/50",
          text: "text-red-600",
          value: "text-red-700",
        };
      default:
        return {
          bg: "from-gray-50 to-gray-50/50",
          text: "text-gray-600",
          value: "text-gray-700",
        };
    }
  };

  // Helper for tab button colors
  const getTabColorClass = (color, isActive) => {
    if (isActive) {
      switch (color) {
        case "yellow":
          return "bg-yellow-500 text-white";
        case "green":
          return "bg-green-500 text-white";
        case "red":
          return "bg-red-500 text-white";
        default:
          return "bg-blue-500 text-white";
      }
    }
    return "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Always visible top bar */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isHeaderExpanded ? "" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-base font-semibold text-gray-800">
                  {title}
                </h1>
                {!isHeaderExpanded && subtitle && (
                  <p className="text-xs text-gray-400">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-full">
                <div className="w-7 h-7 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-500">{majorName}</span>
                </div>
              </div>
              <UserDropdown />
            </div>
          </div>

          {/* Expandable section: stats + tabs + search */}
          {isHeaderExpanded && (
            <div className="animate-fadeIn pb-4">
              {/* Stats Grid */}
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
                  {stats.map((stat) => {
                    const colorClasses = getStatColorClasses(stat.color);
                    return (
                      <div
                        key={stat.label}
                        className={`bg-gradient-to-r ${colorClasses.bg} rounded-xl p-3 cursor-pointer hover:shadow-md transition-all`}
                        onClick={stat.onClick}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p
                              className={`text-xs font-medium ${colorClasses.text}`}
                            >
                              {stat.label}
                            </p>
                            <p
                              className={`text-xl font-bold mt-0.5 ${colorClasses.value}`}
                            >
                              {stat.value}
                            </p>
                          </div>
                          {stat.icon && (
                            <span className="text-2xl opacity-50">
                              {stat.icon}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tabs and Search */}
              {tabs && tabs.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                  <div className="flex gap-1.5">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`px-4 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 ${getTabColorClass(
                          tab.color,
                          activeTab === tab.key,
                        )}`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      value={searchValue}
                      onChange={onSearchChange}
                      className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs w-56 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                    <svg
                      className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400"
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
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
