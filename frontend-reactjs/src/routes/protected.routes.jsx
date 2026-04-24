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
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default RoleRoutes;
