const LoadingSpinner = ({
  fullScreen = false,
  message = "Đang xử lý...",
  size = "md", // sm, md, lg
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}
      ></div>
      {message && <p className="text-gray-700 font-medium">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4">
          {spinner}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">{spinner}</div>
    </div>
  );
};

export default LoadingSpinner;
