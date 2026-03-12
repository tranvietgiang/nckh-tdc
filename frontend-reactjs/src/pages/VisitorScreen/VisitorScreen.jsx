
import React, { useState } from 'react';

const VisitorScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('all');

  // Data mẫu sản phẩm đã được duyệt
  const products = [
    {
      id: 1,
      title: "App Quản Lý Công Việc - TaskFlow",
      description: "Ứng dụng quản lý công việc theo phương pháp Kanban, hỗ trợ team làm việc hiệu quả. Xây dựng bằng React và Node.js.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      studentName: "Nguyễn Văn An",
      studentClass: "DHKTPM18A",
      major: "Phát triển phần mềm",
      category: "Đồ án tốt nghiệp",
      year: 2024,
      views: 1234,
      likes: 89
    },
    {
      id: 2,
      title: "Website Thương Mại Điện Tử - TechStore",
      description: "Website bán đồ công nghệ với giỏ hàng, thanh toán online và quản lý đơn hàng.",
      thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400",
      studentName: "Trần Thị Bình",
      studentClass: "DHKTPM19B",
      major: "Phát triển phần mềm",
      category: "Đồ án môn học",
      year: 2024,
      views: 2341,
      likes: 156
    },
    {
      id: 3,
      title: "Game Flappy Bird - Bản Clone",
      description: "Game Flappy Bird được viết lại bằng Python với Pygame, có thêm tính năng lưu điểm cao.",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400",
      studentName: "Phạm Thị Dung",
      studentClass: "DHKHDL18A",
      major: "Khoa học dữ liệu",
      category: "Sản phẩm cá nhân",
      year: 2024,
      views: 3456,
      likes: 234
    },
    {
      id: 4,
      title: "Hệ Thống IoT Giám Sát Nông Trại",
      description: "Hệ thống giám sát nhiệt độ, độ ẩm và điều khiển thiết bị từ xa qua web.",
      thumbnail: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400",
      studentName: "Nguyễn Văn Phúc",
      studentClass: "DHKTMTA18A",
      major: "Mạng máy tính",
      category: "Đồ án tốt nghiệp",
      year: 2024,
      views: 567,
      likes: 34
    },
    {
      id: 5,
      title: "App Học Tiếng Anh - EasyEnglish",
      description: "App học tiếng Anh với AI, đề xuất lộ trình học cá nhân hóa.",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
      studentName: "Lê Thị Hạnh",
      studentClass: "DHKTPM20A",
      major: "Phát triển phần mềm",
      category: "Sản phẩm cá nhân",
      year: 2024,
      views: 987,
      likes: 67
    },
    {
      id: 6,
      title: "App Chat Real-time - Chatty",
      description: "Ứng dụng chat realtime với gửi ảnh, video và gọi video.",
      thumbnail: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400",
      studentName: "Hoàng Văn Minh",
      studentClass: "DHKTPM20B",
      major: "Phát triển phần mềm",
      category: "Sản phẩm cá nhân",
      year: 2024,
      views: 6543,
      likes: 432
    },
    {
      id: 7,
      title: "Hệ Thống Phân Tích Dữ Liệu Bán Hàng",
      description: "Dashboard phân tích dữ liệu bán hàng với biểu đồ tương tác.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      studentName: "Trần Văn Nam",
      studentClass: "DHKHDL19B",
      major: "Khoa học dữ liệu",
      category: "Đồ án thực tập",
      year: 2024,
      views: 2345,
      likes: 178
    },
    {
      id: 8,
      title: "Hệ Thống Quản Lý Học Tập - StudyHub",
      description: "Nền tảng quản lý học tập cho sinh viên với lịch học, bài tập và điểm số.",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
      studentName: "Phạm Thị Lan",
      studentClass: "DHKTPM19C",
      major: "Phát triển phần mềm",
      category: "Đồ án tốt nghiệp",
      year: 2023,
      views: 1876,
      likes: 145
    }
  ];

  // Lấy danh sách chuyên ngành
  const majors = ['all', ...new Set(products.map(p => p.major))];
  
  // Lọc sản phẩm
  const filteredProducts = products.filter(product => {
    const matchMajor = selectedMajor === 'all' || product.major === selectedMajor;
    const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchMajor && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">
            Khoa Công Nghệ Thông Tin
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Trưng bày sản phẩm sinh viên - 4 chuyên ngành: Phát triển phần mềm, 
            Khoa học dữ liệu, Mạng máy tính, Thiết kế đồ họa
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{products.length}</div>
              <div className="text-blue-200">Sản phẩm</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">4</div>
              <div className="text-blue-200">Chuyên ngành</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-blue-200">Giảng viên</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">2024</div>
              <div className="text-blue-200">Năm học</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm, tên sinh viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả chuyên ngành</option>
              {majors.filter(m => m !== 'all').map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold text-blue-600">{filteredProducts.length}</span> sản phẩm
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                Mới nhất
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                Xem nhiều
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                Yêu thích
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {product.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Student Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {product.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.studentName}</p>
                    <p className="text-xs text-gray-500">{product.studentClass}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {product.major}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{product.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{product.likes}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
            <p className="mt-1 text-sm text-gray-500">
              Thử tìm kiếm với từ khóa khác hoặc chọn chuyên ngành khác.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorScreen;