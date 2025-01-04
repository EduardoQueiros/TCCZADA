import React, { useState, useEffect } from "react";
import ReturnButton from "../../../Components/ReturnButton";
import Search from "../../../Components/Search";
import BoxMesa from "../Components/BoxMesa"; // Importando o componente BoxMesa
import MesaAdminPageController from "../Controller/MesaAdminPageController";

function MesaAdminPageView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const mesas = await MesaAdminPageController.getFilteredMesas(searchTerm);
        setMesas(mesas);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMesas();
  }, [searchTerm]);

  const handleSearch = (term) => setSearchTerm(term);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="bg-orange-200 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="w-full bg-orange-500 shadow-lg">
        <div className="flex items-center justify-between px-4 py-4">
          <ReturnButton linkPage={"/admin/home"} />
          <h1 className="text-white font-bold text-2xl text-center flex-1">Gerenciar Mesas</h1>
          <div className="w-10"></div> {/* Placeholder para alinhamento */}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-5xl mt-6 px-4">
        {/* Busca */}
        <div className="flex justify-center">
          <Search
            nome={"Pesquise uma Mesa..."}
            onSearch={handleSearch}
            className="w-full max-w-lg"
          />
        </div>

        {/* Lista de Mesas via BoxMesa */}
        <BoxMesa searchTerm={searchTerm} />
      </div>

      {/* Botão de Nova Mesa */}
      <div className="flex justify-end mt-8">
        <a href="/admin/home/mesa/cadastro">
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            Nova Mesa
          </button>
        </a>
      </div>
    </div>
  );
}

export default MesaAdminPageView;
