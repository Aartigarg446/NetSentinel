const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "netsentinel"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("MySQL database connected successfully");

  const createServersTable = `
    CREATE TABLE IF NOT EXISTS servers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createLogsTable = `
    CREATE TABLE IF NOT EXISTS monitoring_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      server_id INT NOT NULL,
      status VARCHAR(20) NOT NULL,
      status_code INT NULL,
      response_time INT NULL,
      checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE
    )
  `;

  db.query(createServersTable, (err) => {
    if (err) {
      console.error("Failed to create servers table:", err.message);
      return;
    }

    console.log("servers table ready");

    db.query(createLogsTable, (err) => {
      if (err) {
        console.error("Failed to create monitoring_logs table:", err.message);
        return;
      }

      console.log("monitoring_logs table ready");
    });
  });
});

module.exports = db;