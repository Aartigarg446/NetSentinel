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

---

## ⚡ Monitoring Flow

### 🟢 When Server is Online

```text
HTTP Request Sent
       ↓
Server Responds
       ↓
Response Time Measured
       ↓
HTTP Status Code Received
       ↓
Server Marked ONLINE
       ↓
Result Stored in MySQL

🔴 When Server is Offline
HTTP Request Sent
       ↓
Request Fails or Times Out
       ↓
Server Marked OFFLINE
       ↓
Result Stored in MySQL

📊 Example Monitoring Result
Server Name      : Example Server
URL              : https://example.com
Status           : Online
HTTP Status Code : 200
Response Time    : 154 ms

🏗️ System Architecture

React Frontend
      ↓
Axios / REST API
      ↓
Node.js + Express
      ↓
Monitoring Logic
      ↓
HTTP Request
      ↓
Target Server
      ↓
Monitoring Result
      ↓
MySQL Database
      ↓
Analytics APIs
      ↓
React Dashboard

🗃️ Database Design

NetSentinel uses MySQL to store server information and monitoring history.

servers

Stores registered server details.

id
name
url
created_at
monitoring_logs

Stores monitoring results.

id
server_id
status
status_code
response_time
checked_at

Each server can have multiple monitoring log records.

servers
   │
   │ 1
   │
   ▼
monitoring_logs
   *
🔌 API Endpoints
Get Servers
GET /api/servers

Retrieves registered servers.

Add Server
POST /api/servers

Adds a new server for monitoring.

Get Monitoring Logs
GET /api/logs

Retrieves monitoring history.

Get Statistics
GET /api/stats

Retrieves dashboard statistics.

Get Analytics
GET /api/analytics

Retrieves data used for monitoring analytics and visualization.

📈 Dashboard Analytics

NetSentinel provides monitoring statistics such as:

Online servers
Offline servers
Total monitoring records
Average response time
Response-time history

The data is fetched from the backend through REST APIs and displayed on the React dashboard.

🧪 API Testing

The backend APIs can be tested using Postman.

Example requests:

GET  /api/servers
POST /api/servers
GET  /api/logs
GET  /api/stats
GET  /api/analytics

Postman helps verify API requests, responses, status codes, and backend error handling.

🛡️ Error Handling

NetSentinel handles different types of failures during monitoring and API operations.

Invalid server details
Failed HTTP requests
Server timeouts
Database errors
API errors
Invalid requests

When a monitored server fails to respond within the configured timeout, it is marked as Offline and the monitoring result is recorded.

🧠 Key Concepts Demonstrated
REST API integration
HTTP request/response handling
Server health monitoring
Response-time measurement
HTTP status codes
Timeout handling
MySQL and SQL
Relational database design
Monitoring logs
React dashboard
API integration
Data analytics
Error handling
Docker
Git & GitHub
Postman

🐳 Docker

NetSentinel can be containerized using Docker to provide a consistent environment for running the backend application.

Example:

docker build -t netsentinel-backend .

Run the container:

docker run -p 5000:5000 netsentinel-backend
🚀 Getting Started
Clone Repository
git clone https://github.com/Aartigarg446/NetSentinel.git
cd NetSentinel
Backend
cd backend
npm install
node server.js

Backend:

http://localhost:5000
Frontend

Open another terminal:

cd frontend
npm install
npm run dev
🔐 Environment Variables

Create a .env file inside the backend directory:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=netsentinel

Do not commit real passwords or credentials to GitHub.

🔮 Future Improvements
Email notifications
Webhook alerts
Configurable monitoring intervals
Response-time threshold alerts
Authentication and authorization
Role-based access control
Cloud deployment
Advanced monitoring analytics


👨‍💻 Author

Aarti Garg

Computer Science Engineering Student

GitHub:
https://github.com/Aartigarg446
