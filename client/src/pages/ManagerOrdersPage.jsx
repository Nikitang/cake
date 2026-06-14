import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  extendOrderDate,
} from "../services/ordersAPI";

export default function ManagerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ status: "", search: "" });

  useEffect(() => {
    getAllOrders().then((res) => setOrders(res.data));
  }, []);

  const handleStatusChange = async (id, status_id) => {
    await updateOrderStatus(id, status_id);
    const res = await getAllOrders();
    setOrders(res.data);
  };

  const handleExtend = async (id) => {
    const newDate = prompt("Введите новую дату доставки (ГГГГ-ММ-ДД)");
    if (newDate) {
      await extendOrderDate(id, newDate);
      const res = await getAllOrders();
      setOrders(res.data);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter.status && o.status !== filter.status) return false;
    if (filter.search) {
      const fullName = `${o.surname || ""} ${o.name || ""}`.toLowerCase();
      if (
        !fullName.includes(filter.search.toLowerCase()) &&
        o.id.toString() !== filter.search
      )
        return false;
    }
    return true;
  });

  return (
    <div className="container">
      <h1>Управление заказами (менеджер)</h1>
      <div className="filter-panel">
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">Все статусы</option>
          <option value="новый">Новый</option>
          <option value="в работе">В работе</option>
          <option value="готов">Готов</option>
          <option value="выдан">Выдан</option>
        </select>
        <input
          placeholder="Поиск по ФИО или номеру заказа"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Клиент</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>
                {o.surname} {o.name}
              </td>
              <td>{new Date(o.created_date).toLocaleDateString()}</td>
              <td style={{ color: "#FC34C8" }}>{o.status}</td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  value={o.status_id}
                >
                  <option value="1">новый</option>
                  <option value="2">в работе</option>
                  <option value="3">готов</option>
                  <option value="4">выдан</option>
                </select>
                <button onClick={() => handleExtend(o.id)}>
                  Продлить срок
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
