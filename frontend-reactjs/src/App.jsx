import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
