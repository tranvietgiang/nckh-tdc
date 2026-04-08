import { useState, useEffect } from "react";

const useImageViewer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setIsOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeViewer();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Trả về JSX như một function
  const ImageViewerModal = () => {
    if (!isOpen || !selectedImage) return null;

    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={closeViewer}
      >
        <button
          onClick={closeViewer}
          className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition z-10"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          className="relative max-w-7xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={selectedImage}
            alt="Phóng to"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm">
          Click bất kỳ đâu để đóng • ESC
        </div>
      </div>
    );
  };

  return {
    openViewer,
    closeViewer,
    ImageViewerModal,
    isOpen,
    selectedImage,
  };
};

export default useImageViewer;
