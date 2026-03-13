import React, { useEffect, useState } from 'react';
import UserDropdown from "../../components/common/UserDropdown";

const StudentScreen = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
document.title = "Trang chủ sinh viên";
  },[])
    // Data mẫu - sinh viên hiện tại
  const currentStudent = {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@student.tdc.edu.vn",
    class: "DHKTPM18A",
    major: "Phát triển phần mềm",
    avatar: null
  };

  // Data mẫu sản phẩm của sinh viên
  const myProducts = [
    {
      id: 1,
      title: "App Quản Lý Công Việc - TaskFlow",
      description: "Ứng dụng quản lý công việc theo phương pháp Kanban, hỗ trợ team làm việc hiệu quả.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      category: "Đồ án tốt nghiệp",
      status: "approved",
      submittedAt: "2024-02-01",
      views: 1234,
      likes: 89,
      feedback: null
    },
    {
      id: 2,
      title: "Website Thương Mại Điện Tử - TechStore",
      description: "Website bán đồ công nghệ với giỏ hàng, thanh toán online và quản lý đơn hàng.",
      thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400",
      category: "Đồ án môn học",
      status: "approved",
      submittedAt: "2024-01-15",
      views: 2341,
      likes: 156,
      feedback: null
    },
    {
      id: 3,
      title: "App Học Tiếng Anh - EasyEnglish",
      description: "App học tiếng Anh với AI, đề xuất lộ trình học cá nhân hóa.",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
      category: "Sản phẩm cá nhân",
      status: "pending",
      submittedAt: "2024-03-10",
      views: 0,
      likes: 0,
      feedback: null
    },
    {
      id: 4,
      title: "Game Flappy Bird - Bản Clone",
      description: "Game Flappy Bird được viết lại bằng Python với Pygame.",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400",
      category: "Đồ án cá nhân",
      status: "rejected",
      submittedAt: "2024-02-20",
      views: 0,
      likes: 0,
      feedback: "Cần bổ sung tài liệu hướng dẫn chi tiết hơn và video demo sản phẩm."
    }
  ];

  // Lọc sản phẩm theo tab
  const getFilteredProducts = () => {
    switch(activeTab) {
      case 'pending':
        return myProducts.filter(p => p.status === 'pending');
      case 'approved':
        return myProducts.filter(p => p.status === 'approved');
      case 'rejected':
        return myProducts.filter(p => p.status === 'rejected');
      default:
        return myProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  // Thống kê
  const stats = {
    total: myProducts.length,
    approved: myProducts.filter(p => p.status === 'approved').length,
    pending: myProducts.filter(p => p.status === 'pending').length,
    rejected: myProducts.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* User Info */}
       <div className="flex items-center justify-between">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    Đăng sản phẩm mới
  </button>
  <div className="flex items-center gap-4">
   

    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {currentStudent.name}
      </h1>
      <p className="text-gray-600 mt-1">
        {currentStudent.class} - {currentStudent.major}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {currentStudent.email}
      </p>
    </div>
     <UserDropdown />
  </div>

  
</div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
                  <p className="text-2xl font-bold text-green-700 mt-1">{stats.approved}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-yellow-700 mt-1">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Từ chối</p>
                  <p className="text-2xl font-bold text-red-700 mt-1">{stats.rejected}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 mt-8 border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'pending'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Chờ duyệt ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'approved'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đã duyệt ({stats.approved})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'rejected'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Từ chối ({stats.rejected})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    product.status === 'approved' ? 'bg-green-100 text-green-800' :
                    product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'approved' ? 'Đã duyệt' :
                     product.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {product.category}
                  </span>
                  <span className="text-gray-500 text-xs">{product.submittedAt}</span>
                </div>

                {product.status === 'approved' && (
                  <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
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
                )}

                {product.feedback && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-800">
                      <span className="font-semibold">Phản hồi:</span> {product.feedback}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
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
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có sản phẩm</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'pending' && 'Bạn chưa có sản phẩm nào đang chờ duyệt.'}
              {activeTab === 'approved' && 'Bạn chưa có sản phẩm nào được duyệt.'}
              {activeTab === 'rejected' && 'Bạn chưa có sản phẩm nào bị từ chối.'}
              {activeTab === 'all' && 'Bắt đầu bằng cách đăng sản phẩm đầu tiên của bạn.'}
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Đăng sản phẩm mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScreen;