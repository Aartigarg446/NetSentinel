NetSentinel – HTTP Server Monitoring & Analytics Platform

NetSentinel is a web-based HTTP server monitoring and analytics platform built to track server availability, HTTP status codes, response time, monitoring history, and performance trends through a dashboard.

Overview

NetSentinel allows users to add target servers, monitor their availability, record monitoring results, and view the latest server status, monitoring logs, dashboard statistics, and response-time analytics from a React dashboard.

Key Features

Add and manage monitored servers through the dashboard

Automated HTTP monitoring at a fixed interval

Online/offline server detection based on HTTP request success or failure

Response-time measurement in milliseconds

HTTP status code tracking

Monitoring history stored in MySQL

Dashboard statistics for online/offline servers, request counts, and average response time

Response-time analytics with charts

Periodic dashboard refresh

Basic validation and error handling for API requests

Tech Stack

Frontend

React.js

Axios

Recharts

HTML5

CSS3

Backend

Node.js

Express.js

REST APIs

Database

MySQL

Other Tools

Git

GitHub

Docker

Postman

System Architecture

React Frontend
      |
      | HTTP / REST API
      v
Node.js + Express Backend
      |
      +---- Server Management
      +---- HTTP Monitoring
      +---- Analytics / Statistics
      |
      v
     MySQL

Application Flow

1. Add a Server

User enters server name + URL
        |
        v
React Frontend
        |
        | POST /api/servers
        v
Express Backend
        |
        v
MySQL
        |
        v
JSON Response
        |
        v
React Dashboard

2. Monitor a Server

Monitoring Service
        |
        | HTTP request to target URL
        v
Target Server
        |
        v
Status + HTTP Code + Response Time
        |
        v
MySQL monitoring_logs

If the target responds successfully, the server is marked Online. If the request fails or exceeds the timeout, it is marked Offline and the result is logged.

3. Dashboard Data

The React dashboard fetches server data, monitoring logs, statistics, and analytics through backend APIs and refreshes the displayed data periodically.

Database Design

NetSentinel uses two main tables:

servers

Stores relatively stable information about monitored servers.

Typical fields:

id

name

url

created_at

monitoring_logs

Stores repeated monitoring results.

Typical fields:

id

server_id

status

status_code

response_time

checked_at

A single server can have multiple monitoring logs, linked through server_id.

API Overview

Method

Endpoint

Purpose

POST

/api/servers

Add a new server

GET

/api/servers

Fetch monitored servers

GET

/api/logs

Fetch monitoring logs

GET

/api/stats

Fetch dashboard statistics

GET

/api/analytics

Fetch response-time analytics data

GET/POST

/api/monitor

Trigger/handle server monitoring

GET

/api/health

Check backend availability

Environment Variables

Create a .env file inside the backend directory:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=netsentinel

Do not commit the real .env file to GitHub. Keep it in .gitignore.

Getting Started

Prerequisites

Node.js and npm

MySQL

Git

1. Clone the repository

git clone https://github.com/Aartigarg446/NetSentinel.git
cd NetSentinel

2. Install backend dependencies

cd backend
npm install

3. Configure environment variables

Create backend/.env and add your local MySQL configuration.

4. Start the backend

npm run dev

The backend runs on port 5000 in the current development setup.

5. Install and start the frontend

Open another terminal:

cd frontend
npm install
npm run dev

Monitoring Logic

NetSentinel measures response time by recording the time before the HTTP request and subtracting it from the time when the response is received.

For unresponsive targets, the monitoring flow uses a timeout. In the current implementation, a server that does not respond within the configured timeout is treated as offline and the monitoring result is recorded.

Dashboard Analytics

The dashboard includes server status and analytics views. Server status focuses on the latest condition of each monitored server, while analytics uses historical response-time records to show performance trends.

Error Handling

The frontend handles failed API requests and displays user-facing messages. The backend returns appropriate HTTP error responses for failures such as database or internal server errors.

Project Structure

NetSentinel/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── config/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore

Why NetSentinel?

NetSentinel was built to go beyond a basic CRUD application and understand practical concepts involved in server monitoring, REST API integration, database logging, automated checks, and dashboard analytics.

Future Improvements

User authentication and role-based access

Configurable monitoring intervals

Email or notification alerts for downtime

More detailed analytics and historical comparisons

Deployment with a managed database and production monitoring
