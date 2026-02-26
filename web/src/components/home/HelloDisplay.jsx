import { useState, useEffect } from 'react';

export default function HelloDisplay({ backendUrl }) {
  const [appInfo, setAppInfo] = useState({ app: null, version: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/hello`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setAppInfo(json);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setAppInfo({ app: null, version: null });
      });
  }, [backendUrl]);

  return (
    <section className="card">
      <h2>Backend Info</h2>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : appInfo.app ? (
        <p>
          {appInfo.app} <strong>v{appInfo.version}</strong>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
