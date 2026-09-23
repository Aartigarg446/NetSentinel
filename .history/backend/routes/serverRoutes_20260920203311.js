const express = require("express");
const router = express.Router();
const db = require("../db");
const { checkServer } = require("../services/monitorService");

router.post("/servers", (req, res) => {
  const { name, url } = req.body;

  if (!name || !url) {
    return res.status(400).json({
      message: "Name and URL are required"
    });
  }

  const sql = "INSERT INTO servers (name, url) VALUES (?, ?)";

  db.query(sql, [name, url], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to add server"
      });
    }

    res.status(201).json({
      message: "Server added successfully",
      serverId: result.insertId
    });
  });
});
router.get("/test", (req, res) => {
  res.json({
    message: "Server routes are working"
  });
});
router.get("/servers", (req, res) => {
  const sql = "SELECT * FROM servers";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch servers"
      });
    }

    res.json(results);
  });
});
router.get("/monitor", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      message: "URL is required"
    });
  }

  const result = await checkServer(url);
  const sql = `
  INSERT INTO monitoring_logs
  (server_id, status, status_code, response_time)
  VALUES (?, ?, ?, ?)
`;
db.query(
  sql,
  [1, result.status, result.statusCode, result.responseTime],
  (err) => {
    if (err) {
      console.error("Failed to save monitoring log:", err.message);
    }
  }
);

  res.json(result);
});
router.get("/logs", (req, res) => {
  const sql = `
    SELECT 
      monitoring_logs.*,
      servers.name,
      servers.url
    FROM monitoring_logs
    JOIN servers
      ON monitoring_logs.server_id = servers.id
    ORDER BY monitoring_logs.checked_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch monitoring logs"
      });
    }

    res.json(results);
  });
});
router.get("/stats", (req, res) => {
  const sql = `
    SELECT
      SUM(status = 'Online') AS onlineServers,
      SUM(status = 'Offline') AS offlineServers,
      COUNT(*) AS totalRequests,
      ROUND(AVG(response_time), 0) AS avgResponseTime
    FROM monitoring_logs
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch dashboard statistics"
      });
    }

    res.json(results[0]);
  });
});
module.exports = router;