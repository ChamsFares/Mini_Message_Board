const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTableQery = `
CREATE TABLE IF NOT EXISTS messages (
id SERIAL PRIMARY KEY,
user_name VARCHAR(100) NOT NULL,
text TEXT NOT NULL,
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`;
const populateTableQuery = `
INSERT INTO messages (user_name, text) VALUES
('Amando', 'Hi there!'),
('Charles', 'Hello World!')
ON CONFLICT DO NOTHING`;

async function setupDatabase() {
  try {
    await pool.query(createTableQery);
    await pool.query(populateTableQuery);
    console.log("Database setup completed successfully");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
