import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import GuestCatalogPage from "./pages/GuestCatalogPage";
import ClientCatalogPage from "./pages/ClientCatalogPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ManagerOrdersPage from "./pages/ManagerOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import Header from "./components/Header";
import { CodeViewer } from "./pages/Cd";

function AppRoutes() {
  const { user } = useAuth();
  const role = user?.role_name;

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/code" element={<CodeViewer />} />
        <Route
          path="/catalog"
          element={
            !user ? (
              <GuestCatalogPage />
            ) : role === "client" ? (
              <ClientCatalogPage />
            ) : (
              <ClientCatalogPage />
            )
          }
        />
        <Route
          path="/my-orders"
          element={
            role === "client" ? <MyOrdersPage /> : <Navigate to="/catalog" />
          }
        />
        <Route
          path="/manager/orders"
          element={
            role === "manager" || role === "admin" ? (
              <ManagerOrdersPage />
            ) : (
              <Navigate to="/catalog" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            role === "admin" ? (
              <AdminProductsPage />
            ) : (
              <Navigate to="/catalog" />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            role === "admin" ? <AdminUsersPage /> : <Navigate to="/catalog" />
          }
        />
        <Route path="/" element={<Navigate to="/catalog" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
