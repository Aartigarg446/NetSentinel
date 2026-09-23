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
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchDashboardData = () => {
    axios
      .get("http://localhost:5000/api/servers")
      .then((response) => {
        setServers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch servers:", error);
      });

    axios
      .get("http://localhost:5000/api/logs")
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch logs:", error);
      });

    axios
      .get("http://localhost:5000/api/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch stats:", error);
      });

    axios
      .get("http://localhost:5000/api/analytics")
      .then((response) => {
        setAnalytics([...response.data].reverse());
      })
      .catch((error) => {
        console.error("Failed to fetch analytics:", error);
      });

    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 30000);

    return () => clearInterval(interval);
  }, []);

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
      .then(() => {
        setServerName("");
        setServerUrl("");
        fetchDashboardData();
        alert("Server added successfully");
      })
      .catch((error) => {
        console.error("Failed to add server:", error);
        alert("Failed to add server. Please check the backend.");
      });
  };

  const onlineCount = Number(stats.onlineServers || 0);
  const offlineCount = Number(stats.offlineServers || 0);
  const totalServers = onlineCount + offlineCount;

  const uptime =
    totalServers > 0
      ? ((onlineCount / totalServers) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✓</div>

          <div>
            <h2>Net<span>Sentinel</span></h2>
            <small>Monitor • Analyse • Stay Online</small>
          </div>
        </div>

        <nav>
          <p
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </p>

          <p
            className={activePage === "Servers" ? "active" : ""}
            onClick={() => setActivePage("Servers")}
          >
            <span>▣</span>
            Servers
          </p>

          <p
            className={activePage === "Logs" ? "active" : ""}
            onClick={() => setActivePage("Logs")}
          >
            <span>▤</span>
            Logs
          </p>

          <p
            className={activePage === "Analytics" ? "active" : ""}
            onClick={() => setActivePage("Analytics")}
          >
            <span>▥</span>
            Analytics
          </p>
        </nav>

        <div className="sidebar-tip">
          <strong>Stay informed</strong>
          <p>
            Monitor your servers, track response time and detect failures.
          </p>
        </div>

        <div className="sidebar-footer">
          © 2026 NetSentinel
        </div>
      </aside>

      {/* MAIN */}

      <main className="main">

        {/* TOP BAR */}

        <div className="topbar">
          <div>
            <span className="topbar-title">
              {activePage}
            </span>
          </div>

          <div className="topbar-right">
            <span className="live-indicator">
              <span></span>
              Monitoring Active
            </span>

            <button
              className="refresh-btn"
              onClick={fetchDashboardData}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* DASHBOARD */}

        {activePage === "Dashboard" && (
          <>
            {/* HERO */}

            <section className="hero">
              <div>
                <span className="hero-label">
                  MONITOR YOUR WORLD
                </span>

                <h1>
                  Welcome to <span>NetSentinel</span>
                </h1>

                <p>
                  Monitor your servers, track performance and stay
                  informed in real-time.
                </p>

                <div className="hero-meta">
                  <span>● System Monitoring Active</span>
                  <span>
                    Updated {lastUpdated.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </div>

              <div className="hero-visual">
                <div className="server-stack">
                  <div>▰ ▰ ▰</div>
                  <div>▰ ▰ ▰</div>
                  <div>▰ ▰ ▰</div>
                </div>

                <div className="pulse-icon">
                  ~
                </div>
              </div>
            </section>

            {/* STATS */}

            <section className="cards">

              <div className="card stat-card online-card">
                <div className="stat-icon">●</div>

                <div>
                  <span>Online Servers</span>
                  <h2>{onlineCount}</h2>
                  <small>Running smoothly</small>
                </div>
              </div>

              <div className="card stat-card offline-card">
                <div className="stat-icon">!</div>

                <div>
                  <span>Offline Servers</span>
                  <h2>{offlineCount}</h2>
                  <small>Needs attention</small>
                </div>
              </div>

              <div className="card stat-card requests-card">
                <div className="stat-icon">↗</div>

                <div>
                  <span>Total Requests</span>
                  <h2>{stats.totalRequests || 0}</h2>
                  <small>Monitoring checks</small>
                </div>
              </div>

              <div className="card stat-card response-card">
                <div className="stat-icon">◷</div>

                <div>
                  <span>Avg Response Time</span>
                  <h2>{stats.avgResponseTime || 0} ms</h2>
                  <small>Average performance</small>
                </div>
              </div>

            </section>

            {/* CHART + HEALTH */}

            <section className="dashboard-grid">

              <div className="panel chart-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Response Time Trends</h2>
                    <p>Recent server response performance</p>
                  </div>

                  <span className="chart-badge">
                    ● Live Data
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={280}>
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
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="response_time"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="panel health-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Server Health</h2>
                    <p>Current monitoring status</p>
                  </div>
                </div>

                <div className="health-circle">
                  <div>
                    <strong>{uptime}%</strong>
                    <span>Healthy</span>
                  </div>
                </div>

                <div className="health-legend">
                  <div>
                    <span className="legend-dot online-dot"></span>
                    Online
                    <strong>{onlineCount}</strong>
                  </div>

                  <div>
                    <span className="legend-dot offline-dot"></span>
                    Offline
                    <strong>{offlineCount}</strong>
                  </div>
                </div>
              </div>

            </section>

            {/* SERVERS */}

            <section className="panel servers-panel">

              <div className="panel-heading">
                <div>
                  <h2>Monitored Servers</h2>
                  <p>Current status of all registered servers</p>
                </div>

                <button
                  className="small-action"
                  onClick={() => setActivePage("Servers")}
                >
                  View All →
                </button>
              </div>

              {servers.length === 0 ? (
                <div className="empty-state">
                  <h3>No servers added yet</h3>
                  <p>Add a server below to start monitoring.</p>
                </div>
              ) : (
                <div className="server-table">

                  <div className="table-header">
                    <span>Server</span>
                    <span>URL</span>
                    <span>Status</span>
                    <span>Response</span>
                    <span>Action</span>
                  </div>

                  {servers.slice(0, 6).map((server) => (
                    <div className="table-row" key={server.id}>

                      <div className="server-name">
                        <strong>{server.name}</strong>
                        <small>Server #{server.id}</small>
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
                          ● {server.status || "Checking"}
                        </span>
                      </div>

                      <div className="response-value">
                        {server.response_time || 0} ms
                      </div>

                      <div>
                        <button
                          className="view-btn"
                          onClick={() => setActivePage("Logs")}
                        >
                          View
                        </button>
                      </div>

                    </div>
                  ))}

                </div>
              )}
            </section>

            {/* ADD SERVER + QUICK INSIGHTS */}

            <section className="bottom-grid">

              <div className="panel add-server-panel">

                <div className="panel-heading">
                  <div>
                    <h2>＋ Add Server</h2>
                    <p>Enter server details to start monitoring</p>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Server Name"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Server URL  e.g. https://example.com"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                />

                <button onClick={addServer}>
                  ＋ Add Server
                </button>

              </div>

              <div className="panel insights-panel">

                <div className="panel-heading">
                  <div>
                    <h2>Quick Insights</h2>
                    <p>Overview of your monitoring status</p>
                  </div>
                </div>

                <div className="insight-item">
                  <span>Active Servers</span>
                  <strong>
                    {onlineCount} / {totalServers}
                  </strong>
                </div>

                <div className="insight-item">
                  <span>Uptime Rate</span>
                  <strong>{uptime}%</strong>
                </div>

                <div className="insight-item">
                  <span>Recent Logs</span>
                  <strong>{logs.length}</strong>
                </div>

                <button
                  className="analytics-btn"
                  onClick={() => setActivePage("Analytics")}
                >
                  View Analytics →
                </button>

              </div>

            </section>

          </>
        )}

        {/* SERVERS PAGE */}

        {activePage === "Servers" && (
          <section className="page-section">

            <div className="page-title">
              <div>
                <span>MONITORING</span>
                <h1>Servers</h1>
                <p>Manage and monitor your registered servers.</p>
              </div>

              <button
                className="refresh-btn"
                onClick={fetchDashboardData}
              >
                ↻ Refresh
              </button>
            </div>

            <div className="panel">

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
                      <strong
                        className={
                          server.status === "Online"
                            ? "status-online"
                            : "status-offline"
                        }
                      >
                        {server.status || "Checking..."}
                      </strong>

                      <p>
                        {server.response_time || 0} ms
                      </p>
                    </div>

                  </div>
                ))
              )}

            </div>
          </section>
        )}

        {/* LOGS PAGE */}

        {activePage === "Logs" && (
          <section className="page-section">

            <div className="page-title">
              <div>
                <span>MONITORING HISTORY</span>
                <h1>Monitoring Logs</h1>
                <p>Recent server monitoring activity.</p>
              </div>
            </div>

            <div className="panel">

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
                        HTTP {log.status_code || "-"} •{" "}
                        {log.response_time} ms
                      </p>
                    </div>

                  </div>
                ))
              )}

            </div>
          </section>
        )}

        {/* ANALYTICS PAGE */}

        {activePage === "Analytics" && (
          <section className="page-section">

            <div className="page-title">
              <div>
                <span>PERFORMANCE</span>
                <h1>Analytics</h1>
                <p>Analyze server response-time performance.</p>
              </div>
            </div>

            <div className="panel chart-page-panel">

              <div className="panel-heading">
                <div>
                  <h2>Response Time Analytics</h2>
                  <p>Historical response-time monitoring data</p>
                </div>

                <span className="chart-badge">
                  ● Live Data
                </span>
              </div>

              <ResponsiveContainer width="100%" height={420}>
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
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="response_time"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={false}
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default App;