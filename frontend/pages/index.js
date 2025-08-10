import { useState } from 'react';

export default function Home() {
  const [cardNumber, setCardNumber] = useState('');
  const [result, setResult] = useState(null);
  const [token, setToken] = useState('');

  // Simulate login to get a JWT token (replace with real auth in production)
  const getToken = async () => {
    // For demo, set a dummy token
    setToken('dummy-jwt-token');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      await getToken();
    }
    const res = await fetch('http://localhost:3000/api/credit-card/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || 'dummy-jwt-token'}`
      },
      body: JSON.stringify({ cardNumber })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Credit Card Validator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          placeholder="Enter card number"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>Validate</button>
      </form>
      {result && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
