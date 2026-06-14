import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productsAPI";

export default function GuestCatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h1>🍰 Каталог тортов</h1>
      <p style={{ color: "#FC34C8" }}>Режим гостя — фильтры недоступны</p>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Бренд</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} ₽</td>
              <td>{p.category_name || "-"}</td>
              <td>{p.brand_name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
