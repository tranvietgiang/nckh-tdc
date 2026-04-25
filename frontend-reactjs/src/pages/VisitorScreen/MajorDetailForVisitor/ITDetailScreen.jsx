import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/common/BackButton";
import useImageViewer from "../../../shared/useImageViewer";
import { Icons } from "../../../components/common/Icon";

const ITDetailScreen = ({ product }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tech");
  const [showCode, setShowCode] = useState(false);
  const { openViewer, ImageViewerModal } = useImageViewer();

  const theme = {
    textColor: "#003087",
    bgColor: "#003087",
    lightBg: "#E8EDF5",
    borderColor: "#B8C5D6",
  };

  const majorDetail = product?.major_detail || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageViewerModal />

      <header
        className="sticky top-0 z-50 bg-white border-b shadow-sm"
        style={{ borderColor: theme.borderColor }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <BackButton />
            <div className="flex gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: theme.lightBg,
                  color: theme.textColor,
                }}
              >
                💻 {majorDetail.programming_language || "Fullstack"}
              </span>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded-md text-sm text-white"
                style={{ backgroundColor: theme.bgColor }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tech Stack Dashboard */}
            <div
              className="bg-white rounded-xl p-4 mb-4 shadow-sm border"
              style={{ borderColor: theme.borderColor }}
            >
              <h3 className="font-bold mb-3">🛠️ Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {product.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: theme.lightBg,
                      color: theme.textColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-sm border cursor-pointer"
              onClick={() => openViewer(product.thumbnail)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openViewer(img.image_url)}
                  className="w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0"
                  style={{ borderColor: theme.borderColor }}
                >
                  <img
                    src={img.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Code Preview - Đặc thù CNTT */}
            <div className="mt-4 bg-gray-900 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white text-sm">
                  📝 Code Preview -{" "}
                  {majorDetail.programming_language || "JavaScript"}
                </span>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  {showCode ? "Hide" : "Show"} Code
                </button>
              </div>
              {showCode && (
                <pre className="text-green-400 text-xs overflow-x-auto">
                  {`// ${product.title}
const API = {
  baseURL: '${product.resources?.demo || "/api"}',
  endpoints: {
    getData: '/data',
    postData: '/submit'
  }
};

const Database = {
  type: '${majorDetail.database_used || "PostgreSQL"}',
  framework: '${majorDetail.framework || "Express"}'
};

export default function App() {
  return <div>Welcome to ${product.title}</div>;
}`}
                </pre>
              )}
            </div>

            {/* Tabs */}
            <div
              className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden"
              style={{ borderColor: theme.borderColor }}
            >
              <div
                className="flex border-b"
                style={{ borderColor: theme.borderColor }}
              >
                {[
                  { id: "tech", label: "🛠️ Công nghệ" },
                  { id: "database", label: "🗄️ Database" },
                  { id: "team", label: "👥 Nhóm" },
                  { id: "feedback", label: "💬 Đánh giá" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 font-medium text-sm ${
                      activeTab === tab.id ? "" : "text-gray-500"
                    }`}
                    style={
                      activeTab === tab.id
                        ? {
                            color: theme.textColor,
                            borderBottom: `2px solid ${theme.textColor}`,
                          }
                        : {}
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "tech" && (
                  <div>
                    <h4 className="font-semibold mb-3">
                      ⚙️ Chi tiết công nghệ
                    </h4>
                    <div className="space-y-2">
                      <p>
                        <strong>Ngôn ngữ:</strong>{" "}
                        {majorDetail.programming_language || "TypeScript"}
                      </p>
                      <p>
                        <strong>Framework:</strong>{" "}
                        {majorDetail.framework || "Express"}
                      </p>
                      <p>
                        <strong>Database:</strong>{" "}
                        {majorDetail.database_used || "PostgreSQL"}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "database" && (
                  <div>
                    <h4 className="font-semibold mb-3">🗄️ Cấu trúc Database</h4>
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: theme.lightBg }}
                    >
                      <p className="text-sm">
                        <strong>Hệ quản trị:</strong>{" "}
                        {majorDetail.database_used || "PostgreSQL"}
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Số bảng:</strong> 12
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Relations:</strong> One-to-Many, Many-to-Many
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-3">Sinh viên</h4>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: theme.lightBg }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: theme.bgColor }}
                        >
                          {product.student?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{product.student}</p>
                          <p className="text-xs text-gray-500">
                            {product.studentId}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">GV hướng dẫn</h4>
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: theme.lightBg }}
                      >
                        <p>{product.advisor}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "feedback" && (
                  <div className="space-y-3">
                    {product.feedback?.map((fb, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: theme.lightBg }}
                      >
                        <p className="text-sm italic">"{fb}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div
                className="bg-white rounded-xl shadow-sm border p-5"
                style={{ borderColor: theme.borderColor }}
              >
                <h1 className="text-xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ngành:</span>
                    <span style={{ color: theme.textColor }}>
                      {product.major}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Loại:</span>
                    <span style={{ color: theme.textColor }}>
                      {product.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Năm:</span>
                    <span style={{ color: theme.textColor }}>
                      {product.year}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lượt xem:</span>
                    <span>
                      <Icons.Eye className="inline mr-1" /> {product.views}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Yêu thích:</span>
                    <span>
                      <Icons.Heart className="inline mr-1" /> {product.likes}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    className="flex-1 px-4 py-2 text-white rounded-md text-sm"
                    style={{ backgroundColor: theme.bgColor }}
                  >
                    💻 GitHub
                  </button>
                  <button
                    className="flex-1 px-4 py-2 border rounded-md text-sm"
                    style={{
                      borderColor: theme.borderColor,
                      color: theme.textColor,
                    }}
                  >
                    🚀 Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="mt-12 py-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${theme.bgColor} 0%, #002266 100%)`,
        }}
      >
        <div className="container mx-auto px-4 text-center text-sm">
          © 2025 Trường Cao Đẳng Công Nghệ Thủ Đức
        </div>
      </footer>
    </div>
  );
};

export default ITDetailScreen;
