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
      if (e.key === "Escape" && isOpen) closeViewer();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return {
    openViewer,
    closeViewer,
    isOpen,
    selectedImage,
  };
};

export default useImageViewer;
