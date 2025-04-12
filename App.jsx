import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`https://lekkerkorting-backend.onrender.com/search?query=${query}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  const handleCheckout = async () => {
    const res = await fetch('https://lekkerkorting-backend.onrender.com/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Lekker Korting 🔍</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>

      {loading && <p className="mt-4">Loading...</p>}

      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index} className="border-b py-2">
            <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-500 font-semibold">{item.name}</a>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Subscribe (€5)
      </button>
    </div>
  );
}

export default App;
