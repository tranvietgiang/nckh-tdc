import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const useImageViewer = (
  selectedImage,
  setSelectedImage,
  isOpen,
  setIsOpen,
  useEffect,
) => {
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

  const ImageViewerModal = () => {
    if (!isOpen || !selectedImage) return null;

    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={closeViewer}
      >
        {/* Close button */}
        <button
          onClick={closeViewer}
          className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition z-10"
        >
          ✕
        </button>

        {/* Content */}
        <div
          className="relative max-w-7xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={5}
            wheel={{ step: 0.2 }}
            doubleClick={{ mode: "zoomIn" }}
          >
            <TransformComponent>
              <img
                src={selectedImage}
                alt="Phóng to"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-grab"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>

        {/* Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm">
          Scroll để zoom • Kéo để di chuyển • ESC để đóng
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
