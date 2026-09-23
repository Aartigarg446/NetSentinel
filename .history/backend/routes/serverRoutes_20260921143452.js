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
  const sql = `
    SELECT
      s.*,
      (
        SELECT ml.status
        FROM monitoring_logs ml
        WHERE ml.server_id = s.id
        ORDER BY ml.checked_at DESC
        LIMIT 1
      ) AS status,
      (
        SELECT ml.response_time
        FROM monitoring_logs ml
        WHERE ml.server_id = s.id
        ORDER BY ml.checked_at DESC
        LIMIT 1
      ) AS response_time
    FROM servers s
    ORDER BY s.id ASC
  `;

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
    LIMIT 10
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
router.get("/analytics", (req, res) => {
  const sql = `
    SELECT
      servers.name,
      monitoring_logs.response_time,
      monitoring_logs.checked_at
    FROM monitoring_logs
    JOIN servers
      ON monitoring_logs.server_id = servers.id
    ORDER BY monitoring_logs.checked_at DESC
    LIMIT 20
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch analytics data"
      });
    }

    res.json(results);
  });
});
router.get("/stats", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS totalRequests,
      ROUND(AVG(response_time), 0) AS avgResponseTime,
      (
        SELECT COUNT(*)
        FROM servers s
        WHERE (
          SELECT ml.status
          FROM monitoring_logs ml
          WHERE ml.server_id = s.id
          ORDER BY ml.checked_at DESC
          LIMIT 1
        ) = 'Online'
      ) AS onlineServers,
      (
        SELECT COUNT(*)
        FROM servers s
        WHERE (
          SELECT ml.status
          FROM monitoring_logs ml
          WHERE ml.server_id = s.id
          ORDER BY ml.checked_at DESC
          LIMIT 1
        ) = 'Offline'
      ) AS offlineServers
    FROM monitoring_logs;
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