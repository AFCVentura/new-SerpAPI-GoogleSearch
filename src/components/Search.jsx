// Hook usado para manipular estados (serve tipo uma variável que re-renderiza a página quando muda)
import { useState } from "react"; 
// Importando o CSS
import "../App.css";
// Alternativa mais prática ao fetch (tem que rodar um 'npm i axios' para instalar ele)  
import axios from "axios";

// Componente que tem todo o mecanismo de busca
export default function Search() {
  // Estado que manipula o que está escrito dentro do input para fazer a busca (vejam isso como se fosse uma variável)
  // O primeiro item do array é a "variável", o segundo é a função que usamos para alterar ela 
  // e o valor dentro o useState() é o valor inicial da variável.
  const [query, setQuery] = useState("");
  // Esse define se está carregando ou não, definiremos que está quando fizermos a requisição
  const [loading, setLoading] = useState(false);
  // Esse define se tem erro ou não, se tiver vamos definir a mensagem nessa variável também
  const [error, setError] = useState(false);
  // Essa define os resultados da busca, inicialmente é um array vazio
  const [results, setResults] = useState([]);

  // Função que roda quando o usuário clica em enviar
  const handleQuery = async (e) => {
    // Previne o procedimento padrão do submit
    e.preventDefault();

    // Se o input não tiver nada escrito já para por aqui, não vamos fazer a requisição
    if (!query) return;

    // Definimos que está carregando agora (isso vai fazer aparecer um "Carregando..." depois)
    setLoading(true);
    // Definimos que não tem mais erro, isso porque se rolar e depois pesquisarmos de novo, o erro deve sair
    setError("");

    // Try catch para prevenir erros insperados
    try {
      // Requisição usando axios, se fossemos usar o fetch, teríamos que passar os params dentro da URL manualmente
      const res = await axios.get(`http://localhost:4000/search`, {
        params: {
          query,
        },
      });

      // Definimos que os resultados são os "resultados orgânicos" da response do axios, é uma forma de acessar esses dados
      // O || [] é uma forma de prevenir que, caso não haja nenhum dado na response, os resultados serão apenas um array vazio
      setResults(res.data.organic_results || []);
      // Capturando erros
    } catch (err) {
      // Exibe no console o erro que chegou (geralmente algo muito técnico para ser exibido para o usuário)
      console.error(err.message);
      // Define que o useState do erro é uma mensagem menos técnica (essa é para o usuário conseguir entender)
      setError("Não foi possível fazer a busca");
      // Bloco de finally roda independente de ter caído no try ou no catch
    } finally {
        // Definimos que agora não está mais carregando (a requisição acabou)
      setLoading(false);
    }
  };

  // No return fica todo o JSX que iremos retornar (essencialmente HTML com algumas coisinhas diferentes)
  // Não se esqueça dos parênteses ao redor de todo o JSX
  return (
    // Note essa tag vazia, é um fragmento, uma forma de evitar problemas ao tentar retornar mais de uma tag no JSX
    <>
      {/* Note duas coisas: 1. A forma como se escrevem comentários dentro do JSX. 2. Que as classes em JSX são chamadas de className e não class */}
      <div className="App">
        <div className="logo">
          <h1>Goggle</h1>
          <img id="goggle-logo" src="goggles.svg" alt="Goggles" />
        </div>
        <form onSubmit={handleQuery}>
          <label>
            Search
            {/* Esse onChange garante que toda vez que o cara alterar o que tá escrito no input, a variável query vai mudar também */}
            <input
              type="text"
              name="query"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              // Esse garante que o que estiver no input sempre será o que tá na variável, se a gente quiser alterar a varíavel para exibir um texto padrão, ele muda sozinho o texto do input
              value={query}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {/* Essa parte pode parecer meio confusa mas estamos fazendo um if ternário verificando se tem erros ou se está carregando, se não tá nenhum deles, exibimos a busca */}
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {/* Aqui estamos pegando os dados e percorrendo, exibindo um <li> para cada */}
            {results.map((result, index) => {
              return (
                // Quando percorremos um array e imprimimos seus itens precisamos colocar uma key neles, como se fosse um id
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
