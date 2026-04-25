import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { getMajorTheme } from "../../utils/uploadProductScreen/uploadRegistry";
import useMajorName from "../../hooks/common/useMajorName";
import useImageViewer from "../../shared/useImageViewer";
import { Icons } from "../../components/common/Icon";

const VisitorDetailScreen = () => {
  const { state } = useLocation();
  const id = state?.productId;
  console.log(id);

  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { majorName } = useMajorName(product?.major_id);
  const theme = getMajorTheme(majorName);
  const { openViewer, ImageViewerModal } = useImageViewer();

  // Lấy màu sắc từ theme
  const primaryColor = theme?.textColor || "text-blue-700";
  const primaryBg = theme?.buttonBg || "bg-blue-600 hover:bg-blue-700";
  const primaryLight = theme?.light || "bg-blue-50";
  const primaryGradient = theme?.gradient || "from-blue-600 to-indigo-600";
  const primaryBorder = theme?.border || "border-blue-200";
  const tabActiveColor = theme?.tabActive || "text-blue-600";

  // Mock data cho 4 ngành
  const mockProducts = {
    1: {
      // CNTT
      id: 1,
      title: "Hệ thống quản lý thực tập doanh nghiệp thông minh",
      description:
        "Nền tảng kết nối sinh viên với doanh nghiệp, theo dõi tiến độ thực tập và đánh giá kết quả tự động",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      images: [
        {
          product_image_id: 1,
          image_url:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        },
        {
          product_image_id: 2,
          image_url:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        },
        {
          product_image_id: 3,
          image_url:
            "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=450&fit=crop",
        },
      ],
      year: "2024",
      student: "Nguyễn Minh Tuấn",
      studentId: "10221001",
      class: "CNTTK19",
      major_id: 1,
      major: "Công nghệ thông tin",
      type: "Đồ án tốt nghiệp",
      views: 1247,
      likes: 89,
      advisor: "TS. Lê Văn Hoàng",
      collaborators: ["Trần Văn Bình", "Lê Thị Lan"],
      technologies: ["ReactJS", "Spring Boot", "PostgreSQL", "Docker", "Redis"],
      github: "https://github.com/tdc/internship-management",
      demo: "https://demo.tdc.edu.vn/internship",
      awards: [
        "🏆 Giải Nhất NCKH sinh viên cấp trường 2024",
        "🎖️ Top 10 Sản phẩm công nghệ xuất sắc",
      ],
      feedback: [
        {
          name: "TS. Lê Văn Hoàng",
          role: "Giảng viên hướng dẫn",
          content:
            "Sản phẩm có tính ứng dụng cao, giải quyết tốt bài toán thực tế",
        },
        {
          name: "PGS.TS. Trần Quang Huy",
          role: "Trưởng khoa",
          content: "Giải pháp tiềm năng cho nhà trường",
        },
      ],
    },
    // 2: {
    //   // AI
    //   id: 2,
    //   title: "Trợ lý ảo AI hỗ trợ học tập thông minh",
    //   description:
    //     "Chatbot sử dụng NLP và Machine Learning để trả lời câu hỏi, gợi ý tài liệu học tập cho sinh viên",
    //   thumbnail:
    //     "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    //   images: [
    //     {
    //       product_image_id: 1,
    //       image_url:
    //         "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    //     },
    //     {
    //       product_image_id: 2,
    //       image_url:
    //         "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop",
    //     },
    //     {
    //       product_image_id: 3,
    //       image_url:
    //         "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=450&fit=crop",
    //     },
    //   ],
    //   year: "2024",
    //   student: "Trần Thảo Vy",
    //   studentId: "10221045",
    //   class: "AIK20",
    //   major_id: 2,
    //   major: "Trí tuệ nhân tạo",
    //   type: "Đồ án tốt nghiệp",
    //   views: 2103,
    //   likes: 156,
    //   advisor: "TS. Nguyễn Thị Minh",
    //   score: 9.5,
    //   collaborators: ["Lê Hoàng Nam", "Phạm Thị Hà"],
    //   technologies: ["Python", "TensorFlow", "BERT", "FastAPI", "MongoDB"],
    //   github: "https://github.com/tdc/ai-assistant",
    //   demo: "https://ai-assistant.tdc.edu.vn",
    //   awards: [
    //     "🏆 Giải Nhất Sinh viên Nghiên cứu Khoa học 2024",
    //     "🎖️ Giải Ba Cuộc thi Khởi nghiệp Công nghệ",
    //   ],
    //   feedback: [
    //     {
    //       name: "TS. Nguyễn Thị Minh",
    //       role: "Giảng viên hướng dẫn",
    //       content:
    //         "Sản phẩm AI xuất sắc, có tiềm năng phát triển thành ứng dụng thực tế",
    //     },
    //     {
    //       name: "PGS.TS. Lê Hoàng Long",
    //       role: "Phó Trưởng khoa",
    //       content: "Giải pháp hỗ trợ học tập hiệu quả",
    //     },
    //   ],
    // },
    // 3: {
    //   // Mạng máy tính
    //   id: 3,
    //   title: "Hệ thống giám sát an ninh mạng thông minh",
    //   description:
    //     "IDS/IPS phát hiện và ngăn chặn tấn công mạng, bảo vệ hệ thống đào tạo trực tuyến",
    //   fullDescription: `
    //     ## 📌 Tổng quan dự án

    //     Hệ thống giám sát an ninh mạng sử dụng Machine Learning để phát hiện các cuộc tấn công DDoS, xâm nhập trái phép.

    //     ## 🎯 Mục tiêu
    //     - Phát hiện tấn công mạng theo thời gian thực
    //     - Tự động chặn IP độc hại
    //     - Báo cáo phân tích lưu lượng mạng
    //     - Tích hợp với hệ thống cảnh báo

    //     ## 🛠️ Công nghệ sử dụng
    //     - Frontend: ReactJS, Chart.js
    //     - Backend: Node.js, Express
    //     - Machine Learning: Python, Scikit-learn
    //     - Network: Snort, Wireshark, Zeek

    //     ## 📊 Kết quả đạt được
    //     - Phát hiện 99.5% tấn công
    //     - Xử lý 1,000,000+ gói tin/giây
    //     - Giảm 80% thời gian phản ứng
    //   `,
    //   thumbnail:
    //     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
    //   images: [
    //     {
    //       product_image_id: 1,
    //       image_url:
    //         "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
    //     },
    //     {
    //       product_image_id: 2,
    //       image_url:
    //         "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
    //     },
    //   ],
    //   year: "2024",
    //   student: "Lê Hoàng Phúc",
    //   studentId: "10221088",
    //   class: "MMTK19",
    //   major_id: 3,
    //   major: "Mạng máy tính",
    //   type: "Đồ án chuyên ngành",
    //   views: 1876,
    //   likes: 124,
    //   advisor: "TS. Nguyễn Thành Nam",
    //   score: 9.4,
    //   collaborators: ["Phạm Quốc Bảo"],
    //   technologies: ["Node.js", "Python", "Snort", "Wireshark", "Scikit-learn"],
    //   github: "https://github.com/tdc/network-security",
    //   demo: "https://security.tdc.edu.vn",
    //   awards: [
    //     "🏆 Giải Nhì Hội thi An toàn thông tin 2024",
    //     "🎖️ Đề tài tiềm năng cấp Bộ",
    //   ],
    //   feedback: [
    //     {
    //       name: "TS. Nguyễn Thành Nam",
    //       role: "Giảng viên hướng dẫn",
    //       content:
    //         "Giải pháp an ninh mạng toàn diện, có thể triển khai thực tế",
    //     },
    //   ],
    // },
    // 4: {
    //   // Đồ họa
    //   id: 4,
    //   title: "Bộ nhận diện thương hiệu TDC Creative Hub",
    //   description:
    //     "Thiết kế bộ nhận diện thương hiệu và ấn phẩm truyền thông cho không gian sáng tạo của sinh viên",
    //   fullDescription: `
    //     ## 📌 Tổng quan dự án

    //     Dự án thiết kế bộ nhận diện thương hiệu hoàn chỉnh cho Creative Hub - không gian sáng tạo dành cho sinh viên TDC.

    //     ## 🎯 Mục tiêu
    //     - Xây dựng hệ thống nhận diện thương hiệu chuyên nghiệp
    //     - Thiết kế ấn phẩm truyền thông đa dạng
    //     - Tạo phong cách riêng cho Creative Hub
    //     - Ứng dụng trên nhiều nền tảng

    //     ## 🛠️ Công nghệ sử dụng
    //     - Thiết kế: Adobe Illustrator, Photoshop
    //     - 3D: Blender, Cinema 4D
    //     - Mockup: Adobe Dimension
    //     - Video: After Effects, Premiere Pro

    //     ## 📊 Kết quả đạt được
    //     - 50+ ấn phẩm thiết kế
    //     - 10+ video giới thiệu
    //     - Được ứng dụng chính thức tại trường
    //   `,
    //   thumbnail:
    //     "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    //   images: [
    //     {
    //       product_image_id: 1,
    //       image_url:
    //         "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    //     },
    //     {
    //       product_image_id: 2,
    //       image_url:
    //         "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop",
    //     },
    //     {
    //       product_image_id: 3,
    //       image_url:
    //         "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=450&fit=crop",
    //     },
    //   ],
    //   year: "2024",
    //   student: "Phạm Hoàng My",
    //   studentId: "10221123",
    //   class: "TKĐHK20",
    //   major_id: 4,
    //   major: "Thiết kế đồ họa",
    //   type: "Đồ án tốt nghiệp",
    //   views: 2341,
    //   likes: 203,
    //   advisor: "ThS. Trần Thị Thu Hà",
    //   score: 9.3,
    //   collaborators: ["Ngô Thị Lan Anh", "Vũ Hoàng Nam"],
    //   technologies: [
    //     "Illustrator",
    //     "Photoshop",
    //     "Blender",
    //     "After Effects",
    //     "Premiere Pro",
    //   ],
    //   behance: "https://behance.net/tdc/creative-hub",
    //   awards: [
    //     "🏆 Giải Nhất Triển lãm Đồ họa Sinh viên 2024",
    //     "🎖️ Tác phẩm xuất sắc nhất tháng",
    //   ],
    //   feedback: [
    //     {
    //       name: "ThS. Trần Thị Thu Hà",
    //       role: "Giảng viên hướng dẫn",
    //       content:
    //         "Bộ nhận diện chuyên nghiệp, sáng tạo và có tính ứng dụng cao",
    //     },
    //     {
    //       name: "TS. Lê Minh Quân",
    //       role: "Trưởng phòng Truyền thông",
    //       content:
    //         "Sản phẩm được sử dụng chính thức cho các hoạt động của trường",
    //     },
    //   ],
    // },
  };

  // Mock related products
  const mockRelatedProducts = {
    1: [
      {
        id: 2,
        title: "Trợ lý ảo AI hỗ trợ học tập",
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop",
        major: "AI",
      },
      {
        id: 5,
        title: "Phần mềm quản lý đề tài NCKH",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop",
        major: "CNTT",
      },
    ],
    2: [
      {
        id: 1,
        title: "Hệ thống quản lý thực tập",
        thumbnail:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop",
        major: "CNTT",
      },
      {
        id: 5,
        title: "Nhận diện cảm xúc qua giọng nói",
        thumbnail:
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=200&h=150&fit=crop",
        major: "AI",
      },
    ],
    3: [
      {
        id: 6,
        title: "Firewall thông minh",
        thumbnail:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop",
        major: "Mạng máy tính",
      },
      {
        id: 1,
        title: "Giám sát hệ thống IoT",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop",
        major: "CNTT",
      },
    ],
    4: [
      {
        id: 7,
        title: "Motion Graphics TDC",
        thumbnail:
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=150&fit=crop",
        major: "Đồ họa",
      },
      {
        id: 8,
        title: "UI/UX Design System",
        thumbnail:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&h=150&fit=crop",
        major: "Đồ họa",
      },
    ],
  };

  useEffect(() => {
    const productId = parseInt(id);
    const foundProduct = mockProducts[productId];

    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(mockRelatedProducts[productId] || []);
    } else {
      // Fallback cho product mặc định nếu không tìm thấy
      setProduct(mockProducts[1]);
      setRelatedProducts(mockRelatedProducts[1] || []);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto ${primaryColor}`}
          />
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageViewerModal />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 mt-2">
            <BackButton />
            <div className="flex items-center gap-3">
              {/* <button
                onClick={() =>
                  navigate("/login", { state: { from: `/product/${id}` } })
                }
                className={`px-4 py-1.5 border rounded-md text-sm transition ${primaryColor} ${primaryBorder} hover:text-white ${primaryBg}`}
              >
                Đăng nhập
              </button> */}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span
            className="hover:text-[#003087] cursor-pointer"
            onClick={() => navigate("/nckh-visitor")}
          >
            Trang chủ
          </span>
          {" / "}
          <span
            className="hover:text-[#003087] cursor-pointer"
            onClick={() => navigate("/nckh-visitor")}
          >
            Sản phẩm
          </span>
          {" / "}
          <span className="text-gray-800">{product.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer group relative"
              onClick={() => openViewer(product.thumbnail)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.product_image_id || idx}
                    onClick={() => openViewer(img.image_url)}
                    className="group relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition"
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                {[
                  { id: "tech", label: "🛠️ Công nghệ" },
                  { id: "team", label: "👥 Nhóm thực hiện" },
                  { id: "feedback", label: "💬 Đánh giá" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 font-medium text-sm transition ${
                      activeTab === tab.id
                        ? `${tabActiveColor} border-b-2 ${primaryBorder.replace("border-", "border-")}`
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.fullDescription,
                      }}
                    />

                    {/* Awards */}
                    {product.awards && product.awards.length > 0 && (
                      <div
                        className={`mt-6 p-4 rounded-lg border ${primaryLight} ${primaryBorder}`}
                      >
                        <h4 className={`font-semibold mb-2 ${primaryColor}`}>
                          🏆 Thành tích đạt được
                        </h4>
                        <ul className="space-y-1">
                          {product.awards.map((award, i) => (
                            <li
                              key={i}
                              className={`text-sm ${primaryColor.replace("text", "text")}/80`}
                            >
                              {award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tech" && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Công nghệ sử dụng
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-gray-700 text-sm rounded-full ${primaryLight}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="space-y-2">
                      {product.github && (
                        <a
                          href={product.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${primaryColor} hover:underline`}
                        >
                          📦 GitHub Repository
                        </a>
                      )}
                      {product.demo && (
                        <a
                          href={product.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${primaryColor} hover:underline`}
                        >
                          🚀 Live Demo
                        </a>
                      )}
                      {product.behance && (
                        <a
                          href={product.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${primaryColor} hover:underline`}
                        >
                          🎨 Behance Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Sinh viên thực hiện
                      </h4>
                      <div
                        className={`flex items-center gap-4 p-4 rounded-lg ${primaryLight}`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full text-white flex items-center justify-center text-lg font-bold ${primaryBg.split(" ")[0]}`}
                        >
                          {product.student.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {product.student}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.studentId} • {product.class}
                          </p>
                        </div>
                      </div>
                    </div>

                    {product.collaborators &&
                      product.collaborators.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Cộng tác viên
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {product.collaborators.map((collab, i) => (
                              <div
                                key={i}
                                className={`flex items-center gap-2 p-2 rounded-lg ${primaryLight}`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold ${primaryBg.split(" ")[0]}`}
                                >
                                  {collab.charAt(0)}
                                </div>
                                <span className="text-sm">{collab}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Giảng viên hướng dẫn
                      </h4>
                      <div className={`p-4 rounded-lg ${primaryLight}`}>
                        <p className="font-medium text-gray-800">
                          {product.advisor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "feedback" && (
                  <div className="space-y-4">
                    {product.feedback.map((fb, i) => (
                      <div key={i} className={`p-4 rounded-lg ${primaryLight}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-bold ${primaryBg.split(" ")[0]}`}
                          >
                            {fb.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {fb.name}
                            </p>
                            <p className="text-xs text-gray-500">{fb.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm italic">
                          "{fb.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Main Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ngành:</span>
                    <span className={`font-medium ${primaryColor}`}>
                      {product.major}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Loại:</span>
                    <span className="font-medium text-gray-700">
                      {product.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Năm:</span>
                    <span className="font-medium text-gray-700">
                      {product.year}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lượt xem:</span>
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <Icons.Eye /> {product.views}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Yêu thích:</span>
                    <span className="flex items-center gap-1 font-medium text-[#C8102E]">
                      <Icons.Heart /> {product.likes}
                    </span>
                  </div>
                </div>

                {/* Share Button */}
                <div className="flex gap-3 mt-5">
                  <button
                    className={`flex-1 px-4 py-2 text-white rounded-md text-sm font-medium transition ${primaryBg}`}
                  >
                    🔗 Chia sẻ
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div
                className={`bg-gradient-to-r ${primaryGradient} text-white rounded-xl p-5`}
              >
                <h3 className="font-semibold mb-3">📊 Thống kê dự án</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-xs opacity-80">Tháng thực hiện</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5,000+</div>
                    <div className="text-xs opacity-80">Dòng code</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs opacity-80">Tính năng chính</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs opacity-80">Phiên bản</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📌 Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    <p className={`text-xs mt-1 ${primaryColor}`}>
                      {item.major}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`bg-gradient-to-r ${primaryGradient} text-white mt-12 py-6`}
      >
        <div className="container mx-auto px-4 text-center text-sm">
          © 2025 Trường Cao Đẳng Công Nghệ Thủ Đức - Khoa Công Nghệ Thông Tin
        </div>
      </footer>
    </div>
  );
};

export default VisitorDetailScreen;
