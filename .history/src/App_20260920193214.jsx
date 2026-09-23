import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
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
            <h2>0</h2>
          </div>

          <div className="card">
            <span>Offline Servers</span>
            <h2>0</h2>
          </div>

          <div className="card">
            <span>Total Requests</span>
            <h2>0</h2>
          </div>

          <div className="card">
            <span>Avg Response Time</span>
            <h2>0 ms</h2>
          </div>
        </section>

        <section className="panel">
          <h2>Server Status</h2>
          <p>No servers added yet.</p>
        </section>
      </main>
    </div>
  );
}

export default App;