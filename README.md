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

                    ┌─────────┴─────────┐
                    ↓                   ↓
                 Response      ## ✨ Features

✨ Features

🖥️ Add and monitor multiple servers using name and URL

🟢 Detect Online / Offline server status

⚡ Measure HTTP response time

📡 Track HTTP status codes

📝 Store monitoring history in MySQL

📊 View statistics and response-time analytics

🔄 Refresh dashboard data automatically

🛡️ Handle request failures, timeouts, validation, and API/database errors

🐳 Dockerized backend support

🔄 How It Works

User
 ↓
React Dashboard
 ↓
Axios / REST API
 ↓
Node.js + Express
 ↓
Monitoring Logic
 ↓
HTTP Request → Target Server
 ↓
┌───────────────┬────────────────┐
│ Response      │ Timeout/Error  │
↓               ↓
ONLINE          OFFLINE
│               │
└───────┬───────┘
        ↓
Measure Response Time
        ↓
Store Result in MySQL
        ↓
Analytics APIs
        ↓
React Dashboard

🏗️ Architecture

┌──────────────────────┐
│     React Frontend   │
│  Dashboard + Charts  │
└──────────┬───────────┘
           │ Axios / REST
           ↓
┌──────────────────────┐
│   Node.js + Express  │
│   REST API + Logic   │
└───────┬────────┬─────┘
        │        │
        │        └──────────→ Target HTTP Servers
        ↓
┌──────────────────────┐
│      MySQL Database  │
│  servers + log data  │
└──────────────────────┘

🔌 API Endpoints

Method

Endpoint

Purpose

GET

/api/servers

Get registered servers

POST

/api/servers

Add a server

GET

/api/logs

Get monitoring logs

GET

/api/stats

Get dashboard statistics

GET

/api/analytics

Get analytics data

🗃️ Database Design

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

Relationship: One server → Many monitoring logs.

🛠️ Tech Stack

Frontend: React.js, Axios, React Hooks, Recharts, HTML5, CSS3
Backend: Node.js, Express.js, REST APIs, CORS
Database: MySQL, SQL
Dev Tools: Docker, Git, GitHub, Postman, VS Code

📁 Project Structure

NetSentinel/
├── backend/
│   ├── config/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md

🚀 Run Locally

Backend

cd backend
npm install
node server.js

Backend:

http://localhost:5000

Frontend

cd frontend
npm install
npm run dev

Environment Variables

Create backend/.env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=netsentinel

🧪 API Testing

Use Postman to test the REST APIs, request payloads, responses, status codes, and error handling.

🐳 Docker

docker build -t netsentinel-backend .
docker run -p 5000:5000 netsentinel-backend

🧠 Core Concepts

REST APIs • HTTP Monitoring • Response-Time Measurement • HTTP Status Codes • MySQL • SQL • Relational Database • Monitoring Logs • React Dashboard • Analytics • Error Handling • Docker

🔮 Future Improvements

Email / webhook alerts

Configurable monitoring intervals

Authentication and role-based access

Cloud deployment

Advanced monitoring analytics

👨‍💻 Author

Aarti Garg
Computer Science Engineering Student

GitHub: https://github.com/Aartigarg446
