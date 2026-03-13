
import React, { useState } from 'react';
import UserDropdown from "../../components/common/UserDropdown";
const TeacherScreen = () => {
  const [filter, setFilter] = useState('pending');
  
  // Thông tin giảng viên
  const teacher = {
    name: "ThS. Trần Thị Bình",
    email: "binh.tran@tdc.edu.vn",
    major: "Khoa học dữ liệu",
    totalStudents: 45,
    totalProducts: 78
  };

  // Data mẫu sản phẩm chờ duyệt
  const pendingProducts = [
    {
      id: 1,
      title: "Hệ Thống IoT Giám Sát Nông Trại",
      description: "Hệ thống giám sát nhiệt độ, độ ẩm và điều khiển thiết bị từ xa qua web.",
      thumbnail: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400",
      studentName: "Nguyễn Văn Phúc",
      studentClass: "DHKTMTA18A",
      major: "Mạng máy tính",
      category: "Đồ án tốt nghiệp",
      submittedAt: "2024-03-10",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Hệ Thống Phân Tích Dữ Liệu Bán Hàng",
      description: "Dashboard phân tích dữ liệu bán hàng với biểu đồ tương tác.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      studentName: "Phạm Văn Minh",
      studentClass: "DHKHDL19A",
      major: "Khoa học dữ liệu",
      category: "Đồ án thực tập",
      submittedAt: "2024-03-12",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "App Học Tiếng Anh - EasyEnglish",
      description: "App học tiếng Anh với AI, đề xuất lộ trình học cá nhân hóa.",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
      studentName: "Lê Thị Hạnh",
      studentClass: "DHKTPM20A",
      major: "Phát triển phần mềm",
      category: "Sản phẩm cá nhân",
      submittedAt: "2024-03-05",
      github: "https://github.com",
      demo: null
    }
  ];

  // Data mẫu sản phẩm đã duyệt
  const approvedProducts = [
    {
      id: 4,
      title: "App Quản Lý Công Việc - TaskFlow",
      description: "Ứng dụng quản lý công việc theo phương pháp Kanban.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      studentName: "Nguyễn Văn An",
      studentClass: "DHKTPM18A",
      major: "Phát triển phần mềm",
      approvedAt: "2024-02-05",
      views: 1234
    },
    {
      id: 5,
      title: "Website Thương Mại Điện Tử - TechStore",
      description: "Website bán đồ công nghệ với giỏ hàng, thanh toán online.",
      thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400",
      studentName: "Trần Thị Bình",
      studentClass: "DHKTPM19B",
      major: "Phát triển phần mềm",
      approvedAt: "2024-01-20",
      views: 2341
    }
  ];

  const getCurrentProducts = () => {
    switch(filter) {
      case 'pending':
        return pendingProducts;
      case 'approved':
        return approvedProducts;
      default:
        return [];
    }
  };
  console.log(getCurrentProducts)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Giảng viên Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Quản lý và duyệt sản phẩm sinh viên</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                <p className="text-xs text-gray-500">{teacher.email}</p>
              </div>
             <UserDropdown />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-medium">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">{teacher.totalProducts}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">{pendingProducts.length}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{approvedProducts.length}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium">Sinh viên</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{teacher.totalStudents}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chờ duyệt ({pendingProducts.length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition ${
                filter === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã duyệt ({approvedProducts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filter === 'pending' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm cần duyệt
            </h2>
            {pendingProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex gap-6">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Chờ duyệt
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-gray-600">Sinh viên: {product.studentName}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{product.studentClass}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{product.major}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Ngày gửi: {product.submittedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                        Duyệt
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">
                        Từ chối
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition">
                        Xem chi tiết
                      </button>
                    </div>

                    <div className="flex gap-4 mt-3">
                      {product.github && (
                        <a href={product.github} target="_blank" rel="noopener noreferrer" 
                           className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                      {product.demo && (
                        <a href={product.demo} target="_blank" rel="noopener noreferrer"
                           className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filter === 'approved' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm đã duyệt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex gap-4">
                    <img src={product.thumbnail} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{product.studentName}</span>
                        <span className="text-xs text-gray-500">{product.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherScreen;