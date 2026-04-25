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
      <div className="min-h-screen flex items-center justify-center text-lg">
        Đang tải...
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
