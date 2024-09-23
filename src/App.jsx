import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API_KEY =
  "42c0f39f69db5edbd4057951755bc3e03febf149d3329f89ffd859db5e4bb372";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://serpapi.com/search.json", {
        params: {
          q: search,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      const data = res.json();
      setResults(data);
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
        <form onSubmit={handleSearch}>
          <label>
            Search
            <input
              type="text"
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
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
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p>{result.snippet}</p>
              </li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
''