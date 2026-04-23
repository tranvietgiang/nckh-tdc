import React, { useState } from "react";

// ========== ICONS ==========
const LogoIcon = () => (
  <img
    src="/Images/logo-tdc-orginal.webp"
    alt="TDC - Trường Cao Đẳng Công Nghệ Thủ Đức"
    className="h-12 w-auto"
  />
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-[#C8102E] fill-current" : "text-gray-400"}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// ========== MOCK DATA ==========
const products = [
  {
    id: 1,
    title: "Ứng dụng hỗ trợ tư vấn tuyển sinh bằng AI",
    description:
      "Hệ thống chatbot thông minh trả lời tự động các thắc mắc về ngành học, điểm chuẩn, học phí",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
    year: "2024",
    student: "Nguyễn Minh Tuấn",
    studentId: "10221001",
    class: "CNTTK19",
    major: "Công nghệ thông tin",
    type: "Đồ án tốt nghiệp",
    views: 1247,
    likes: 89,
    advisor: "TS. Lê Văn Hoàng",
    score: 9.2,
  },
  {
    id: 2,
    title: "Hệ thống quản lý thực tập doanh nghiệp",
    description:
      "Nền tảng kết nối sinh viên với doanh nghiệp, theo dõi tiến độ thực tập và đánh giá kết quả",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
    year: "2024",
    student: "Trần Thị Bảo Trân",
    studentId: "10221045",
    class: "CNTTK20",
    major: "Công nghệ thông tin",
    type: "Dự án nhóm",
    views: 892,
    likes: 56,
    advisor: "ThS. Phạm Quốc Việt",
    score: 8.7,
  },
  {
    id: 3,
    title: "Giải pháp an ninh mạng cho hệ thống đào tạo trực tuyến",
    description:
      "Phát hiện và ngăn chặn tấn công DDoS, bảo vệ dữ liệu người dùng trên nền tảng E-learning",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=240&fit=crop",
    year: "2023",
    student: "Lê Hoàng Phúc",
    studentId: "10221088",
    class: "MMTK19",
    major: "Mạng máy tính",
    type: "Đồ án chuyên ngành",
    views: 2103,
    likes: 142,
    advisor: "TS. Nguyễn Thành Nam",
    score: 9.5,
  },
  {
    id: 4,
    title: "Thiết kế bộ nhận diện thương hiệu TDC Creative Hub",
    description:
      "Bộ nhận diện thương hiệu và ấn phẩm truyền thông cho không gian sáng tạo của sinh viên TDC",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
    year: "2024",
    student: "Phạm Hoàng My",
    studentId: "10221123",
    class: "TKĐHK20",
    major: "Thiết kế đồ họa",
    type: "Sản phẩm cá nhân",
    views: 567,
    likes: 103,
    advisor: "ThS. Trần Thị Thu Hà",
    score: 9.0,
  },
  {
    id: 5,
    title: "Phần mềm quản lý đề tài nghiên cứu khoa học",
    description:
      "Hệ thống quản lý và đánh giá đề tài NCKH sinh viên, kết nối giảng viên hướng dẫn",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop",
    year: "2024",
    student: "Vũ Đức Hiếu",
    studentId: "10221056",
    class: "CNTTK19",
    major: "Công nghệ thông tin",
    type: "Đồ án tốt nghiệp",
    views: 734,
    likes: 67,
    advisor: "PGS.TS. Hoàng Văn Tuấn",
    score: 8.9,
  },
];

// ========== MAIN COMPONENT ==========
const VisitorScreen = () => {
  const [likedProducts, setLikedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleLike = (id) => {
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.student.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMajor = selectedMajor === "all" || p.major === selectedMajor;
      return matchSearch && matchMajor;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return parseInt(b.year) - parseInt(a.year);
      if (sortBy === "most_viewed") return b.views - a.views;
      if (sortBy === "most_liked")
        return (
          b.likes +
          (likedProducts[b.id] ? 1 : 0) -
          (a.likes + (likedProducts[a.id] ? 1 : 0))
        );
      return 0;
    });

  const stats = [
    { value: "128", label: "Sản phẩm tiêu biểu" },
    { value: "342", label: "Sinh viên tham gia" },
    { value: "45", label: "Giảng viên hướng dẫn" },
    { value: "24", label: "Giải thưởng đạt được" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <LogoIcon />
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-[#003087] leading-tight">
                  Trưng bày sản phẩm sinh viên
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">
                  Khoa Công Nghệ Thông Tin | TDC
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                "Trang chủ",
                "Sản phẩm",
                "Ngành học",
                "Giới thiệu",
                "Liên hệ",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-[#003087] font-medium transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-[#003087] border border-[#003087] rounded-md font-medium text-sm hover:bg-[#003087] hover:text-white transition-all">
                Đăng nhập
              </button>
              <button className="px-5 py-2 bg-[#C8102E] text-white rounded-full font-semibold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-200">
                Khám phá ngay
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ========== HERO SECTION ========== */}
        <section className="bg-[#003087] text-white py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-4xl mx-auto text-center">
              <p className="text-blue-100 text-sm md:text-base mb-3">
                Khoa Công Nghệ Thông Tin
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Triển lãm sản phẩm sinh viên
              </h1>
              <p className="text-base md:text-lg text-blue-100 mt-4 max-2xl mx-auto">
                Khám phá các đồ án, dự án nghiên cứu và sản phẩm sáng tạo
                <br className="hidden md:block" />
                của sinh viên 4 chuyên ngành công nghệ tại TDC
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <button className="px-6 py-2.5 bg-white text-[#003087] rounded-md font-semibold text-sm hover:bg-gray-100 transition-all">
                  Xem tất cả sản phẩm
                </button>
                <button className="px-6 py-2.5 border border-white text-white rounded-md font-semibold text-sm hover:bg-white/10 transition-all">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-blue-100 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SEARCH SECTION ========== */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2 md:p-3 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center bg-gray-50 rounded-md px-4 py-2.5 gap-2">
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên sản phẩm, tác giả, mô tả..."
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2.5 bg-gray-50 rounded-md outline-none text-gray-600 text-sm border-0 cursor-pointer"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="all">Tất cả ngành</option>
              <option value="Công nghệ thông tin">
                💻 Công nghệ thông tin
              </option>
              <option value="Trí tuệ nhân tạo">🧠 Trí tuệ nhân tạo</option>
              <option value="Mạng máy tính">🌐 Mạng máy tính</option>
              <option value="Thiết kế đồ họa">🎨 Thiết kế đồ họa</option>
            </select>
            <select
              className="px-4 py-2.5 bg-gray-50 rounded-md outline-none text-gray-600 text-sm border-0 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">🆕 Mới nhất</option>
              <option value="most_viewed">👁️ Xem nhiều nhất</option>
              <option value="most_liked">❤️ Yêu thích nhất</option>
            </select>
            <button className="bg-[#003087] text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-[#002268] transition-all">
              Tìm kiếm
            </button>
          </div>
        </section>

        {/* ========== MAJOR FILTER ========== */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setSelectedMajor("all")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedMajor === "all"
                  ? "text-[#003087] border-b-2 border-[#003087]"
                  : "text-gray-500 hover:text-[#003087] border-b-2 border-transparent"
              }`}
            >
              📌 Tất cả
            </button>
            <button
              onClick={() => setSelectedMajor("Công nghệ thông tin")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedMajor === "Công nghệ thông tin"
                  ? "text-[#003087] border-b-2 border-[#003087]"
                  : "text-gray-500 hover:text-[#003087] border-b-2 border-transparent"
              }`}
            >
              💻 CNTT
            </button>
            <button
              onClick={() => setSelectedMajor("Trí tuệ nhân tạo")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedMajor === "Trí tuệ nhân tạo"
                  ? "text-[#003087] border-b-2 border-[#003087]"
                  : "text-gray-500 hover:text-[#003087] border-b-2 border-transparent"
              }`}
            >
              🧠 AI
            </button>
            <button
              onClick={() => setSelectedMajor("Mạng máy tính")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedMajor === "Mạng máy tính"
                  ? "text-[#003087] border-b-2 border-[#003087]"
                  : "text-gray-500 hover:text-[#003087] border-b-2 border-transparent"
              }`}
            >
              🌐 Mạng máy tính
            </button>
            <button
              onClick={() => setSelectedMajor("Thiết kế đồ họa")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedMajor === "Thiết kế đồ họa"
                  ? "text-[#003087] border-b-2 border-[#003087]"
                  : "text-gray-500 hover:text-[#003087] border-b-2 border-transparent"
              }`}
            >
              🎨 Đồ họa
            </button>
          </div>
        </section>

        {/* ========== PRODUCT GRID ========== */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#003087] text-white text-xs px-2 py-1 rounded">
                      {product.year}
                    </span>
                    <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded">
                      {product.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">
                    {product.score}/10
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-[#003087] font-medium bg-blue-50 px-2 py-0.5 rounded">
                      {product.major === "Công nghệ thông tin" && "💻 "}
                      {product.major === "Trí tuệ nhân tạo" && "🧠 "}
                      {product.major === "Mạng máy tính" && "🌐 "}
                      {product.major === "Thiết kế đồ họa" && "🎨 "}
                      {product.major}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center gap-2 mb-3 pt-2 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[#003087] flex items-center justify-center text-white text-xs font-bold">
                      {product.student.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {product.student}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.studentId} • {product.class}
                      </p>
                    </div>
                  </div>

                  {/* Advisor */}
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="text-gray-400">👨‍🏫 GVHD:</span>{" "}
                    {product.advisor}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <div className="flex items-center gap-1">
                        <EyeIcon />
                        <span>{product.views}</span>
                      </div>
                      <button
                        onClick={() => handleLike(product.id)}
                        className="flex items-center gap-1 hover:text-[#C8102E] transition"
                      >
                        <HeartIcon filled={likedProducts[product.id]} />
                        <span>
                          {product.likes + (likedProducts[product.id] ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                    <button className="px-3 py-1 bg-white border border-[#003087] text-[#003087] text-xs rounded-md hover:bg-[#003087] hover:text-white transition">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
              <p className="text-gray-400 text-sm mt-1">
                Vui lòng thử lại với từ khóa khác
              </p>
            </div>
          )}
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#003087] text-white pt-10 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <LogoIcon />
                <div>
                  <div className="font-bold text-sm">Trường Cao Đẳng</div>
                  <div className="font-bold text-sm">Công Nghệ Thủ Đức</div>
                </div>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed">
                Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ
                thông tin và Truyền thông.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Liên kết</h4>
              <ul className="space-y-1.5 text-xs text-blue-100">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Sản phẩm sinh viên
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Các ngành đào tạo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Thông tin</h4>
              <ul className="space-y-1.5 text-xs text-blue-100">
                <li>📞 (028) 3896 1234</li>
                <li>📧 info@tdc.edu.vn</li>
                <li>📍 Số 1, Võ Văn Ngân, TP. Thủ Đức</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Kết nối</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-5 text-center text-blue-100 text-xs">
            © 2025 Trường Cao Đẳng Công Nghệ Thủ Đức (TDC). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VisitorScreen;
