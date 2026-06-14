import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role_name;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo">🍰 Сладкий рай</div>
      <div className="nav">
        <Link to="/catalog">Каталог</Link>
        <Link to="/code">K</Link>
        {role === "client" && <Link to="/my-orders">Мои заказы</Link>}
        {(role === "manager" || role === "admin") && (
          <Link to="/manager/orders">Управление заказами</Link>
        )}
        {role === "admin" && <Link to="/admin/products">Товары</Link>}
        {role === "admin" && <Link to="/admin/users">Пользователи</Link>}
        {user ? (
          <>
            <span style={{ margin: "0 10px" }}>
              Привет, {user.name || user.email}
            </span>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </div>
  );
}
