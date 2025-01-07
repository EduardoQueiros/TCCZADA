import React, { useState } from "react";
import Swal from "sweetalert2"; // Importa o SweetAlert2

function FiltrosRelatorio({ setStartDate, setEndDate, setSelectedCategory, onFilter }) {
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [localCategory, setLocalCategory] = useState(""); // Adicionado para validação de categoria

  const handleFilterClick = () => {
    if (!localCategory) {
      // Exibe um alerta se a categoria não for selecionada
      Swal.fire({
        icon: "warning",
        title: "Tipo de Relatório Não Selecionado",
        text: "Por favor, selecione um tipo de relatório antes de filtrar.",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (localStartDate && localEndDate) {
      const formattedStartDate = `${localStartDate} 00:00`; // Adiciona 00:00 como padrão
      const formattedEndDate = `${localEndDate} 23:59`; // Adiciona 23:59 como padrão
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setSelectedCategory(localCategory); // Salva a categoria selecionada
      onFilter();

      // Exibe um alerta de sucesso com SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Filtro Aplicado!",
        text: `Os pedidos no intervalo de ${localStartDate} a ${localEndDate} foram carregados.`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      // Exibe um alerta de erro com SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Erro ao Aplicar Filtro",
        text: "Por favor, selecione as datas para o filtro.",
        confirmButtonText: "Ok",
      });
    }
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
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
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
