import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Admin/Dashboard";
import ProtectedRoute from "./protected.route";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
