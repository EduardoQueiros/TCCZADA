import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function BoxMesa({ searchTerm }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesas, setMesas] = useState([]);
  const [filteredMesas, setFilteredMesas] = useState([]);

  // Busca mesas na API
  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const response = await axios.get("http://52.202.23.63:9091/api/v1/mesa");
        setMesas(response.data);
        setFilteredMesas(response.data);
      } catch (err) {
        setError(err);
        console.error("Erro ao buscar mesas:", err);
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

  // Função para remover uma mesa
  const handleRemoveMesa = async (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a remover a mesa com ID ${id}. Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://52.202.23.63:9091/api/v1/mesa", {
            headers: { "Content-Type": "application/json" },
            data: [id], // Envia o ID como um array
          });

          // Atualizar as listas localmente
          setMesas((prevMesas) => prevMesas.filter((mesa) => mesa.id !== id));
          setFilteredMesas((prevFiltered) =>
            prevFiltered.filter((mesa) => mesa.id !== id)
          );

          Swal.fire("Removida!", `A mesa com ID ${id} foi removida.`, "success");
        } catch (err) {
          console.error("Erro ao remover mesa:", err);
          Swal.fire(
            "Erro",
            "Não foi possível remover a mesa. Verifique se há dependências associadas.",
            "error"
          );
        }
      }
    });
  };

  // Exibição de carregamento ou erro
  if (isLoading) {
    return <div className="text-center text-lg text-blue-600">Carregando mesas...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Ocorreu um erro ao carregar as mesas: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredMesas.map((mesa) => (
        <div
          key={mesa.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-blue-800">
                Mesa {mesa.codigoMesa}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                ID: {mesa.id} | Status: {mesa.status || "Disponível"}
              </p>
            </div>
            <button
              onClick={() => handleRemoveMesa(mesa.id)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all text-sm"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxMesa;
