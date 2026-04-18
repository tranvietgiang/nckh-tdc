import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../hooks/common/useTitle";
import useMajorName from "../../hooks/common/useMajorName";
import useProductAll from "../../hooks/useProduct/useProductAll";
import { useStudentStats } from "../../hooks/student/useStudentStats";
import { mapCurrentStudent } from "../../utils/userMapper";
import StudentHeader from "../../components/student/StudentHeader";
import ProductCard from "../../components/student/ProductCard";
import { STATUS } from "../../utils/constants";

const getMajorTheme = (majorId) => {
  switch (Number(majorId)) {
    case 1:
      return {
        headerGradient: "from-blue-600 to-indigo-600",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        badgeBg: "bg-blue-700",
        textColor: "text-blue-700",
        hoverText: "hover:text-blue-700",
        hoverBg: "hover:bg-blue-50",
        statIconBg: "bg-blue-500/30",
        statIconHover: "group-hover:bg-blue-500/40",
        statText: "text-blue-100",
        tabActive: "text-blue-600",
        tabHover: "hover:text-blue-600",
      };
    case 2:
      return {
        headerGradient: "from-rose-600 to-orange-600",
        buttonBg: "bg-rose-600 hover:bg-rose-700",
        badgeBg: "bg-rose-700",
        textColor: "text-rose-700",
        hoverText: "hover:text-rose-700",
        hoverBg: "hover:bg-rose-50",
        statIconBg: "bg-rose-500/30",
        statIconHover: "group-hover:bg-rose-500/40",
        statText: "text-rose-100",
        tabActive: "text-rose-600",
        tabHover: "hover:text-rose-600",
      };
    case 3:
      return {
        headerGradient: "from-cyan-700 to-blue-800",
        buttonBg: "bg-cyan-700 hover:bg-cyan-800",
        badgeBg: "bg-cyan-800",
        textColor: "text-cyan-700",
        hoverText: "hover:text-cyan-700",
        hoverBg: "hover:bg-cyan-50",
        statIconBg: "bg-cyan-500/30",
        statIconHover: "group-hover:bg-cyan-500/40",
        statText: "text-cyan-100",
        tabActive: "text-cyan-600",
        tabHover: "hover:text-cyan-600",
      };
    case 4:
      return {
        headerGradient: "from-purple-700 to-indigo-800",
        buttonBg: "bg-purple-700 hover:bg-purple-800",
        badgeBg: "bg-purple-800",
        textColor: "text-purple-700",
        hoverText: "hover:text-purple-700",
        hoverBg: "hover:bg-purple-50",
        statIconBg: "bg-purple-500/30",
        statIconHover: "group-hover:bg-purple-500/40",
        statText: "text-purple-100",
        tabActive: "text-purple-600",
        tabHover: "hover:text-purple-600",
      };
    default:
      return {
        headerGradient: "from-blue-600 to-indigo-600",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        badgeBg: "bg-blue-700",
        textColor: "text-blue-700",
        hoverText: "hover:text-blue-700",
        hoverBg: "hover:bg-blue-50",
        statIconBg: "bg-blue-500/30",
        statIconHover: "group-hover:bg-blue-500/40",
        statText: "text-blue-100",
        tabActive: "text-blue-600",
        tabHover: "hover:text-blue-600",
      };
  }
};

const StudentScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  useTitle("Trang chủ sinh viên");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { majorName } = useMajorName(user?.major_id);
  const { products, loading, error } = useProductAll();
  const currentStudent = mapCurrentStudent(user, majorName);
  const theme = getMajorTheme(user?.major_id);

  const productsArray = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products],
  );
  const { stats, animatedStats, filteredProducts } = useStudentStats(
    productsArray,
    activeTab,
  );

  const handleViewDetail = (id) => {
    navigate("/product-detail", { state: { productId: id } });
  };

  const handleEdit = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      // Gọi API xóa ở đây
      console.log("Xóa sản phẩm:", id);
    }
  };

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Có lỗi xảy ra</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentHeader
        majorName={majorName}
        currentStudent={currentStudent}
        stats={stats}
        animatedStats={animatedStats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onUploadClick={() => navigate("/upload-product")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.product_id}
              product={item}
              majorName={majorName}
              theme={theme}
              onViewDetail={handleViewDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
            <svg
              className="mx-auto h-12 w-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">
              Chưa có sản phẩm
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {activeTab === STATUS.PENDING &&
                "Bạn chưa có sản phẩm nào đang chờ duyệt."}
              {activeTab === STATUS.APPROVED &&
                "Bạn chưa có sản phẩm nào được duyệt."}
              {activeTab === STATUS.REJECTED &&
                "Bạn chưa có sản phẩm nào bị từ chối."}
              {activeTab === "all" &&
                "Bắt đầu bằng cách đăng sản phẩm đầu tiên của bạn."}
            </p>
            <button
              onClick={() => navigate("/upload-product")}
              className={`mt-4 px-4 py-2 ${theme.buttonBg} text-white rounded-lg transition`}
            >
              + Đăng sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScreen;
