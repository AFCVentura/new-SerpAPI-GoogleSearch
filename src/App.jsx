import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

const API_KEY =
  "42c0f39f69db5edbd4057951755bc3e03febf149d3329f89ffd859db5e4bb372";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const handleQuery = async (e) => {
    e.preventDefault();

    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:4000/search`, {
        params: {
          query,
        },
      });

      console.log(`Resultados da requisição: ${res.data}`);
      setResults(res.data.organic_results || []);
    } catch (err) {
      console.error(err.message);
      setError("Não foi possível fazer a busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Noodle</h1>
        <form onSubmit={handleQuery}>
          <label>
            Search
            <input
              type="text"
              name="query"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
("");
