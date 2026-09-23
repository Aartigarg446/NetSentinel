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
  }, interval);
}

module.exports = { checkServer, startMonitoring };