// hooks/upload/useUploadNetworkForm.js
import useUploadBaseForm from "./useUploadBaseForm";
import {
  validateNetworkStep,
  initialNetworkFormData,
} from "../../utils/uploadProductScreen/validateUploadStep";

export default function useUploadNetworkForm() {
  return useUploadBaseForm({
    draftKey: "network_drafts",
    validateStep: validateNetworkStep,
    initialData: initialNetworkFormData,
    stepsConfig: [
      { id: 1, name: "Thông tin hệ thống", icon: "🌐" },
      { id: 2, name: "Topology & File", icon: "📁" },
      { id: 3, name: "Hoàn tất", icon: "🚀" },
    ],
  });
}
