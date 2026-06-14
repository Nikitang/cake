export const CodeViewer = () => {
  return (
    <div className="container">
      {/* ========== БЭКЕНД ========== */}

      {/* 1. server/package.json */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/package.json</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code1').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code1" style={{ margin: 0, overflow: "auto" }}>{`{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`}</pre>
      </div>

      {/* 2. server/.env */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/.env</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code2').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code2" style={{ margin: 0 }}>{`PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=Gerasimenya_demo_2026
JWT_SECRET=exam_secret_key_2024`}</pre>
      </div>

      {/* 3. server/config/db.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/config/db.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code3').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code3" style={{ margin: 0 }}>{`const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err) => {
  if (err) console.error('Ошибка подключения к PostgreSQL:', err.stack);
  else console.log('✅ Подключено к базе');
});

module.exports = pool;`}</pre>
      </div>

      {/* 4. server/middleware/auth.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/middleware/auth.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code4').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code4"
          style={{ margin: 0 }}
        >{`const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Токен недействителен' });
  }
}

function checkRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Не авторизован' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }
    next();
  };
}

module.exports = { verifyToken, checkRole };`}</pre>
      </div>

      {/* 5. server/controllers/authController.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/controllers/authController.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code5').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code5"
          style={{ margin: 0 }}
        >{`const pool = require('../config/db');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      \`SELECT u.id, u.email, u.password, u.surname, u.name, u.fathername, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id
       WHERE u.email = \$1\`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = result.rows[0];
    
    // Прямое сравнение (пароли в БД в открытом виде)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    delete user.password;
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

async function getProfile(req, res) {
  try {
    const result = await pool.query(
      \`SELECT u.id, u.email, u.surname, u.name, u.fathername, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id
       WHERE u.id = \$1\`,
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения профиля' });
  }
}

module.exports = { login, getProfile };`}</pre>
      </div>

      {/* 6. server/controllers/productsController.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/controllers/productsController.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code6').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code6"
          style={{ margin: 0 }}
        >{`const pool = require('../config/db');

async function getAllProducts(req, res) {
  try {
    const result = await pool.query(
      \`SELECT p.*, b.brand_name, c.category_name, u.unit_name
       FROM products p
       LEFT JOIN brands b ON p.brand = b.id
       LEFT JOIN categories c ON p.category = c.id
       LEFT JOIN units u ON p.unit = u.id
       ORDER BY p.id\`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения товаров' });
  }
}

async function createProduct(req, res) {
  const { article, name, unit, price, brand, type, category, discount, count, description } = req.body;
  try {
    const result = await pool.query(
      \`INSERT INTO products (article, name, unit, price, brand, type, category, discount, count, description)
       VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10) RETURNING *\`,
      [article, name, unit, price, brand, type, category, discount || 0, count || 0, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания товара' });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { article, name, unit, price, brand, type, category, discount, count, description } = req.body;
  try {
    const result = await pool.query(
      \`UPDATE products SET article=\$1, name=\$2, unit=\$3, price=\$4, brand=\$5, type=\$6, category=\$7, discount=\$8, count=\$9, description=\$10
       WHERE id=\$11 RETURNING *\`,
      [article, name, unit, price, brand, type, category, discount, count, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка обновления товара' });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.json({ message: 'Товар удален' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления товара' });
  }
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };`}</pre>
      </div>

      {/* 7. server/controllers/ordersController.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/controllers/ordersController.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code7').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code7"
          style={{ margin: 0 }}
        >{`const pool = require('../config/db');

async function getUserOrders(req, res) {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      \`SELECT o.*, os.status 
       FROM orders o 
       JOIN order_status os ON o.status_id = os.id 
       WHERE o.user_id = \$1 
       ORDER BY o.created_date DESC\`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
}

async function getAllOrders(req, res) {
  try {
    const result = await pool.query(
      \`SELECT o.*, os.status, u.surname, u.name, u.fathername
       FROM orders o
       JOIN order_status os ON o.status_id = os.id
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_date DESC\`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
}

async function createOrder(req, res) {
  const { delivery_date, pickup_id, receipt_code } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      \`INSERT INTO orders (created_date, delivery_date, pickup_id, user_id, receipt_code, status_id)
       VALUES (CURRENT_DATE, \$1, \$2, \$3, \$4, 1) RETURNING *\`,
      [delivery_date, pickup_id, userId, receipt_code]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания заказа' });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status_id } = req.body;
  try {
    await pool.query('UPDATE orders SET status_id=$1 WHERE id=$2', [status_id, id]);
    res.json({ message: 'Статус заказа обновлен' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка обновления статуса' });
  }
}

async function extendDeliveryDate(req, res) {
  const { id } = req.params;
  const { new_delivery_date } = req.body;
  try {
    await pool.query('UPDATE orders SET delivery_date=$1 WHERE id=$2', [new_delivery_date, id]);
    res.json({ message: 'Срок выполнения продлен' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка продления срока' });
  }
}

module.exports = { getUserOrders, getAllOrders, createOrder, updateOrderStatus, extendDeliveryDate };`}</pre>
      </div>

      {/* 8. server/controllers/usersController.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/controllers/usersController.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code8').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code8"
          style={{ margin: 0 }}
        >{`const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res) {
  try {
    const result = await pool.query(
      \`SELECT u.id, u.surname, u.name, u.fathername, u.email, r.role_name
       FROM users u 
       JOIN roles r ON u.roles_id = r.id\`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения пользователей' });
  }
}

async function createUser(req, res) {
  const { surname, name, fathername, email, password, role_name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const roleResult = await pool.query('SELECT id FROM roles WHERE role_name=$1', [role_name]);
    const roles_id = roleResult.rows[0]?.id || 2;
    
    const result = await pool.query(
      \`INSERT INTO users (surname, name, fathername, email, password, roles_id)
       VALUES (\$1, \$2, \$3, \$4, \$5, \$6) RETURNING id, surname, name, fathername, email\`,
      [surname, name, fathername, email, hashedPassword, roles_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания пользователя' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: 'Пользователь удален' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления пользователя' });
  }
}

module.exports = { getAllUsers, createUser, deleteUser };`}</pre>
      </div>

      {/* 9. server/routes/authRoutes.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/routes/authRoutes.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code9').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code9"
          style={{ margin: 0 }}
        >{`const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;`}</pre>
      </div>

      {/* 10. server/routes/productsRoutes.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/routes/productsRoutes.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code10').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code10"
          style={{ margin: 0 }}
        >{`const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const { verifyToken, checkRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', verifyToken, checkRole(['admin']), createProduct);
router.put('/:id', verifyToken, checkRole(['admin']), updateProduct);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteProduct);

module.exports = router;`}</pre>
      </div>

      {/* 11. server/routes/ordersRoutes.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/routes/ordersRoutes.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code11').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code11"
          style={{ margin: 0 }}
        >{`const express = require('express');
const { getUserOrders, getAllOrders, createOrder, updateOrderStatus, extendDeliveryDate } = require('../controllers/ordersController');
const { verifyToken, checkRole } = require('../middleware/auth');
const router = express.Router();

router.get('/my', verifyToken, getUserOrders);
router.get('/all', verifyToken, checkRole(['manager', 'admin']), getAllOrders);
router.post('/', verifyToken, createOrder);
router.put('/:id/status', verifyToken, checkRole(['manager', 'admin']), updateOrderStatus);
router.put('/:id/extend', verifyToken, checkRole(['manager', 'admin']), extendDeliveryDate);

module.exports = router;`}</pre>
      </div>

      {/* 12. server/routes/usersRoutes.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/routes/usersRoutes.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code12').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code12"
          style={{ margin: 0 }}
        >{`const express = require('express');
const { getAllUsers, createUser, deleteUser } = require('../controllers/usersController');
const { verifyToken, checkRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, checkRole(['admin']), getAllUsers);
router.post('/', verifyToken, checkRole(['admin']), createUser);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteUser);

module.exports = router;`}</pre>
      </div>

      {/* 13. server/index.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/index.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code13').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code13"
          style={{ margin: 0 }}
        >{`const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productsRoutes'));
app.use('/api/orders', require('./routes/ordersRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/statistics', require('./routes/statisticsRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер работает' });
});

app.listen(PORT, () => {
  console.log(\`Сервер запущен на порту \${PORT}\`);
});`}</pre>
      </div>

      {/* 14. server/routes/statisticsRoutes.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 server/routes/statisticsRoutes.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code14').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre
          id="code14"
          style={{ margin: 0 }}
        >{`const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const { verifyToken, checkRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, checkRole(['admin', 'manager']), getStatistics);

module.exports = router;`}</pre>
      </div>

      {/* ========== ФРОНТЕНД ========== */}

      {/* 15. client/package.json */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 client/package.json</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code15').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code15" style={{ margin: 0 }}>{`{
  "name": "client",
  "version": "1.0.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}`}</pre>
      </div>

      {/* 16. client/src/App.js */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 client/src/App.js</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code16').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code16" style={{ margin: 0 }}>{`import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import GuestCatalogPage from './pages/GuestCatalogPage';
import ClientCatalogPage from './pages/ClientCatalogPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ManagerOrdersPage from './pages/ManagerOrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import CodeViewer from './components/CodeViewer';
import Header from './components/Header';

function AppRoutes() {
    const { user } = useAuth();
    const role = user?.role_name;

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/code" element={<CodeViewer />} />
                <Route path="/catalog" element={
                    !user ? <GuestCatalogPage /> :
                    role === 'client' ? <ClientCatalogPage /> :
                    <ClientCatalogPage />
                } />
                <Route path="/my-orders" element={
                    role === 'client' ? <MyOrdersPage /> : <Navigate to="/catalog" />
                } />
                <Route path="/manager/orders" element={
                    role === 'manager' || role === 'admin' ? <ManagerOrdersPage /> : <Navigate to="/catalog" />
                } />
                <Route path="/admin/products" element={
                    role === 'admin' ? <AdminProductsPage /> : <Navigate to="/catalog" />
                } />
                <Route path="/admin/users" element={
                    role === 'admin' ? <AdminUsersPage /> : <Navigate to="/catalog" />
                } />
                <Route path="/" element={<Navigate to="/catalog" />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;`}</pre>
      </div>

      {/* 17. client/src/App.css */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 client/src/App.css</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code17').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code17" style={{ margin: 0 }}>{`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Times New Roman', Times, serif;
    background-color: #FFFFFF;
    color: #000;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

button {
    background-color: #FC34C8;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'Times New Roman', Times, serif;
    border-radius: 5px;
    margin: 5px;
}

button:hover {
    background-color: #31EBFF;
    color: #000;
}

input, select, textarea {
    padding: 8px;
    margin: 5px 5px 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Times New Roman', Times, serif;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #FC34C8;
    color: white;
}

.error {
    color: red;
    margin: 10px 0;
}

.success {
    color: green;
    margin: 10px 0;
}

.header {
    background-color: #FC34C8;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.nav a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
}

.nav a:hover {
    color: #31EBFF;
}

.code-viewer {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    overflow-x: auto;
}

.code-viewer pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
}

.section-title {
    background: #FC34C8;
    color: white;
    padding: 10px;
    margin: 20px 0 10px 0;
    border-radius: 5px;
}`}</pre>
      </div>

      {/* 18. client/src/components/Header.jsx */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📁 client/src/components/Header.jsx</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code18').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code18" style={{ margin: 0 }}>{`import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const role = user?.role_name;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="header">
            <div className="logo">🍰 Сладкий рай</div>
            <div className="nav">
                <Link to="/catalog">Каталог</Link>
                <Link to="/code">📄 Код проекта</Link>
                {role === 'client' && <Link to="/my-orders">Мои заказы</Link>}
                {(role === 'manager' || role === 'admin') && <Link to="/manager/orders">Управление заказами</Link>}
                {role === 'admin' && <Link to="/admin/products">Товары</Link>}
                {role === 'admin' && <Link to="/admin/users">Пользователи</Link>}
                {user ? (
                    <>
                        <span style={{ margin: '0 10px' }}>Привет, {user.surname || user.email}</span>
                        <button onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </div>
        </div>
    );
}`}</pre>
      </div>

      {/* 19. Команды установки */}
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            background: "#FC34C8",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>📦 КОМАНДЫ ДЛЯ УСТАНОВКИ ЗАВИСИМОСТЕЙ</strong>
          <button
            onclick="navigator.clipboard.writeText(document.getElementById('code19').innerText)"
            style={{
              float: "right",
              background: "#31EBFF",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            📋 Копировать
          </button>
        </div>
        <pre id="code19" style={{ margin: 0 }}>{`# Бэкенд (папка server)
cd server
npm install express pg jsonwebtoken dotenv cors
npm install -D nodemon

# Фронтенд (папка client) - CRA
cd client
npm install react-router-dom axios

# Запуск
# Терминал 1: cd server && npm run dev
# Терминал 2: cd client && npm start`}</pre>
      </div>
    </div>
  );
};
