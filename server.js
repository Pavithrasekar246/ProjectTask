
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const LOG_FILE = path.join(__dirname, 'logs.json');

app.use(express.json());

function loadLogs() {
    if (!fs.existsSync(LOG_FILE)) return [];
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
}

function saveLogs(logs) {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

app.post('/logs', (req, res) => {
    const log = req.body;
    if (!log.level || !log.message || !log.resourceId || !log.timestamp || !log.traceId || !log.spanId || !log.commit || !log.metadata) {
        return res.status(400).send({ error: "Missing required fields" });
    }
    const logs = loadLogs();
    logs.push(log);
    saveLogs(logs);
    res.status(201).send(log);
});

app.get('/logs', (req, res) => {
    let logs = loadLogs();
    const { level, message, resourceId, timestamp_start, timestamp_end, traceId, spanId, commit } = req.query;

    logs = logs.filter(log => {
        return (!level || log.level === level) &&
               (!message || log.message.toLowerCase().includes(message.toLowerCase())) &&
               (!resourceId || log.resourceId === resourceId) &&
               (!timestamp_start || new Date(log.timestamp) >= new Date(timestamp_start)) &&
               (!timestamp_end || new Date(log.timestamp) <= new Date(timestamp_end)) &&
               (!traceId || log.traceId === traceId) &&
               (!spanId || log.spanId === spanId) &&
               (!commit || log.commit === commit);
    });

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.send(logs);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
