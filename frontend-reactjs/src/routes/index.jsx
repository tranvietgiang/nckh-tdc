import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RoleRoutes from "./role.route";
import GuestRoute from "./guest.route";
import VisitorScreen from "../pages/VisitorScreen/VisitorScreen";
import UploadProductScreen from "../pages/UploadProductScreen/UploadProductScreen";

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

          {/*Kiểm tra quyền và đưa đến trang đúng với quyền  */}
        <Route path="/*" element={<RoleRoutes />} />

          {/*đường link cho người dùng tham quan website   */}
        <Route path="/nckh-visitor" element={<VisitorScreen />} />

        <Route path="/upload-product" element={<UploadProductScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
