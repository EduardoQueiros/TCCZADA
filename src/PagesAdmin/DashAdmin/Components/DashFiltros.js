import React, { useState } from "react";
import Swal from "sweetalert2";

function DashFiltros({ setStartDate, setEndDate, setSelectedType, onFilter }) {
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [localSelectedType, setLocalSelectedType] = useState("");

  const handleFilterClick = () => {
    if (!localStartDate || !localEndDate || !localSelectedType) {
      Swal.fire({
        icon: "warning",
        title: "Dados inválidos",
        text: "Por favor, selecione o tipo de relatório e o intervalo de datas.",
        confirmButtonText: "Ok",
      });
      return;
    }

    setStartDate(localStartDate);
    setEndDate(localEndDate);
    setSelectedType(localSelectedType);
    onFilter();

    // Exibe o alerta de sucesso aqui
    Swal.fire({
      icon: "success",
      title: "Filtro aplicado com sucesso!",
      text: `Os dados foram carregados para o intervalo de ${localStartDate} a ${localEndDate}.`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-b-lg p-4">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        {/* Filtros de Datas */}
        <div className="flex space-x-4 mb-4 sm:mb-0">
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

        {/* Seleção de Tipo de Relatório */}
        <div className="mb-4 sm:mb-0">
          <select
            value={localSelectedType}
            onChange={(e) => setLocalSelectedType(e.target.value)}
            className="border border-gray-400 rounded-lg p-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um Relatório</option>
            <option value="PedidosPorMesa">Relatório de Pedidos por Mesa</option>
          </select>
        </div>

        {/* Botão de Filtrar */}
        <button
          onClick={handleFilterClick}
          className="bg-blue-500 text-white rounded-lg px-6 py-2 transition duration-200 ease-in-out focus:outline-none hover:bg-blue-600 shadow-lg"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default DashFiltros;
