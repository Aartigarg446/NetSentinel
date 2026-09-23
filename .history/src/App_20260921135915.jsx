import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [servers, setServers] = useState([]);
 const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [serverName, setServerName] = useState("");
const [serverUrl, setServerUrl] = useState("");
const addServer = () => {
  axios.post("http://localhost:5000/api/servers", {
    name: serverName,
    url: serverUrl
  })
    .then((response) => {
      console.log(response.data);

      setServerName("");
      setServerUrl("");

      axios.get("http://localhost:5000/api/servers")
        .then((response) => {
          setServers(response.data);
        })
        .catch((error) => {
          console.error("Failed to refresh servers:", error);
        });
    })
    .catch((error) => {
      console.error("Failed to add server:", error);
    });
};

useEffect(() => {
  const fetchDashboardData = () => {
  axios.get("http://localhost:5000/api/servers")
    .then((response) => {
      setServers(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch servers:", error);
    });
    axios.get("http://localhost:5000/api/logs")
  .then((response) => {
    setLogs(response.data);
  })
  .catch((error) => {
    console.error("Failed to fetch logs:", error);
  });
  axios.get("http://localhost:5000/api/stats")
  .then((response) => {
    setStats(response.data);
  })
  .catch((error) => {
    console.error("Failed to fetch stats:", error);
  });
  axios.get("http://localhost:5000/api/analytics")
  .then((response) => {
    setAnalytics(response.data);
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
      <aside className="sidebar">
        <h2>NetSentinel</h2>

        <nav>
          <p className="active">Dashboard</p>
          <p>Servers</p>
          <p>Logs</p>
          <p>Analytics</p>
        </nav>
      </aside>

      <main className="main">
        <header>
          <h1>Dashboard</h1>
          <p>HTTP Server Monitoring & Analytics</p>
        </header>

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

  <button onClick={addServer}>Add Server</button>
</section>

        <section className="panel">
  <h2>Server Status</h2>

  {servers.length === 0 ? (
    <p>No servers added yet.</p>
  ) : (
    servers.map((server) => (
      <div key={server.id}>
        <h3>{server.name}</h3>
        <p>{server.url}</p>
      </div>
    ))
  )}
</section>
<section className="panel">
  <h2>Monitoring History</h2>

  {logs.length === 0 ? (
    <p>No monitoring logs yet.</p>
  ) : (
    logs.map((log) => (
      <div key={log.id}>
        <h3>{log.name}</h3>
        <p>Status: {log.status}</p>
        <p>HTTP Status: {log.status_code}</p>
        <p>Response Time: {log.response_time} ms</p>
      </div>
    ))
  )}
</section>
      </main>
    </div>
  );
}

export default App;