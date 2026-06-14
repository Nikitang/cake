const pool = require("../config/db");

async function getUserOrders(req, res) {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT o.*, os.status 
       FROM orders o 
       JOIN order_status os ON o.status_id = os.id 
       WHERE o.user_id = $1 
       ORDER BY o.created_date DESC`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения заказов" });
  }
}

async function getAllOrders(req, res) {
  try {
    const result = await pool.query(
      `SELECT o.*, os.status, u.surname, u.name, u.fathername
       FROM orders o
       JOIN order_status os ON o.status_id = os.id
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_date DESC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения заказов" });
  }
}

async function createOrder(req, res) {
  const { delivery_date, pickup_id, receipt_code } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO orders (created_date, delivery_date, pickup_id, user_id, receipt_code, status_id)
       VALUES (CURRENT_DATE, $1, $2, $3, $4, 1) RETURNING *`,
      [delivery_date, pickup_id, userId, receipt_code],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка создания заказа" });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status_id } = req.body;
  try {
    await pool.query("UPDATE orders SET status_id=$1 WHERE id=$2", [
      status_id,
      id,
    ]);
    res.json({ message: "Статус заказа обновлен" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка обновления статуса" });
  }
}

async function extendDeliveryDate(req, res) {
  const { id } = req.params;
  const { new_delivery_date } = req.body;
  try {
    await pool.query("UPDATE orders SET delivery_date=$1 WHERE id=$2", [
      new_delivery_date,
      id,
    ]);
    res.json({ message: "Срок выполнения продлен" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка продления срока" });
  }
}

module.exports = {
  getUserOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
  extendDeliveryDate,
};
