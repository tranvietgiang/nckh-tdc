import { Routes, Route, Navigate } from "react-router-dom";
import AdminScreen from "../pages/Admin/AdminScreen";
import StudentScreen from "../pages/Student/StudentScreen";
import TeacherScreen from "../pages/Teacher/TeacherScreen";
import ProtectedRoute from "./protected.route";
import { ROLE } from "../utils/constants";

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

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default RoleRoutes;
