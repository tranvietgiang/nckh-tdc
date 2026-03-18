import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import GuestRoute from "./guest.route";
import RoleRoutes from "./protected.routes";
import VisitorScreen from "../pages/VisitorScreen/VisitorScreen";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route path="/nckh-visitor" element={<VisitorScreen />} />

        <Route path="/*" element={<RoleRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
