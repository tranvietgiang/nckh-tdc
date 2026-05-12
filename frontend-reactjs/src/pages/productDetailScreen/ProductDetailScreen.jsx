import { useLocation } from "react-router-dom";
import { detectMajorKey } from "../../utils/detectMajorKey";
import useProductDetail from "../../hooks/useProduct/useProductDetail";

import useMajorName from "../../hooks/common/useMajorName";
import { getMajorTheme } from "../../utils/uploadProductScreen/uploadRegistry";

// page detail sẽ dựa vào major để render component detail tương ứng, nếu major không hợp lệ sẽ trả về not found
import NotFoundPage from "../notFoundScreen/NotFoundScreen";
import AIDetailScreen from "../../components/student-detail/AiDetail";
import ITDetailScreen from "../../components/student-detail/ItDetail";
import NetworkDetailScreen from "../../components/student-detail/NetworkDetail";
import GraphicDetailScreen from "../../components/student-detail/GraphicDetail";

export default function ProductDetailScreen() {
  const location = useLocation();
  const id = location.state?.productId;

  const { product, loading, error } = useProductDetail(id);
  const { majorName } = useMajorName(product?.major?.major_id);

  console.log(id);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">Có lỗi xảy ra</p>;
  if (!product) return <p>Sản phẩm không tồn tại</p>;

  console.log(majorName, product);
  // chờ majorName
  if (!majorName) return <p>Đang tải ngành...</p>;

  const theme = getMajorTheme(majorName);

  const props = {
    product,
    theme,
  };

  switch (detectMajorKey(majorName)) {
    case "ai":
      return <AIDetailScreen {...props} />;
    case "cntt":
      return <ITDetailScreen {...props} />;
    case "mmt":
      return <NetworkDetailScreen {...props} />;
    case "tkdh":
      return <GraphicDetailScreen {...props} />;
    default:
      return <NotFoundPage />;
  }
}
