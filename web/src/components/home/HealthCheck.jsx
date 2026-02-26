import { useState, useEffect } from 'react';

export default function HealthCheck({ backendUrl }) {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  const checkHealth = () => {
    fetch(`${backendUrl}/health`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setHealth(json);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setHealth(null);
      });
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [backendUrl]);

  return (
    <section className="card">
      <h2>Health Status</h2>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : health ? (
        <div>
          <p>
            Status: <strong>{health.status}</strong>
          </p>
          <p>Uptime: {Math.floor(health.uptime)}s</p>
          <p>Last Check: {new Date(health.timestamp).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Checking...</p>
      )}
      <button onClick={checkHealth}>Refresh</button>
    </section>
  );
}
