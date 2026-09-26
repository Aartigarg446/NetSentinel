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


⚡ Monitoring Flow


🟢 Online Server
HTTP Request Sent
       ↓
Server Responds
       ↓
Response Time Calculated
       ↓
HTTP Status Code Received
       ↓
Server Marked ONLINE
       ↓
Monitoring Result Stored


🔴 Offline Server
HTTP Request Sent
       ↓
Request Fails / Times Out
       ↓
Server Marked OFFLINE
       ↓
Monitoring Result Stored




🏗️ System Architecture

                    ┌─────────────────────┐
                    │    React Frontend   │
                    │      Dashboard      │
                    └──────────┬──────────┘
                               │
                          Axios / HTTP
                               │
                               ↓
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ↓                 ↓                 ↓
       Server APIs       Monitoring APIs   Analytics APIs
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Monitoring Logic    │
                    └──────────┬──────────┘
                               ↓
                       HTTP Requests
                               ↓
                       Target Servers
                               │
                               ↓
                    ┌─────────────────────┐
                    │      MySQL DB       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ↓                     ↓
                 servers           monitoring_logs
                    │                     │
                    └──────────┬──────────┘
                               ↓
                    Analytics / Dashboard




🛠️ Tech Stack


Frontend
React.js
Axios
React Hooks
Recharts
HTML5
CSS3


Backend
Node.js
Express.js
REST APIs
CORS
JSON
HTTP Request Handling


Database
MySQL
SQL
Relational Database Design


Tools
Git
GitHub
Docker
Postman
VS Code



🔁 Example API Flow


Fetch Servers
React Dashboard
       ↓
Axios GET Request
       ↓
GET /api/servers
       ↓
Express Route
       ↓
MySQL Query
       ↓
Server Records
       ↓
JSON Response
       ↓
React Dashboard

Add Server


User enters Server Name + URL
              ↓
        React Form
              ↓
       POST /api/servers
              ↓
       Express Backend
              ↓
          Validation
              ↓
       MySQL INSERT
              ↓
       Success Response
              ↓
       Dashboard Refresh

⏱️ Automated Monitoring

NetSentinel performs monitoring automatically at regular intervals.

Start Monitoring
       ↓
Check Server
       ↓
Measure Response
       ↓
Determine Status
       ↓
Store Result
       ↓
Wait for Next Interval
       ↓
Check Again

📈 Dashboard Analytics

The dashboard focuses on important monitoring metrics.

┌─────────────────────────────────────┐
│           ONLINE SERVERS            │
│     Currently available servers     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           OFFLINE SERVERS           │
│   Currently unavailable servers     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       MONITORING RECORDS            │
│        Total checks stored          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        AVERAGE RESPONSE TIME        │
│    Average server response time     │
└─────────────────────────────────────┘

🧪 API Testing with Postman

Postman can be used to test the backend APIs independently.

Example endpoints:

GET  /api/servers
POST /api/servers
GET  /api/logs
GET  /api/stats
GET  /api/analytics

This makes it easier to verify:

Request data
API responses
HTTP status codes
Backend validation
Error handling


🐳 Docker

NetSentinel also supports containerized deployment using Docker.

Docker helps provide a consistent environment for running the application components.

Example:

docker build -t netsentinel-backend .

Run backend container:

docker run -p 5000:5000 netsentinel-backend


📁 Project Structure


NetSentinel/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...

🚀 Installation & Setup
1. Clone Repository
git clone https://github.com/Aartigarg446/NetSentinel.git
cd NetSentinel
2. Backend Setup
cd backend

Install dependencies:

npm install

Create a .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=netsentinel

Start backend:

node server.js

Backend runs on:

http://localhost:5000
3. Frontend Setup

Open another terminal and move to frontend:

cd frontend

Install dependencies:

npm install

Start frontend:

npm run dev

Open the local URL displayed by Vite.

🔐 Environment Variables

Sensitive configuration should be stored in .env.

Example:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=netsentinel

Important: Never commit real passwords, API keys, or database credentials to GitHub.

🔮 Future Improvements

Possible future enhancements include:

Email alerts when a server goes offline
Webhook notifications
Configurable monitoring intervals
Response-time threshold alerts
Advanced monitoring filters
Historical performance reports
User authentication
Role-based access control
Cloud deployment
Multi-server alerting
Advanced analytics


👩‍💻 Author
Aarti Garg

Computer Science Engineering Student

GitHub:
https://github.com/Aartigarg446

LinkedIn:
https://www.linkedin.com/in/aarti-garg-3164142a7

<p align="center">
🚦 NetSentinel
Monitor Servers. Track Performance. Analyze Reliability.
</p> ```
