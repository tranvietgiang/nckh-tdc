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
    case 1:
      return {
        headerGradient: "from-blue-600 to-indigo-600",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        badgeBg: "bg-blue-700",
        textColor: "text-blue-700",
        hoverText: "hover:text-blue-700",
        hoverBg: "hover:bg-blue-50",
        statIconBg: "bg-blue-500/30",
        statIconHover: "group-hover:bg-blue-500/40",
        statText: "text-blue-100",
        tabActive: "text-blue-600",
        tabHover: "hover:text-blue-600",
      };
    case 2:
      return {
        headerGradient: "from-rose-600 to-orange-600",
        buttonBg: "bg-rose-600 hover:bg-rose-700",
        badgeBg: "bg-rose-700",
        textColor: "text-rose-700",
        hoverText: "hover:text-rose-700",
        hoverBg: "hover:bg-rose-50",
        statIconBg: "bg-rose-500/30",
        statIconHover: "group-hover:bg-rose-500/40",
        statText: "text-rose-100",
        tabActive: "text-rose-600",
        tabHover: "hover:text-rose-600",
      };
    case 3:
      return {
        headerGradient: "from-cyan-700 to-blue-800",
        buttonBg: "bg-cyan-700 hover:bg-cyan-800",
        badgeBg: "bg-cyan-800",
        textColor: "text-cyan-700",
        hoverText: "hover:text-cyan-700",
        hoverBg: "hover:bg-cyan-50",
        statIconBg: "bg-cyan-500/30",
        statIconHover: "group-hover:bg-cyan-500/40",
        statText: "text-cyan-100",
        tabActive: "text-cyan-600",
        tabHover: "hover:text-cyan-600",
      };
    case 4:
      return {
        headerGradient: "from-purple-700 to-indigo-800",
        buttonBg: "bg-purple-700 hover:bg-purple-800",
        badgeBg: "bg-purple-800",
        textColor: "text-purple-700",
        hoverText: "hover:text-purple-700",
        hoverBg: "hover:bg-purple-50",
        statIconBg: "bg-purple-500/30",
        statIconHover: "group-hover:bg-purple-500/40",
        statText: "text-purple-100",
        tabActive: "text-purple-600",
        tabHover: "hover:text-purple-600",
      };
    default:
      return null;
  }
};
