import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RoleRoutes from "./role.route";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/*" element={<RoleRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
