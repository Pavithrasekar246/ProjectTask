import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './Filters';
import LogTable from './LogTable';

const App = () => {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const params = new URLSearchParams(filters);
      const res = await axios.get('http://localhost:4000/logs', { params });
      setLogs(res.data);
    };
    fetchLogs();
  }, [filters]);

  return (
    <div className="container">
      <h2>Log Viewer</h2>
      <Filters setFilters={setFilters} />
      <LogTable logs={logs} />
    </div>
  );
};

export default App;
