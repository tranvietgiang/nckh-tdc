import UserDropdown from "../../shared/UserDropdown";
import { STATUS } from "../../utils/constants";

const StudentHeader = ({
  majorName,
  currentStudent,
  stats,
  animatedStats,
  activeTab,
  setActiveTab,
  theme,
  onUploadClick,
}) => {
  return (
    <div className={`bg-gradient-to-r ${theme.headerGradient} shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between md:justify-start">
            <button
              onClick={onUploadClick}
              className={`px-5 py-2.5 ${theme.buttonBg} text-white rounded-xl transition-all duration-200 flex items-center gap-2 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transform`}
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
              <span className="font-medium">Đăng sản phẩm mới</span>
            </button>
            <div className="md:hidden ml-4">
              <UserDropdown />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">
                {currentStudent.name ?? ""}
              </h1>
              <p className={`${theme.statText} text-sm mt-0.5`}>
                {majorName ?? ""}
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                {currentStudent.email ?? ""}
              </p>
            </div>
            <UserDropdown />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div
            onClick={() => setActiveTab("all")}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.statText} text-sm font-medium mb-1`}>
                  Tổng sản phẩm
                </p>
                <p className="text-3xl font-bold text-white">
                  {animatedStats.total}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab(STATUS.PENDING)}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.statText} text-sm font-medium mb-1`}>
                  Chờ duyệt
                </p>
                <p className="text-3xl font-bold text-white">
                  {animatedStats.pending}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
              >
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab(STATUS.APPROVED)}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.statText} text-sm font-medium mb-1`}>
                  Đã duyệt
                </p>
                <p className="text-3xl font-bold text-white">
                  {animatedStats.approved}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
              >
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab(STATUS.REJECTED)}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.statText} text-sm font-medium mb-1`}>
                  Từ chối
                </p>
                <p className="text-3xl font-bold text-white">
                  {animatedStats.rejected}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${theme.statIconBg} rounded-2xl flex items-center justify-center ${theme.statIconHover} transition`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mt-8 border-b border-white/20">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
              activeTab === "all"
                ? `bg-white ${theme.tabActive} shadow-lg`
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Tất cả ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab(STATUS.PENDING)}
            className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
              activeTab === STATUS.PENDING
                ? `bg-white ${theme.tabActive} shadow-lg`
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Chờ duyệt ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab(STATUS.APPROVED)}
            className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
              activeTab === STATUS.APPROVED
                ? `bg-white ${theme.tabActive} shadow-lg`
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Đã duyệt ({stats.approved})
          </button>
          <button
            onClick={() => setActiveTab(STATUS.REJECTED)}
            className={`px-5 py-2.5 font-medium text-sm rounded-t-xl transition-all duration-200 ${
              activeTab === STATUS.REJECTED
                ? `bg-white ${theme.tabActive} shadow-lg`
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Từ chối ({stats.rejected})
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
