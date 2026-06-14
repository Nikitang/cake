const pool = require("../config/db");

async function getAllProducts(req, res) {
  try {
    const result = await pool.query(
      `SELECT p.*, b.brand_name, c.category_name, u.unit_name
       FROM products p
       LEFT JOIN brands b ON p.brand = b.id
       LEFT JOIN categories c ON p.category = c.id
       LEFT JOIN units u ON p.unit = u.id
       ORDER BY p.id`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения товаров" });
  }
}

async function createProduct(req, res) {
  const {
    article,
    name,
    unit,
    price,
    brand,
    type,
    category,
    discount,
    count,
    description,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (article, name, unit, price, brand, type, category, discount, count, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        article,
        name,
        unit,
        price,
        brand,
        type,
        category,
        discount || 0,
        count || 0,
        description,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка создания товара" });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    article,
    name,
    unit,
    price,
    brand,
    type,
    category,
    discount,
    count,
    description,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET article=$1, name=$2, unit=$3, price=$4, brand=$5, type=$6, category=$7, discount=$8, count=$9, description=$10
       WHERE id=$11 RETURNING *`,
      [
        article,
        name,
        unit,
        price,
        brand,
        type,
        category,
        discount,
        count,
        description,
        id,
      ],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка обновления товара" });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ message: "Товар удален" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка удаления товара" });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
