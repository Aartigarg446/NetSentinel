* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f4f7fb;
  color: #172033;
}

.app {
  min-height: 100vh;
  display: flex;
  background: #f4f7fb;
}

/* SIDEBAR */

.sidebar {
  width: 220px;
  min-height: 100vh;
  position: fixed;
  inset: 0 auto 0 0;
  padding: 25px 15px;
  background: #111a2e;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 20px rgba(15, 23, 42, 0.08);
  z-index: 10;
}

.sidebar h2 {
  margin: 0 8px 32px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.7px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar p {
  margin: 0;
  padding: 12px 14px;
  border-radius: 9px;
  color: #aebbd0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease;
}

.sidebar p:hover {
  background: #1d2942;
  color: #fff;
}

.sidebar p.active {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
}

/* MAIN */

.main {
  margin-left: 220px;
  width: calc(100% - 220px);
  min-height: 100vh;
  padding: 30px 42px 45px;
}

/* HEADER */

.main > header {
  margin-bottom: 22px;
}

.main > header h1 {
  margin: 0;
  font-size: 29px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.main > header p {
  margin: 5px 0 0;
  color: #718096;
  font-size: 13px;
}

/* STAT CARDS */

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.card {
  background: #fff;
  border: 1px solid #e3e9f1;
  border-radius: 13px;
  padding: 17px 18px;
  min-height: 100px;
  box-shadow: 0 5px 18px rgba(15, 23, 42, 0.045);
  position: relative;
  overflow: hidden;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 25px rgba(15, 23, 42, 0.08);
}

.card::after {
  content: "";
  position: absolute;
  width: 70px;
  height: 70px;
  right: -27px;
  top: -27px;
  border-radius: 50%;
  background: #f1f5ff;
}

.card span {
  display: block;
  color: #687992;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 7px;
}

.card h2 {
  margin: 0;
  font-size: 27px;
  font-weight: 800;
}

.card:nth-child(1) {
  border-top: 3px solid #22c55e;
}

.card:nth-child(2) {
  border-top: 3px solid #ef4444;
}

.card:nth-child(3) {
  border-top: 3px solid #8b5cf6;
}

.card:nth-child(4) {
  border-top: 3px solid #f59e0b;
}

/* PANELS */

.panel {
  background: #fff;
  border: 1px solid #e3e9f1;
  border-radius: 13px;
  padding: 20px 22px;
  margin-bottom: 18px;
  box-shadow: 0 5px 20px rgba(15, 23, 42, 0.045);
}

.panel h2 {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 750;
}

/* ADD SERVER */

.panel input {
  width: 100%;
  padding: 12px 14px;
  margin-top: 8px;
  border: 1px solid #dbe3ed;
  background: #fbfcfe;
  border-radius: 8px;
  font-size: 13px;
  color: #172033;
  outline: none;
  transition: 0.2s ease;
}

.panel input:focus {
  background: #fff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.panel input::placeholder {
  color: #8a98ab;
}

.panel button {
  margin-top: 13px;
  padding: 10px 19px;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: 0 5px 12px rgba(37, 99, 235, 0.18);
  transition: 0.2s ease;
}

.panel button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

/* SERVER LIST */

.server-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 15px 7px;
  border-bottom: 1px solid #edf1f5;
  transition: 0.2s ease;
}

.server-row:last-child {
  border-bottom: 0;
}

.server-row:hover {
  background: #f8fafc;
  border-radius: 9px;
  padding-left: 12px;
  padding-right: 12px;
}

.server-row > div:first-child {
  flex: 1;
  min-width: 0;
}

.server-row > div:last-child {
  min-width: 115px;
  text-align: right;
}

.server-row h3 {
  margin: 0 0 5px;
  font-size: 14px;
  font-weight: 700;
  color: #172033;
}

.server-row p {
  margin: 0;
  color: #718096;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.server-row strong {
  font-size: 13px;
  font-weight: 700;
}

.status-online {
  color: #16a34a;
}

.status-offline {
  color: #dc2626;
}

.status-online::before,
.status-offline::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.status-online::before {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.10);
}

.status-offline::before {
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.10);
}

/* LOGS */

.panel > div {
  border-bottom: 1px solid #edf1f5;
}

.panel > div:last-child {
  border-bottom: 0;
}

/* CHART */

.recharts-responsive-container {
  margin-top: 5px;
}

.recharts-cartesian-axis-tick-value {
  fill: #718096;
  font-size: 10px;
}

.recharts-cartesian-grid-horizontal line,
.recharts-cartesian-grid-vertical line {
  stroke: #edf1f5;
}

.recharts-tooltip-wrapper {
  outline: none;
}

/* SCROLLBAR */

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .main {
    padding: 25px;
  }
}

@media (max-width: 750px) {
  .sidebar {
    width: 180px;
  }

  .main {
    margin-left: 180px;
    width: calc(100% - 180px);
    padding: 22px;
  }
}

@media (max-width: 560px) {
  .app {
    display: block;
  }

  .sidebar {
    position: relative;
    width: 100%;
    min-height: auto;
  }

  .main {
    margin-left: 0;
    width: 100%;
    padding: 18px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .server-row {
    align-items: flex-start;
  }

  .server-row > div:last-child {
    min-width: 100px;
  }
}


/* =========================
   MONITORING HISTORY
========================= */

.monitoring-history-panel {
  padding: 20px 22px 10px;
}

.history-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
}

.history-section-header h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 800;
  color: #172033;
}

.history-section-header p {
  margin: 0;
  color: #7a889b;
  font-size: 11px;
}

.history-count {
  padding: 7px 11px;
  border: 1px solid #e4eaf2;
  border-radius: 20px;
  background: #f8fafc;
  color: #64748b;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.history-table-header {
  display: grid;
  grid-template-columns: minmax(220px, 1.7fr) 105px 70px 110px 95px;
  align-items: center;
  gap: 15px;
  padding: 11px 12px;
  background: #f8fafc;
  border-top: 1px solid #edf1f5;
  border-bottom: 1px solid #edf1f5;
}

.history-table-header span {
  color: #8a97a8;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.65px;
}

.history-row {
  display: grid;
  grid-template-columns: minmax(220px, 1.7fr) 105px 70px 110px 95px;
  align-items: center;
  gap: 15px;
  min-height: 70px;
  padding: 11px 12px;
  border-bottom: 1px solid #edf1f5;
  transition: 0.2s ease;
}

.history-row:last-child {
  border-bottom: none;
}

.history-row:hover {
  background: #f9fbff;
}

.history-server {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.history-server-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eaf2ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
}

.history-server-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.history-server-info strong {
  color: #172033;
  font-size: 12px;
  font-weight: 750;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-server-info span {
  color: #718096;
  font-size: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.history-status.online {
  background: #ecfdf3;
  color: #15803d;
}

.history-status.offline {
  background: #fef2f2;
  color: #dc2626;
}

.history-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.history-status.online .history-status-dot {
  background: #22c55e;
}

.history-status.offline .history-status-dot {
  background: #ef4444;
}

.http-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 750;
}

.http-badge.success {
  background: #f0fdf4;
  color: #15803d;
}

.http-badge.muted {
  background: #f1f5f9;
  color: #94a3b8;
}

.history-response,
.history-time {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.history-response strong,
.history-time strong {
  color: #172033;
  font-size: 11px;
  font-weight: 750;
}

.history-response span,
.history-time span {
  color: #9aa7b8;
  font-size: 9px;
}

.empty-history {
  text-align: center;
  padding: 45px 15px;
}

.empty-history-icon {
  width: 36px;
  height: 36px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f1f5f9;
  color: #94a3b8;
  font-weight: 800;
}

.empty-history h3 {
  margin: 0 0 5px;
  font-size: 14px;
}

.empty-history p {
  margin: 0;
  color: #718096;
  font-size: 11px;
}

@media (max-width: 900px) {
  .history-table-header {
    display: none;
  }

  .history-row {
    grid-template-columns: 1fr 105px;
    gap: 10px 15px;
    padding: 14px 10px;
  }

  .history-row > div:nth-child(2),
  .history-row > div:nth-child(3),
  .history-row > div:nth-child(4),
  .history-row > div:nth-child(5) {
    grid-column: 2;
  }

  .history-row > div:nth-child(2) {
    grid-row: 1;
  }

  .history-row > div:nth-child(3) {
    grid-row: 2;
  }

  .history-row > div:nth-child(4) {
    grid-row: 3;
  }

  .history-row > div:nth-child(5) {
    grid-row: 4;
  }
}

@media (max-width: 560px) {
  .history-section-header {
    align-items: flex-start;
  }

  .history-row {
    grid-template-columns: 1fr;
  }

  .history-row > div:nth-child(2),
  .history-row > div:nth-child(3),
  .history-row > div:nth-child(4),
  .history-row > div:nth-child(5) {
    grid-column: 1;
  }
}
