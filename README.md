# 🚦 NetSentinel

### HTTP Server Monitoring & Analytics Platform

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![REST API](https://img.shields.io/badge/Architecture-REST%20API-orange)

> **Monitor. Measure. Record. Analyze.**

NetSentinel is a web-based **HTTP server monitoring and analytics platform** designed to track server availability, HTTP status codes, response time, and monitoring history through a centralized dashboard.

Instead of manually checking multiple servers, NetSentinel sends automated HTTP requests to registered servers, measures their response performance, records monitoring results, and presents the data through an interactive dashboard.

---

## ✨ Features

### 🖥️ Server Monitoring

- Add servers using server name and URL
- Automated HTTP health checks
- Detect server **Online / Offline** status
- Track HTTP status codes
- Measure server response time
- Handle request failures and timeouts
- Maintain monitoring history

### 📊 Monitoring Dashboard

- Server availability overview
- Current server status
- HTTP status information
- Response time tracking
- Monitoring history
- Dashboard statistics
- Analytics visualization
- Periodic dashboard refresh

### 📈 Analytics

- Average response time
- Online server count
- Offline server count
- Total monitoring records
- Response-time history
- Monitoring trends

### 📝 Monitoring Logs

Each monitoring check stores information such as:

- Server ID
- Server status
- HTTP status code
- Response time
- Check timestamp

### ✅ Validation & Error Handling

- Server name validation
- URL validation
- API error handling
- Database error handling
- Timeout handling
- Invalid request handling

---

# 🔄 How NetSentinel Works

```text
                         NETSENTINEL
                              │
                 ┌────────────┴────────────┐
                 ↓                         ↓
          React Dashboard             Add Server
                 │                         │
                 └────────────┬────────────┘
                              ↓
                         REST APIs
                              ↓
                    Node.js + Express
                              ↓
                     Monitoring Logic
                              ↓
                       HTTP Request
                              ↓
                       Target Server
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
                 Response          Timeout / Error
                    ↓                   ↓
                 ONLINE              OFFLINE
                    │                   │
                    └─────────┬─────────┘
                              ↓
                       MySQL Database
                              ↓
                         Analytics
                              ↓
                      React Dashboard
