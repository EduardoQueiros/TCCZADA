import React, { useState } from "react";

function FiltrosRelatorio({ setStartDate, setEndDate, setSelectedCategory, onFilter }) {
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");

  const handleFilterClick = () => {
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    onFilter(); // Ativa o filtro
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={localStartDate}
          onChange={(e) => setLocalStartDate(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={localEndDate}
          onChange={(e) => setLocalEndDate(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-400 rounded-lg p-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um Relatório</option>
          <option value="PedidosPorMesa">Relatório de Pedidos por Mesa</option>
        </select>
      </div>
      <button
        onClick={handleFilterClick}
        className="bg-blue-500 text-white rounded-lg px-6 py-2 transition duration-200 ease-in-out focus:outline-none hover:bg-blue-600 shadow-lg"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FiltrosRelatorio;
