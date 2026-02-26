import { useState } from 'react';

export default function GreetForm({ backendUrl }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      const response = await fetch(`${backendUrl}/greet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setName('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2>Greet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          minLength={1}
        />
        <button type="submit">Send</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">Error: {error}</p>}
    </section>
  );
}
