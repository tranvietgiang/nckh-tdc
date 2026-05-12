import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageViewerModal = ({ isOpen, selectedImage, onClose }) => {
  if (!isOpen || !selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        ✕
      </button>

      <div onClick={(e) => e.stopPropagation()}>
        <TransformWrapper>
          <TransformComponent>
            <img src={selectedImage} alt="zoom" />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default ImageViewerModal;
