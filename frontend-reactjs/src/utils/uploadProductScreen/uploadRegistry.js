// utils/uploadRegistry.js
import useUploadProductForm from "../../hooks/uploadProductScreen/useUploadCNTTForm";
import useUploadGraphicForm from "../../hooks/uploadProductScreen/useUploadGraphicForm";
import useUploadNetworkForm from "../../hooks/uploadProductScreen/useUploadNetworkForm";
import useUploadAIForm from "../../hooks/uploadProductScreen/useUploadAIForm";

import UploadProductForm_CNTT from "../../components/uploadProductScreen/UploadProductForm_CNTT";
import UploadProductForm_Graphic from "../../components/uploadProductScreen/UploadProductForm_Graphic";
import UploadProductForm_Network from "../../components/uploadProductScreen/UploadProductForm_Network";
import UploadProductForm_AI from "../../components/uploadProductScreen/UploadProductForm_AI";
import { detectMajorKey } from "../../utils/detectMajorKey";

import NotFoundPage from "../../pages/notFoundScreen/NotFoundScreen";
// utils/uploadProductScreen/uploadRegistry.js

export const getUploadResources = () => {
  const majorName = localStorage.getItem("majorName");
  if (!majorName) return null;

  const key = detectMajorKey(majorName);

  const resourcesMap = {
    ai: {
      useHook: useUploadAIForm,
      FormComponent: UploadProductForm_AI,
      title: "Đăng sản phẩm trí tuệ nhân tạo",
      description: "Machine Learning, NLP, Computer Vision",
      gradient: "from-purple-700 to-indigo-800",
      icon: "🧠",
    },
    cntt: {
      useHook: useUploadProductForm,
      FormComponent: UploadProductForm_CNTT,
      title: "Đăng sản phẩm công nghệ phần mềm",
      description: "Ứng dụng, website, hệ thống thông tin",
      gradient: "from-blue-600 to-indigo-600",
      icon: "💻",
    },
    tkdh: {
      useHook: useUploadGraphicForm,
      FormComponent: UploadProductForm_Graphic,
      title: "Đăng sản phẩm đồ họa",
      description: "Logo, poster, UI/UX, video, ấn phẩm",
      gradient: "from-rose-600 to-orange-600",
      icon: "🎨",
    },
    mmt: {
      useHook: useUploadNetworkForm,
      FormComponent: UploadProductForm_Network,
      title: "Đăng đồ án mạng máy tính",
      description: "Mô phỏng, cấu hình, bảo mật",
      gradient: "from-cyan-700 to-blue-800",
      icon: "🌐",
    },
  };

  return resourcesMap[key] || null;
};

export const getMajorTheme = (major) => {
  const value = String(major).trim().toLowerCase();

  // nhận cả id, code, tên ngành
  const isAI =
    value === "ai" ||
    value.includes("artificial intelligence") ||
    value.includes("trí tuệ nhân tạo");

  const isCNTT =
    value === "cntt" ||
    value.includes("công nghệ thông tin") ||
    value.includes("information technology");

  const isMMT =
    value === "mmt" ||
    value.includes("mạng máy tính") ||
    value.includes("network");

  const isTKDH =
    value === "tkdh" ||
    value.includes("thiết kế đồ họa") ||
    value.includes("graphic");

  // ===== AI =====
  if (isAI) {
    return {
      // style 1
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

      // style 2
      primary: "purple",
      gradient: "from-purple-700 to-indigo-800",
      light: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      badge: "bg-purple-100 text-purple-800",
      button: "bg-purple-700 hover:bg-purple-800",
      accent: "indigo",
    };
  }

  // ===== CNTT =====
  if (isCNTT) {
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

  // ===== MMT =====
  if (isMMT) {
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

      primary: "cyan",
      gradient: "from-cyan-700 to-blue-800",
      light: "bg-cyan-50",
      text: "text-cyan-700",
      border: "border-cyan-200",
      badge: "bg-cyan-100 text-cyan-800",
      button: "bg-cyan-700 hover:bg-cyan-800",
      accent: "blue",
    };
  }

  // ===== TKDH =====
  if (isTKDH) {
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

      primary: "rose",
      gradient: "from-rose-600 to-orange-600",
      light: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      badge: "bg-rose-100 text-rose-800",
      button: "bg-rose-600 hover:bg-rose-700",
      accent: "orange",
    };
  }

  // ===== fallback nếu thêm ngành mới =====
  return {
    headerGradient: "",
    buttonBg: "",
    badgeBg: "",
    textColor: "",
    hoverText: "",
    hoverBg: "",
    statIconBg: "",
    statIconHover: "",
    statText: "",
    tabActive: "",
    tabHover: "",

    primary: "",
    gradient: "",
    light: "",
    text: "",
    border: "",
    badge: "",
    button: "",
    accent: "",
  };
};
