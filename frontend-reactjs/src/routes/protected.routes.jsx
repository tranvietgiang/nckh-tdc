import { Routes, Route, Navigate } from "react-router-dom";
import AdminScreen from "../pages/admin/AdminScreen";
import StudentScreen from "../pages/student/StudentScreen";
import UploadProductScreen from "../pages/uploadProductScreen/UploadProductScreen";
import ProductDetailScreen from "../pages/productDetailScreen/ProductDetailScreen";
import NotFoundScreen from "../pages/notFoundScreen/NotFoundScreen";
import ProtectedRoute from "./protected.route";
import { ROLE } from "../utils/constants";
import TeacherProductDetailScreen from "../pages/ProductDetailScreen/TeacherProductDetailScreen";
import TeacherScreen from "../pages/teacher/TeacherScreen";
// import NewProduct from "../pages/uploadProductScreen/NewProduct";
// import UploadProductForm_AI from "../components/uploadProductScreen/UploadProductForm_AI";
// import UploadProductForm_Graphic from "../components/uploadProductScreen/UploadProductForm_Graphic";
// import UploadProductForm_Network from "../components/uploadProductScreen/UploadProductForm_Network";

function RoleRoutes() {
  return (
    <Routes>
      <Route
        path="/nckh-admin"
        element={
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <AdminScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nckh-student"
        element={
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <StudentScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nckh-teacher"
        element={
          <ProtectedRoute allowedRoles={[ROLE.TEACHER]}>
            <TeacherScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-product"
        element={
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <UploadProductScreen />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/upload-product-ai"
        element={
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <NewProduct />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/product-detail"
        element={
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <ProductDetailScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product-detail-teacher"
        element={
          <ProtectedRoute allowedRoles={[ROLE.TEACHER]}>
            <TeacherProductDetailScreen />
          </ProtectedRoute>
        }
      />

      {/* 404 Page - luôn đặt ở cuối cùng */}
      <Route path="/not-found" element={<NotFoundScreen />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default RoleRoutes;
