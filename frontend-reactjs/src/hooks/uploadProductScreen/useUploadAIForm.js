import useUploadBaseForm from "./useUploadBaseForm";

import {
  initialAIFormData,
  validateAIStep,
} from "../../utils/uploadProductScreen/validateUploadStep";

export default function useUploadAIForm() {
  return useUploadBaseForm({
    draftKey: "ai_drafts",
    validateStep: validateAIStep,
    initialData: initialAIFormData,
    stepsConfig: [
      { id: 1, name: "Thông tin mô hình", icon: "🤖" },
      { id: 2, name: "Dataset", icon: "📁" },
      { id: 3, name: "Xuất bản", icon: "🚀" },
    ],
  });
}
