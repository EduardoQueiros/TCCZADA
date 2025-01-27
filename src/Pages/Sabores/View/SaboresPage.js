import ReturnButton from "../../../Components/ReturnButton";
import Search from "../../../Components/Search";
import SaborBox from "./SaborBox";
import { useEffect, useState } from "react";
import axios from "axios";

function SaboresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tiposProduto, setTiposProduto] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");

  useEffect(() => {
    const fetchTiposProduto = async () => {
      try {
        const response = await axios.get(
          "https://nova-api-l5ht.onrender.com/api/v1/tipo-produto"
        );
        // Filtra para não exibir "adicionais"
        const filtrados = response.data.filter(
          (tipo) => tipo.descricao.toLowerCase() !== "adicionais"
        );
        setTiposProduto(filtrados);
      } catch (error) {
        console.error("Erro ao carregar tipos de produto:", error);
      }
    };

    fetchTiposProduto();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTipoChange = (event) => {
    setSelectedTipo(event.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-20 bg-blue-600 shadow-lg w-full">
        <header className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto">
          <ReturnButton linkPage={"/Preferencias"} />
          <h1 className="font-bold text-3xl text-white text-center flex-grow">
            Sabores
          </h1>
        </header>

        {/* Container do Search e do Filtro na mesma linha */}
        <div className="bg-white shadow-md">
          <div className="px-4 py-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              
              {/* Barra de pesquisa (ocupa todo o espaço restante) */}
              <div className="flex-1">
                <Search nome="Pesquise seu Sabor!" onSearch={handleSearch} />
              </div>

              {/* ComboBox menor, com ícone parecido com o Search */}
              <div className="relative w-28">
                {/* Ícone à esquerda (ex: funil) */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0
                         011-1h16a1 1 0
                         011 1v2.382a1 1
                         0 01-.293.707l-5.414
                         5.414A1 1 0
                         0014 13.586V18l-4
                         2v-6.414a1
                         1 0 00-.293-.707L4.293
                         7.09A1 1 0
                         014 6.383V4z"
                    />
                  </svg>
                </div>
                
                {/* SELECT com fonte menor (text-xs) e padding reduzido (py-2) */}
                <select
                  className="
                    w-28 py-3.5 pl-6 pr-3 border border-gray-300
                    rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500
                    focus:outline-none focus:border-blue-500
                    text-xs bg-white
                  "
                  value={selectedTipo}
                  onChange={handleTipoChange}
                >
                  <option value="">Todos</option>
                  {tiposProduto.map((tipo) => (
                    <option key={tipo.id} value={tipo.descricao}>
                      {tipo.descricao}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="flex-grow px-4 pb-16 w-full max-w-4xl mt-4">
        <section>
          <SaborBox searchTerm={searchTerm} selectedTipo={selectedTipo} />
        </section>
      </main>
    </div>
  );
}

export default SaboresPage;
