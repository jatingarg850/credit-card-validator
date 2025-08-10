
"use client";
import { useState, useEffect } from "react";

export default function Home() {
 
  const formatCardNumber = (num) => {
    return num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  };


  const handleCardInput = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCardNumber(raw);
  };
  const [cardNumber, setCardNumber] = useState("");
  const [result, setResult] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liveSuggestion, setLiveSuggestion] = useState(null);

  
  const getToken = async () => {
   
    setToken("dummy-jwt-token");
  };


  useEffect(() => {
    const suggest = async () => {
      setLiveSuggestion(null);
      if (cardNumber.length >= 12 && cardNumber.length <= 18) {
        const base = cardNumber.slice(0, -1);
        if (base.length > 0 && cardNumber.length > 1) {
          try {
            const res = await fetch("http://localhost:3000/api/credit-card/validate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token || "dummy-jwt-token"}`,
              },
              body: JSON.stringify({ cardNumber: base + '0' }),
            });
            const data = await res.json();
            if (data && data.suggestion) {
              setLiveSuggestion(data.suggestion);
            }
          } catch {}
        }
      }
    };
    suggest();
   
  }, [cardNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    if (!token) {
      await getToken();
    }
    try {
      const res = await fetch("http://localhost:3000/api/credit-card/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "dummy-jwt-token"}`,
        },
        body: JSON.stringify({ cardNumber }),
      });
      if (!res.ok) {
        throw new Error("API error");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to validate card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow animate-fade-in">Credit Card Validator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 bg-gray-900/80 p-6 rounded-xl shadow-xl animate-fade-in">
        <input
          type="text"
          value={formatCardNumber(cardNumber)}
          onChange={handleCardInput}
          placeholder="Enter card number"
          className={`border-2 border-gray-700 rounded-lg px-4 py-3 text-lg transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white tracking-widest shadow-inner ${result ? 'ring-2 ring-green-400' : ''}`}
          required
          autoComplete="off"
          maxLength={23} 
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-4 py-3 text-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2"><span className="loader"></span> Validating...</span>
          ) : "Validate"}
        </button>
      </form>
      {error && (
        <div className="mt-6 w-full max-w-sm animate-fade-in bg-red-700/90 p-4 rounded-lg text-white border border-red-400 shadow-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      {result && result.valid && (
        <div className="mt-6 w-full max-w-sm animate-fade-in bg-green-700/90 p-4 rounded-lg text-white border border-green-400 shadow-lg flex items-center gap-2">
          <span className="text-2xl">✅</span> <span className="font-semibold">Card is valid!</span>
        </div>
      )}
      {result && result.valid === false && result.correctLastDigit !== undefined && (
        <div className="mt-6 w-full max-w-sm animate-fade-in bg-yellow-700/90 p-4 rounded-lg text-white border border-yellow-400 shadow-lg">
          <div className="flex items-center gap-2 mb-2"><span className="text-2xl">❌</span> <span className="font-semibold">Card is invalid.</span></div>
          <div className="mt-2">Correct last digit: <span className="font-mono text-lg text-yellow-200">{result.correctLastDigit}</span></div>
          <div>Suggested valid number: <span className="font-mono text-lg text-yellow-200">{result.suggestion}</span></div>
        </div>
      )}
      {result && result.error && (
        <div className="mt-6 w-full max-w-sm animate-fade-in bg-red-700/90 p-4 rounded-lg text-white border border-red-400 shadow-lg">
          <strong>Error:</strong> {result.error}
        </div>
      )}
      {liveSuggestion && !result && (
        <div className="mt-4 w-full max-w-sm animate-fade-in bg-blue-900/90 p-3 rounded-lg text-blue-100 border border-blue-400 shadow flex flex-col items-start">
          <span className="text-sm mb-1">💡 Suggested valid number:</span>
          <div className="font-mono text-lg text-blue-200">{liveSuggestion}</div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fadeIn 0.5s; }
        .loader { border: 3px solid #fff3; border-top: 3px solid #fff; border-radius: 50%; width: 1em; height: 1em; animation: spin 0.7s linear infinite; display: inline-block; vertical-align: middle; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
