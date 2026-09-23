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
          alert("Failed to load monitoring logs. Please check the backend.");
        });

      // Fetch dashboard statistics
      axios
        .get("http://localhost:5000/api/stats")
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch stats:", error);
          alert("Failed to load dashboard statistics. Please check the backend.");
        });

      // Fetch analytics
      axios
        .get("http://localhost:5000/api/analytics")
        .then((response) => {
          setAnalytics([...response.data].reverse());
        })
        .catch((error) => {
          console.error("Failed to fetch analytics:", error);
          alert("Failed to load analytics data. Please check the backend.");
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
          <section className="servers-page">

            <div className="servers-header">
              <div>
                <h1>Servers</h1>
                <p>
                  Monitor availability and response performance of your servers.
                </p>
              </div>

              <div className="server-count">
                <span>{servers.length}</span>
                <small>Monitored</small>
              </div>
            </div>

            <div className="servers-panel">

              <div className="servers-table-header">
                <span>SERVER</span>
                <span>ENDPOINT</span>
                <span>STATUS</span>
                <span>RESPONSE TIME</span>
              </div>

              {servers.length === 0 ? (
                <div className="empty-servers">
                  <div className="empty-icon">+</div>
                  <h3>No servers added yet</h3>
                  <p>
                    Add a server from the Dashboard to start monitoring.
                  </p>
                </div>
              ) : (
                servers.map((server) => (
                  <div className="server-item" key={server.id}>

                    <div className="server-info">
                      <div className="server-icon">
                        {server.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3>{server.name}</h3>
                        <span>Server ID #{server.id}</span>
                      </div>
                    </div>

                    <div className="server-url">
                      {server.url}
                    </div>

                    <div>
                      <span
                        className={
                          server.status === "Online"
                            ? "status-badge online"
                            : "status-badge offline"
                        }
                      >
                        <span className="status-dot"></span>
                        {server.status || "Checking..."}
                      </span>
                    </div>

                    <div className="response-time">
                      <strong>{server.response_time || 0} ms</strong>
                      <span>Latest check</span>
                    </div>

                  </div>
                ))
              )}

            </div>
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
                      HTTP {log.status_code} • {log.response_time} ms
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
                <h2>{stats.avgResponseTime || 0} ms</h2>
              </div>

            </section>

            {/* Add Server */}
            <section className="panel">
              <h2>Add Server</h2>

              <input
                type="text"
                placeholder="Server Name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Server URL"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
              />

              <button onClick={addServer}>
                Add Server
              </button>
            </section>

            {/* Improved Server Status */}
            <section className="panel dashboard-server-panel">

              <div className="dashboard-section-header">
                <div>
                  <h2>Server Status</h2>
                  <p>Live availability and response performance</p>
                </div>

                <span className="live-indicator">
                  <span></span>
                  Live Monitoring
                </span>
              </div>

              <div className="dashboard-server-header">
                <span>SERVER</span>
                <span>STATUS</span>
                <span>RESPONSE</span>
              </div>

              {servers.length === 0 ? (
                <div className="empty-dashboard-servers">
                  <h3>No servers added yet</h3>
                  <p>Add a server above to start monitoring.</p>
                </div>
              ) : (
                servers.map((server) => (
                  <div
                    className="dashboard-server-row"
                    key={server.id}
                  >

                    <div className="dashboard-server-info">
                      <div className="dashboard-server-icon">
                        {server.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3>{server.name}</h3>
                        <p>{server.url}</p>
                      </div>
                    </div>

                    <div>
                      <span
                        className={
                          server.status === "Online"
                            ? "dashboard-status online"
                            : "dashboard-status offline"
                        }
                      >
                        <span className="dashboard-status-dot"></span>
                        {server.status || "Checking..."}
                      </span>
                    </div>

                    <div className="dashboard-response">
                      <strong>
                        {server.response_time || 0} ms
                      </strong>
                      <span>latest check</span>
                    </div>

                  </div>
                ))
              )}

            </section>

            {/* Monitoring History */}
            <section className="panel monitoring-history-panel">

              <div className="history-section-header">
                <div>
                  <h2>Monitoring History</h2>
                  <p>Recent server checks and response performance</p>
                </div>

                <span className="history-count">
                  {logs.length} checks
                </span>
              </div>

              {logs.length === 0 ? (
                <div className="empty-history">
                  <div className="empty-history-icon">—</div>
                  <h3>No monitoring logs yet</h3>
                  <p>Logs will appear here after the first server check.</p>
                </div>
              ) : (
                <>
                  <div className="history-table-header">
                    <span>SERVER</span>
                    <span>STATUS</span>
                    <span>HTTP</span>
                    <span>RESPONSE</span>
                    <span>CHECKED AT</span>
                  </div>

                  {logs.map((log) => (
                    <div className="history-row" key={log.id}>

                      <div className="history-server">
                        <div className="history-server-icon">
                          {(log.name || "S").charAt(0).toUpperCase()}
                        </div>

                        <div className="history-server-info">
                          <strong>{log.name}</strong>
                          <span>{log.url}</span>
                        </div>
                      </div>

                      <div>
                        <span
                          className={
                            log.status === "Online"
                              ? "history-status online"
                              : "history-status offline"
                          }
                        >
                          <span className="history-status-dot"></span>
                          {log.status}
                        </span>
                      </div>

                      <div>
                        <span
                          className={
                            log.status_code
                              ? "http-badge success"
                              : "http-badge muted"
                          }
                        >
                          {log.status_code || "—"}
                        </span>
                      </div>

                      <div className="history-response">
                        <strong>{log.response_time || 0} ms</strong>
                        <span>response time</span>
                      </div>

                      <div className="history-time">
                        <strong>
                          {log.checked_at
                            ? new Date(log.checked_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                              })
                            : "—"}
                        </strong>
                        <span>latest check</span>
                      </div>

                    </div>
                  ))}
                </>
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
