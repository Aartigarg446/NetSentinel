import axios from "axios";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./App.css";

function App() {
  const [servers, setServers] = useState([]);
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [serverName, setServerName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");

  const addServer = () => {
    if (!serverName || !serverUrl) {
  alert("Please enter server name and URL");
  return;
}
try {
  new URL(serverUrl);
} catch {
  alert("Please enter a valid URL");
  return;
}
    axios
      .post("http://localhost:5000/api/servers", {
        name: serverName,
        url: serverUrl
      })
      .then((response) => {
        console.log(response.data);

        setServerName("");
        setServerUrl("");

        axios
          .get("http://localhost:5000/api/servers")
          .then((response) => {
            setServers(response.data);
          })
          .catch((error) => {
            console.error("Failed to refresh servers:", error);
          });
      })
      .catch((error) => {
  console.error("Failed to add server:", error);
  alert("Failed to add server. Please check the backend.");
});
  };

  useEffect(() => {
    const fetchDashboardData = () => {
      // Fetch servers
      axios
        .get("http://localhost:5000/api/servers")
        .then((response) => {
          setServers(response.data);
        })
        .catch((error) => {
  console.error("Failed to fetch servers:", error);
  alert("Failed to load servers. Please check the backend.");
});
      // Fetch logs
      axios
        .get("http://localhost:5000/api/logs")
        .then((response) => {
          setLogs(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch logs:", error);
        });

      // Fetch dashboard statistics
      axios
        .get("http://localhost:5000/api/stats")
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch stats:", error);
        });

      // Fetch analytics
      axios
        .get("http://localhost:5000/api/analytics")
        .then((response) => {
          setAnalytics([...response.data].reverse());
        })
        .catch((error) => {
          console.error("Failed to fetch analytics:", error);
        });
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>NetSentinel</h2>

        <nav>
          <p
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
          >
            Dashboard
          </p>

          <p
            className={activePage === "Servers" ? "active" : ""}
            onClick={() => setActivePage("Servers")}
          >
            Servers
          </p>

          <p
            className={activePage === "Logs" ? "active" : ""}
            onClick={() => setActivePage("Logs")}
          >
            Logs
          </p>

          <p
            className={activePage === "Analytics" ? "active" : ""}
            onClick={() => setActivePage("Analytics")}
          >
            Analytics
          </p>
        </nav>
      </aside>

      <main className="main">

        {/* Servers Page */}
        {activePage === "Servers" && (
          <section className="panel">
            <h2>Servers</h2>

            {servers.length === 0 ? (
              <p>No servers added yet.</p>
            ) : (
              servers.map((server) => (
                <div className="server-row" key={server.id}>
                  <div>
                    <h3>{server.name}</h3>
                    <p>{server.url}</p>
                  </div>

                  <div>
                    <strong>
                      {server.status || "Checking..."}
                    </strong>

                    <p>
                      {server.response_time || 0} ms
                    </p>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* Logs Page */}
        {activePage === "Logs" && (
          <section className="panel">
            <h2>Monitoring Logs</h2>

            {logs.length === 0 ? (
              <p>No monitoring logs yet.</p>
            ) : (
              logs.map((log) => (
                <div className="server-row" key={log.id}>
                  <div>
                    <h3>{log.name}</h3>
                    <p>{log.url}</p>
                  </div>

                  <div>
                    <strong>{log.status}</strong>

                    <p>
                      HTTP {log.status_code} •{" "}
                      {log.response_time} ms
                    </p>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* Analytics Page */}
        {activePage === "Analytics" && (
          <section className="panel">
            <h2>Response Time Analytics</h2>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="checked_at"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  }
                  interval="preserveStartEnd"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="response_time"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* Dashboard Page */}
        {activePage === "Dashboard" && (
          <>
            <header>
              <h1>Dashboard</h1>
              <p>HTTP Server Monitoring & Analytics</p>
            </header>

            {/* Statistics Cards */}
            <section className="cards">

              <div className="card">
                <span>Online Servers</span>
                <h2>{stats.onlineServers || 0}</h2>
              </div>

              <div className="card">
                <span>Offline Servers</span>
                <h2>{stats.offlineServers || 0}</h2>
              </div>

              <div className="card">
                <span>Total Requests</span>
                <h2>{stats.totalRequests || 0}</h2>
              </div>

              <div className="card">
                <span>Avg Response Time</span>
                <h2>
                  {stats.avgResponseTime || 0} ms
                </h2>
              </div>

            </section>

            {/* Add Server */}
            <section className="panel">
              <h2>Add Server</h2>

              <input
                type="text"
                placeholder="Server Name"
                value={serverName}
                onChange={(e) =>
                  setServerName(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Server URL"
                value={serverUrl}
                onChange={(e) =>
                  setServerUrl(e.target.value)
                }
              />

              <button onClick={addServer}>
                Add Server
              </button>
            </section>

            {/* Server Status */}
            <section className="panel">
              <h2>Server Status</h2>

              {servers.length === 0 ? (
                <p>No servers added yet.</p>
              ) : (
                servers.map((server) => (
                  <div
                    className="server-row"
                    key={server.id}
                  >
                    <div>
                      <h3>{server.name}</h3>
                      <p>{server.url}</p>
                    </div>

                    <div>
                      <strong>
                        {server.status || "Checking..."}
                      </strong>

                      <p>
                        {server.response_time || 0} ms
                      </p>
                    </div>
                  </div>
                ))
              )}
            </section>

            {/* Monitoring History */}
            <section className="panel">
              <h2>Monitoring History</h2>

              {logs.length === 0 ? (
                <p>No monitoring logs yet.</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id}>
                    <h3>{log.name}</h3>

                    <p>
                      Status: {log.status}
                    </p>

                    <p>
                      HTTP Status: {log.status_code}
                    </p>

                    <p>
                      Response Time: {log.response_time} ms
                    </p>
                  </div>
                ))
              )}
            </section>

            {/* Response Time Analytics */}
            <section className="panel">
              <h2>Response Time Analytics</h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={analytics}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="checked_at"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit"
                        }
                      )
                    }
                    interval="preserveStartEnd"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="response_time"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />

                </LineChart>
              </ResponsiveContainer>
            </section>

          </>
        )}

      </main>
    </div>
  );
}

export default App;