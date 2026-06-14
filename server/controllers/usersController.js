const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res) {
  try {
    const result = await pool.query(
      `SELECT u.id, u.surname, u.name, u.fathername, u.email, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения пользователей" });
  }
}

async function createUser(req, res) {
  const { surname, name, fathername, email, password, role_name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE role_name=$1",
      [role_name],
    );
    const roles_id = roleResult.rows[0]?.id || 2;

    const result = await pool.query(
      `INSERT INTO users (surname, name, fathername, email, password, roles_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, surname, name, fathername, email`,
      [surname, name, fathername, email, hashedPassword, roles_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка создания пользователя" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "Пользователь удален" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка удаления пользователя" });
  }
}

module.exports = { getAllUsers, createUser, deleteUser };
