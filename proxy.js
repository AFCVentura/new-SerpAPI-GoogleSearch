const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/search", async (req, res) => {
  const { query } = req.query;
  const API_KEY =
    "42c0f39f69db5edbd4057951755bc3e03febf149d3329f89ffd859db5e4bb372"; // Chave da API (nesse caso do SerpAPI)
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        engine: "google",
        google_domain: "google.com.br",
        api_key: API_KEY,
        hl: "pt-br",
        gl: "br",
        num: 10, // limita a quantidade de resultados para não precisar fazer paginação
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar resultados" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
