const pool = require("../config/db");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT u.id, u.email, u.password, u.surname, u.name, u.fathername, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id
       WHERE u.email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const user = result.rows[0];

    // ПРЯМОЕ СРАВНЕНИЕ паролей (без bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    delete user.password;
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

async function getProfile(req, res) {
  try {
    const result = await pool.query(
      `SELECT u.id, u.email, u.surname, u.name, u.fathername, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id
       WHERE u.id = $1`,
      [req.user.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения профиля" });
  }
}

module.exports = { login, getProfile };
