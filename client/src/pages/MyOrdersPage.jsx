import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/ordersAPI";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Мои заказы</h1>
      <table>
        <thead>
          <tr>
            <th>№ заказа</th>
            <th>Дата создания</th>
            <th>Дата доставки</th>
            <th>Статус</th>
            <th>Код получения</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.created_date).toLocaleDateString()}</td>
              <td>{new Date(o.delivery_date).toLocaleDateString()}</td>
              <td style={{ color: "#FC34C8", fontWeight: "bold" }}>
                {o.status}
              </td>
              <td>{o.receipt_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
