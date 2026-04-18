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
