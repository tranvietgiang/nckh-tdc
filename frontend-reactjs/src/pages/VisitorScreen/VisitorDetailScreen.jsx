import React from "react";
import useVisitorProduct from "../../hooks/useProduct/useVisitorDetail";
import { detectMajorKey } from "../../utils/detectMajorKey";
import { useLocation } from "react-router-dom";

// Import 4 page ngành
import AIDetailScreen from "./MajorDetailForVisitor/AIDetailScreen";
import ITDetailScreen from "./MajorDetailForVisitor/ITDetailScreen";
import NetworkDetailScreen from "./MajorDetailForVisitor/NetworkDetailScreen";
import GraphicDetailScreen from "./MajorDetailForVisitor/GraphicDetailScreen";

import useMajorName from "../../hooks/common/useMajorName";
import { getMajorTheme } from "../../utils/uploadProductScreen/uploadRegistry";
import NotFoundScreen from "../../pages/notFoundScreen/NotFoundScreen";

export default function VisitorDetailScreen() {
  const location = useLocation();
  const id = location.state?.productId;

  const { productVisitorDetail, loadingVisitorDetail, errorVisitorDetail } =
    useVisitorProduct(id);

  const { majorName } = useMajorName(productVisitorDetail?.major_id);
  const theme = getMajorTheme(majorName);

  console.log(productVisitorDetail?.major_id);

  console.log("majorName", majorName);

  console.log(theme);

  // loading
  if (loadingVisitorDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div
            className={`w-16 h-16 border-4 border-${theme?.primary || "blue"}-600 border-t-transparent rounded-full animate-spin mx-auto mb-4`}
          ></div>
          <p className="text-gray-600 flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  // error
  if (errorVisitorDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Lỗi tải dữ liệu
      </div>
    );
  }

  // chưa có data
  if (!productVisitorDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Không có dữ liệu
      </div>
    );
  }

  const value = productVisitorDetail?.major_code || productVisitorDetail?.major;
  // detect major từ tên ngành
  const majorKey = detectMajorKey(value);

  console.log("majorName", majorName);
  console.log("productVisitorDetail", productVisitorDetail);
  const props = {
    productVisitorDetail,
    loadingVisitorDetail,
    errorVisitorDetail,
    theme,
  };

  switch (majorKey) {
    case "ai":
      return <AIDetailScreen {...props} />;

    case "cntt":
      return <ITDetailScreen {...props} />;

    case "mmt":
      return <NetworkDetailScreen {...props} />;

    case "tkdh":
      return <GraphicDetailScreen {...props} />;

    default:
      return <NotFoundScreen />;
  }
}
