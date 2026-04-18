import useUploadBaseForm from "./useUploadBaseForm";

import {
  initialGraphicFormData,
  validateGraphicStep,
} from "../../utils/uploadProductScreen/validateUploadStep";

export default function useUploadGraphicForm() {
  return useUploadBaseForm({
    draftKey: "graphic_drafts",
    validateStep: validateGraphicStep,
    initialData: initialGraphicFormData,
    stepsConfig: [
      { id: 1, name: "Thiết kế", icon: "🎨" },
      { id: 2, name: "Mockup", icon: "🖼️" },
      { id: 3, name: "Hoàn tất", icon: "✅" },
    ],
  });
}
