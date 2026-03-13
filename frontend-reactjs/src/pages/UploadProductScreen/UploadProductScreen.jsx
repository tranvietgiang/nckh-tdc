import React, { useState } from 'react';

const UploadProductScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    major_id: '',
    category_id: '',
    github_link: '',
    demo_link: '',
    price: 0,
    is_free: true
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [touchedSteps, setTouchedSteps] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State cho ảnh phóng to
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Data mẫu - sinh viên hiện tại
  const currentStudent = {
    id: 1,
    name: "Nguyễn Văn An",
    class: "DHKTPM18A",
    major: "Phát triển phần mềm",
    major_id: 1,
    avatar: null
  };

  // Danh sách chuyên ngành
  const majors = [
    { id: 1, name: "Phát triển phần mềm", code: "PTPM", color: "blue", icon: "💻" },
    { id: 2, name: "Khoa học dữ liệu", code: "KHDL", color: "green", icon: "📊" },
    { id: 3, name: "Mạng máy tính", code: "MMT", color: "purple", icon: "🌐" },
    { id: 4, name: "Thiết kế đồ họa", code: "TKĐH", color: "pink", icon: "🎨" }
  ];

  // Danh mục sản phẩm
  const categories = [
    { id: 1, name: "Đồ án tốt nghiệp", icon: "🎓", color: "amber" },
    { id: 2, name: "Đồ án môn học", icon: "📚", color: "indigo" },
    { id: 3, name: "Sản phẩm nghiên cứu", icon: "🔬", color: "emerald" },
    { id: 4, name: "Bài tập lớn", icon: "📝", color: "cyan" },
    { id: 5, name: "Sản phẩm cá nhân", icon: "⭐", color: "rose" }
  ];

  // Validate từng bước
  const validateStep = (step) => {
    const stepErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) {
        stepErrors.title = 'Vui lòng nhập tên sản phẩm';
      }
      if (!formData.description.trim()) {
        stepErrors.description = 'Vui lòng nhập mô tả sản phẩm';
      }
      if (!formData.content.trim()) {
        stepErrors.content = 'Vui lòng nhập nội dung chi tiết';
      }
      if (!formData.major_id) {
        stepErrors.major_id = 'Vui lòng chọn chuyên ngành';
      }
      if (!formData.category_id) {
        stepErrors.category_id = 'Vui lòng chọn danh mục';
      }
    }
    
    if (step === 2) {
      if (images.length === 0) {
        stepErrors.images = 'Vui lòng tải lên ít nhất 1 hình ảnh';
      }
    }
    
    return stepErrors;
  };

  // Kiểm tra bước có hợp lệ không
  const isStepValid = (step) => {
    const stepErrors = validateStep(step);
    return Object.keys(stepErrors).length === 0;
  };

  // Kiểm tra tất cả các bước đã hoàn thành
  const isAllStepsCompleted = () => {
    return isStepValid(1) && isStepValid(2);
  };

  // Xử lý chuyển bước
  const handleNextStep = () => {
    setTouchedSteps({ ...touchedSteps, [currentStep]: true });
    
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors({ ...errors, ...stepErrors });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      alert(`⚠️ Vui lòng hoàn thành đầy đủ thông tin ở bước ${currentStep} trước khi tiếp tục!`);
      return;
    }
    
    const newErrors = { ...errors };
    Object.keys(stepErrors).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
    
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý submit form - CHỈ Ở BƯỚC 3
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Chỉ cho phép submit ở bước 3
    if (currentStep !== 3) {
      alert('⚠️ Vui lòng hoàn thành các bước trước khi gửi duyệt!');
      return;
    }
    
    // Kiểm tra tất cả các bước đã hoàn thành
    if (!isAllStepsCompleted()) {
      alert('⚠️ Vui lòng hoàn thành đầy đủ thông tin ở bước 1 và 2 trước khi gửi duyệt!');
      return;
    }
    
    setLoading(true);
    setSubmitStatus(null);
    
    // Giả lập gửi dữ liệu
    setTimeout(() => {
      console.log('Dữ liệu gửi lên:', {
        ...formData,
        tags,
        images: images.map(img => ({ 
          url: img.url, 
          is_thumbnail: img.id === images[thumbnailIndex]?.id 
        })),
        files,
        student_id: currentStudent.id,
        student_name: currentStudent.name,
        student_class: currentStudent.class,
        status: 'pending',
        created_at: new Date().toISOString()
      });
      
      setSubmitStatus('success');
      setLoading(false);
      
      // Không alert nữa, dùng UI thông báo đẹp hơn
    }, 2000);
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Xử lý thêm tag
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2)
    }));
    setImages([...images, ...newImages]);
    
    if (errors.images) {
      setErrors({ ...errors, images: null });
    }
  };

  const removeImage = (imageId) => {
    setImages(images.filter(img => img.id !== imageId));
    if (thumbnailIndex >= images.length - 1) {
      setThumbnailIndex(Math.max(0, images.length - 2));
    }
  };

  const setAsThumbnail = (index) => {
    setThumbnailIndex(index);
  };

  // Xử lý upload file
  const handleFileUpload = (e) => {
    const filesList = Array.from(e.target.files);
    const newFiles = filesList.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      type: file.name.split('.').pop().toUpperCase()
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  // Steps
  const steps = [
    { id: 1, name: 'Thông tin cơ bản', icon: '📋' },
    { id: 2, name: 'Hình ảnh & Files', icon: '🖼️' },
    { id: 3, name: 'Tags & Links', icon: '🔗' }
  ];

  // Xử lý phím ESC để đóng modal ảnh
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* Modal phóng to ảnh */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative max-w-7xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Thông tin ảnh */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm flex items-center gap-3">
              <span className="max-w-[200px] truncate">{selectedImage.name}</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span>{selectedImage.size}MB</span>
              {selectedImage.id === images[thumbnailIndex]?.id && (
                <>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <span>👑</span> Ảnh đại diện
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitStatus === 'success' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Đăng sản phẩm thành công!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Sản phẩm của bạn đã được gửi đến giảng viên chuyên ngành {currentStudent.major} để duyệt.
              Bạn sẽ nhận được thông báo khi sản phẩm được phê duyệt.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thời gian duyệt dự kiến: 24-48 giờ
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitStatus(null);
                // Reset form hoặc chuyển trang
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-medium"
            >
              Xem sản phẩm của tôi
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Đăng sản phẩm mới
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Chia sẻ sản phẩm công nghệ của bạn với cộng đồng. Điền đầy đủ thông tin để giảng viên duyệt nhanh nhất.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isValid = isStepValid(step.id);
              const isTouched = touchedSteps[step.id];
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold transition-all duration-300 ${
                      currentStep === step.id 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110' 
                        : isValid && isTouched
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isValid && isTouched && step.id !== currentStep ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      currentStep > index + 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Student Info Card */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/50">
                {currentStudent.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentStudent.name}</h2>
                <p className="text-blue-100">{currentStudent.class} - {currentStudent.major}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">4</div>
              <div className="text-blue-200">sản phẩm đã đăng</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Thông tin cơ bản */}
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
            currentStep === 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-95 hidden'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>📋</span> Thông tin cơ bản
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Form fields - giữ nguyên */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="VD: App Quản Lý Công Việc - TaskFlow"
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Mô tả ngắn gọn về sản phẩm..."
                />
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${
                    errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Mô tả chi tiết về sản phẩm..."
                />
                {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
              </div>

           {/* Chuyên ngành và danh mục */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chuyên ngành <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {majors.map(major => (
                      <button
                        key={major.id}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, major_id: major.id});
                          if (errors.major_id) {
                            setErrors({...errors, major_id: null});
                          }
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.major_id === major.id
                            ? `border-${major.color}-500 bg-${major.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{major.icon}</div>
                        <div className="font-medium text-sm">{major.name}</div>
                        <div className="text-xs text-gray-500">{major.code}</div>
                      </button>
                    ))}
                  </div>
                  {errors.major_id && (
                    <p className="mt-2 text-sm text-red-600">{errors.major_id}</p>
                  )}
                </div>

             {/* Danh mục */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Danh mục <span className="text-red-500">*</span>
  </label>
  <div className="space-y-2">
    {categories.map(cat => {
      const isSelected = formData.category_id === cat.id;
      
      return (
        <button
          key={cat.id}
          type="button"
          onClick={() => {
            setFormData({...formData, category_id: cat.id});
            if (errors.category_id) {
              setErrors({...errors, category_id: null});
            }
          }}
          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
            isSelected 
              ? `border-${cat.color}-500 bg-${cat.color}-50 ring-4 ring-${cat.color}-100` 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isSelected ? `bg-${cat.color}-200` : 'bg-gray-100'
          }`}>
            <span className="text-xl">{cat.icon}</span>
          </div>
          <div className="flex-1 text-left">
            <p className={`font-medium ${isSelected ? `text-${cat.color}-700` : 'text-gray-700'}`}>
              {cat.name}
            </p>
            {isSelected && (
              <p className={`text-xs text-${cat.color}-600 mt-0.5 flex items-center gap-1`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Đang chọn
              </p>
            )}
          </div>
          {isSelected && (
            <div className={`w-6 h-6 rounded-full bg-${cat.color}-500 text-white flex items-center justify-center`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      );
    })}
  </div>
  {errors.category_id && (
    <p className="mt-2 text-sm text-red-600">{errors.category_id}</p>
  )}
</div>

              </div>
            </div>
          </div>

          {/* Step 2: Hình ảnh & Files */}
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
            currentStep === 2 ? 'opacity-100 scale-100' : 'opacity-50 scale-95 hidden'
          }`}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>🖼️</span> Hình ảnh & Files
              </h2>
            </div>

            <div className="p-6 space-y-8">
              {/* Upload hình ảnh */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hình ảnh sản phẩm <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="relative block w-full p-12 border-3 border-dashed border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 cursor-pointer group transition-all"
                  >
                    <div className="text-center">
                      <div className="inline-flex p-4 bg-white rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Kéo thả hoặc click để tải ảnh lên
                      </p>
                      <p className="text-sm text-gray-500">
                        Hỗ trợ: JPG, PNG, GIF • Tối đa 10 ảnh • Mỗi ảnh ≤ 5MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Preview images với chức năng phóng to */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                      <span>📸 Hình ảnh đã tải lên ({images.length}/10)</span>
                      <span className="text-xs text-gray-500">Click vào ảnh để phóng to</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <div className={`aspect-square rounded-xl overflow-hidden border-4 transition-all cursor-pointer ${
                            index === thumbnailIndex 
                              ? 'border-purple-500 shadow-xl scale-105' 
                              : 'border-transparent hover:border-gray-300'
                          }`}>
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-full object-cover"
                              onClick={() => setSelectedImage(image)}
                            />
                          </div>
                          
                          {/* Overlay buttons */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(image);
                              }}
                              className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center"
                              title="Phóng to"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                              className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center justify-center"
                              title="Xóa"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Thumbnail badge */}
                          {index === thumbnailIndex && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                              👑
                            </div>
                          )}
                          
                          {/* Image info */}
                          <div className="mt-1 text-xs text-gray-500 truncate">
                            {image.name} • {image.size}MB
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errors.images && (
                  <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
              </div>

              {/* Upload files */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  File đính kèm
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="relative block w-full p-8 border-3 border-dashed border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 cursor-pointer group transition-all"
                  >
                    <div className="text-center">
                      <div className="inline-flex p-3 bg-white rounded-full shadow-lg mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414 6.586a6 6 0 106.364 6.364l6.364-6.364" />
                        </svg>
                      </div>
                      <p className="text-base font-medium text-gray-700 mb-1">
                        Tải lên báo cáo, source code, tài liệu
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, ZIP, RAR • Tối đa 5 files • Mỗi file ≤ 50MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* List files */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium text-gray-700">📁 Files đã tải lên ({files.length}/5)</p>
                    {files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                            {file.type}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Tags & Links */}
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
            currentStep === 3 ? 'opacity-100 scale-100' : 'opacity-50 scale-95 hidden'
          }`}>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>🔗</span> Tags & Liên kết
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Công nghệ sử dụng
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                  placeholder="Nhập công nghệ và nhấn Enter (VD: React, Node.js...)"
                />
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl text-sm font-medium"
                      >
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-white/80">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="github_link"
                    value={formData.github_link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Demo Link
                  </label>
                  <input
                    type="url"
                    name="demo_link"
                    value={formData.demo_link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                    placeholder="https://demo.vercel.app"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className={`px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium ${
                currentStep === 1 ? 'invisible' : ''
              }`}
            >
              ← Quay lại
            </button>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
              >
                Lưu nháp
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Tiếp theo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isAllStepsCompleted()}
                  className={`px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center gap-2 ${
                    isAllStepsCompleted()
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Gửi duyệt
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">📌 Lưu ý:</span> Sản phẩm của bạn sẽ được gửi đến giảng viên chuyên ngành <span className="font-semibold">{currentStudent.major}</span> để xét duyệt trong vòng 24-48 giờ.
            </p>
            {currentStep === 3 && !isAllStepsCompleted() && (
              <p className="text-sm text-red-600 mt-2">
                ⚠️ Vui lòng hoàn thành bước 1 và 2 trước khi gửi duyệt
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Thêm CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UploadProductScreen;