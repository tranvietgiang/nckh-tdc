// utils/uploadRegistry.js
import useUploadProductForm from "../../hooks/uploadProductScreen/useUploadCNTTForm";
import useUploadGraphicForm from "../../hooks/uploadProductScreen/useUploadGraphicForm";
import useUploadNetworkForm from "../../hooks/uploadProductScreen/useUploadNetworkForm";
import useUploadAIForm from "../../hooks/uploadProductScreen/useUploadAIForm";

import UploadProductForm_CNTT from "../../components/uploadProductScreen/UploadProductForm_CNTT";
import UploadProductForm_Graphic from "../../components/uploadProductScreen/UploadProductForm_Graphic";
import UploadProductForm_Network from "../../components/uploadProductScreen/UploadProductForm_Network";
import UploadProductForm_AI from "../../components/uploadProductScreen/UploadProductForm_AI";

export const getUploadResources = (majorId) => {
  const id = Number(majorId);

  switch (id) {
    case 1:
      return {
        useHook: useUploadProductForm,
        FormComponent: UploadProductForm_CNTT,
        title: "Đăng sản phẩm công nghệ phần mềm",
        description: "Ứng dụng, website, hệ thống thông tin",
        gradient: "from-blue-600 to-indigo-600",
        icon: "💻",
      };

    case 2:
      return {
        useHook: useUploadGraphicForm,
        FormComponent: UploadProductForm_Graphic,
        title: "Đăng sản phẩm đồ họa",
        description: "Logo, poster, UI/UX, video, ấn phẩm",
        gradient: "from-rose-600 to-orange-600",
        icon: "🎨",
      };

    case 3:
      return {
        useHook: useUploadNetworkForm,
        FormComponent: UploadProductForm_Network,
        title: "Đăng đồ án mạng máy tính",
        description: "Mô phỏng, cấu hình, bảo mật",
        gradient: "from-cyan-700 to-blue-800",
        icon: "🌐",
      };

    case 4:
      return {
        useHook: useUploadAIForm,
        FormComponent: UploadProductForm_AI,
        title: "Đăng sản phẩm trí tuệ nhân tạo",
        description: "Machine Learning, NLP, Computer Vision",
        gradient: "from-purple-700 to-indigo-800",
        icon: "🧠",
      };

    default:
      return null;
  }
};
// Hàm lấy theme theo ngành (đồng bộ với StudentScreen)
export const getMajorTheme = (majorId) => {
  switch (Number(majorId)) {
    case 1: // CNTT
      return {
        primary: "blue",
        gradient: "from-blue-600 to-indigo-600",
        light: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        accent: "indigo",
      };
    case 2: // Đồ họa
      return {
        primary: "rose",
        gradient: "from-rose-600 to-orange-600",
        light: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        badge: "bg-rose-100 text-rose-800",
        button: "bg-rose-600 hover:bg-rose-700",
        accent: "orange",
      };
    case 3: // Network
      return {
        primary: "cyan",
        gradient: "from-cyan-700 to-blue-800",
        light: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        badge: "bg-cyan-100 text-cyan-800",
        button: "bg-cyan-700 hover:bg-cyan-800",
        accent: "blue",
      };
    case 4: // AI
      return {
        primary: "purple",
        gradient: "from-purple-700 to-indigo-800",
        light: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        badge: "bg-purple-100 text-purple-800",
        button: "bg-purple-700 hover:bg-purple-800",
        accent: "indigo",
      };
    default:
      return {
        primary: "blue",
        gradient: "from-blue-600 to-indigo-600",
        light: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        accent: "indigo",
      };
  }
};
