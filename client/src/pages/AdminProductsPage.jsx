import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsAPI";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    article: "",
    name: "",
    price: "",
    brand: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProduct(editing, form);
    } else {
      await createProduct(form);
    }
    setEditing(null);
    setForm({
      article: "",
      name: "",
      price: "",
      brand: "",
      category: "",
      description: "",
    });
    await loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить товар?")) {
      await deleteProduct(id);
      await loadProducts();
    }
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm(product);
  };

  return (
    <div className="container">
      <h1>Управление товарами (админ)</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Артикул"
          value={form.article}
          onChange={(e) => setForm({ ...form, article: e.target.value })}
        />
        <input
          placeholder="Название"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Цена"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Бренд ID"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          placeholder="Категория ID"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editing ? "Обновить" : "Добавить"}</button>
        {editing && (
          <button
            onClick={() => {
              setEditing(null);
              setForm({});
            }}
          >
            Отмена
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Артикул</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.article}</td>
              <td>{p.name}</td>
              <td>{p.price} ₽</td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
