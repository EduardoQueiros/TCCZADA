import { useEffect, useState } from "react";
import axios from "axios";

function BoxMesa({ searchTerm }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesas, setMesas] = useState([]);
  const [filteredMesas, setFilteredMesas] = useState([]);

  // Busca mesas na API
  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const response = await axios.get("http://localhost:9091/api/v1/mesa");
        setMesas(response.data);
        setFilteredMesas(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMesa();
  }, []);

  // Filtra mesas pelo termo de busca
  useEffect(() => {
    if (searchTerm) {
      const filtered = mesas.filter((mesa) =>
        mesa.codigoMesa.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMesas(filtered);
    } else {
      setFilteredMesas(mesas);
    }
  }, [searchTerm, mesas]);

  // Função para remover uma única mesa
  const handleRemoveMesa = async (id) => {
    const confirm = window.confirm(`Tem certeza que deseja remover a mesa com ID ${id}?`);
    if (!confirm) return;

    try {
      console.log("Removendo mesa com ID:", id);

      // Enviar o ID como um array no corpo da requisição
      await axios.delete("http://localhost:9091/api/v1/mesa", {
        headers: {
          "Content-Type": "application/json",
        },
        data: [id], // Enviar o ID como um array de inteiros
      });

      // Atualizar as listas localmente
      setMesas((prevMesas) => prevMesas.filter((mesa) => mesa.id !== id));
      setFilteredMesas((prevFiltered) =>
        prevFiltered.filter((mesa) => mesa.id !== id)
      );

      alert(`Mesa com ID ${id} removida com sucesso!`);
    } catch (err) {
      console.error("Erro ao remover mesa:", err);
      alert(
        "Erro ao remover a mesa. Verifique se o ID está correto ou se há dependências associadas."
      );
    }
  };



  // Exibição de carregamento ou erro
  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Carregando mesas...</div>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Ocorreu um erro ao carregar as mesas: {error.message}
      </p>
    );
  }

  return (
    <div>
      {/* Lista de mesas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredMesas.map((mesa, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Mesa {mesa.codigoMesa}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  ID: {mesa.id} | Status: {mesa.status || "Disponível"}
                </p>
              </div>
              <button
                onClick={() => handleRemoveMesa(mesa.id)}
                className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg shadow hover:bg-red-600 transition-all text-sm"
              >
                Remover
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default BoxMesa;
