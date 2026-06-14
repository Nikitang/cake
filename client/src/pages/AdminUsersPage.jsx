import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    surname: "",
    name: "",
    fathername: "",
    email: "",
    password: "",
    role_name: "client",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    setForm({
      surname: "",
      name: "",
      fathername: "",
      email: "",
      password: "",
      role_name: "client",
    });
    await loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить пользователя?")) {
      await api.delete(`/users/${id}`);
      await loadUsers();
    }
  };

  return (
    <div className="container">
      <h1>Управление пользователями (админ)</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Фамилия"
          value={form.surname}
          onChange={(e) => setForm({ ...form, surname: e.target.value })}
        />
        <input
          placeholder="Имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Отчество"
          value={form.fathername}
          onChange={(e) => setForm({ ...form, fathername: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.role_name}
          onChange={(e) => setForm({ ...form, role_name: e.target.value })}
        >
          <option value="client">Клиент</option>
          <option value="manager">Менеджер</option>
          <option value="admin">Администратор</option>
        </select>
        <button type="submit">Добавить</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                {u.surname} {u.name} {u.fathername || ""}
              </td>
              <td>{u.email}</td>
              <td>{u.role_name}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
