const db = require("../db");
async function checkServer(url) {
  const startTime = Date.now();

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);

    const responseTime = Date.now() - startTime;

    return {
      url,
      status: "Online",
      statusCode: response.status,
      responseTime
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      url,
      status: "Offline",
      statusCode: null,
      responseTime
    };
  }
}

function startMonitoring(url, interval = 30000) {
  setInterval(async () => {
    const result = await checkServer(url);

    console.log(
      `Monitoring ${url} → ${result.status} → ${result.responseTime} ms`
    );

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
        } else {
          console.log("Monitoring log saved to database");
        }
      }
    );
  }, interval);
}

module.exports = { checkServer, startMonitoring };