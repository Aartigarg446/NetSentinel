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

async function monitorAllServers() {
  db.query("SELECT id, url FROM servers", async (err, servers) => {
    if (err) {
      console.error("Failed to fetch servers:", err.message);
      return;
    }

    for (const server of servers) {
      const result = await checkServer(server.url);

      console.log(
        `Monitoring ${server.url} → ${result.status} → ${result.responseTime} ms`
      );

      const sql = `
        INSERT INTO monitoring_logs
        (server_id, status, status_code, response_time)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        sql,
        [server.id, result.status, result.statusCode, result.responseTime],
        (err) => {
          if (err) {
            console.error("Failed to save monitoring log:", err.message);
          } else {
            console.log(
              `Log saved for server ID ${server.id}`
            );
          }
        }
      );
    }
  });
}

function startMonitoring(interval = 30000) {
  monitorAllServers();

  setInterval(() => {
    monitorAllServers();
  }, interval);
}

module.exports = {
  checkServer,
  startMonitoring
};