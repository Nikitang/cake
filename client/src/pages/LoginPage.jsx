import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role_name === "admin") navigate("/admin/products");
      else if (user.role_name === "manager") navigate("/manager/orders");
      else navigate("/catalog");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: "#FC34C8" }}>Вход в систему</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => navigate("/catalog")}>Продолжить как гость</button>
    </div>
  );
}
