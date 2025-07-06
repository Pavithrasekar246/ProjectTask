
# Log Ingestion and Querying System

This project is a full-stack web application that allows ingestion, storage, and querying of log data using a Node.js backend and a React frontend.

## 🔧 Features

- Ingest logs via a POST API.
- Query logs using filters: level, message, resourceId, timestamp range.
- JSON file used as data storage (no external DBs).
- React UI with filter inputs and real-time search.

---

## 📁 Project Structure

```
Log_Ingestion_Project/
│
├── backend/
│   ├── server.js
│   ├── logs.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── App.css
    └── package.json
```

---

## 🚀 Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

> Server runs at: `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

> React app runs at: `http://localhost:3000`

---

## 📦 API Endpoints

### POST /logs

- Ingest a log entry.

**Body Format (JSON):**

```json
{
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-123",
  "timestamp": "2024-07-06T13:45:00Z",
  "traceId": "abc-123",
  "spanId": "span-001",
  "commit": "e1d2f3",
  "metadata": {
    "parentResourceId": "server-999"
  }
}
```

### GET /logs

- Retrieve logs using query filters:

**Query Parameters:**

- `level`, `message`, `resourceId`, `timestamp_start`, `timestamp_end`, `traceId`, `spanId`, `commit`

---

## 📌 Notes

- The backend persists data to a `logs.json` file.
- Frontend filters update results dynamically using React Hooks.
- No global state library used; state is handled with `useState` and `useEffect`.

---

## ✅ Future Enhancements

- Add real-time log updates via WebSockets.
- Add log analytics (chart view).
- Add Docker support.

---

© 2025 Log Ingestion System
