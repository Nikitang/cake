import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productsAPI";

export default function ClientCatalogPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filters.search) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    if (filters.category)
      result = result.filter((p) => p.category_name === filters.category);
    if (filters.brand)
      result = result.filter((p) => p.brand_name === filters.brand);
    if (filters.minPrice)
      result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice));

    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name_asc")
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    setFilteredProducts(result);
  }, [filters, sortBy, products]);

  const categories = [
    ...new Set(products.map((p) => p.category_name).filter(Boolean)),
  ];
  const brands = [
    ...new Set(products.map((p) => p.brand_name).filter(Boolean)),
  ];

  return (
    <div className="container">
      <h1>🍰 Каталог тортов</h1>
      <div className="filter-panel">
        <input
          placeholder="Поиск"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">Все бренды</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Цена от"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Цена до"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Сортировка</option>
          <option value="price_asc">По возрастанию цены</option>
          <option value="price_desc">По убыванию цены</option>
          <option value="name_asc">По названию</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Бренд</th>
            <th>Скидка</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} ₽</td>
              <td>{p.category_name || "-"}</td>
              <td>{p.brand_name || "-"}</td>
              <td style={{ color: p.discount > 0 ? "#FC34C8" : "black" }}>
                {p.discount}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
