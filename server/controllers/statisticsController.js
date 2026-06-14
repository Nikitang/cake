const pool = require("../config/db");

async function getStatistics(req, res) {
  try {
    const totalOrders = await pool.query("SELECT COUNT(*) FROM orders");

    const avgTime = await pool.query(
      `SELECT AVG(delivery_date - created_date) as avg_days
       FROM orders 
       WHERE status_id = 4 AND delivery_date IS NOT NULL`,
    );

    const byType = await pool.query(
      `SELECT c.category_name, COUNT(o.id) as count
       FROM orders o
       JOIN products_in_order pio ON o.id = pio.order_id
       JOIN products p ON pio.product_id = p.id
       JOIN categories c ON p.category = c.id
       GROUP BY c.category_name`,
    );

    res.json({
      totalOrders: parseInt(totalOrders.rows[0].count),
      avgDays: parseFloat(avgTime.rows[0].avg_days) || 0,
      byType: byType.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения статистики" });
  }
}

module.exports = { getStatistics };
