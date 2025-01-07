import React from "react";
import DashFiltros from "../Components/DashFiltros";
import Grafico from "../Components/Grafico";
import ReturnButton from "../../../Components/ReturnButton";

function DashView({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedType,
  setSelectedType,
  graficoPedidosPorMesa,
  fetchDashboardData,
}) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 shadow-md">
        <div className="flex items-center justify-between px-4 py-4">
          <ReturnButton linkPage="/admin/home" />
          <h1 className="font-bold text-3xl text-white text-center flex-grow">
            Relatório de Pedidos
          </h1>
        </div>

        {/* Filtros fixos */}
        <div className="mt-4">
          <DashFiltros
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSelectedType={setSelectedType}
            onFilter={fetchDashboardData}
          />
        </div>
      </div>

      {/* Gráficos */}
      {selectedType === "PedidosPorMesa" && (
        <div className="pt-56 px-4"> {/* Ajuste de espaçamento */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Relatório de Pedidos por Mesa
          </h2>
          <Grafico graficoPedidosPorMesa={graficoPedidosPorMesa} />
        </div>
      )}
    </div>
  );
}

export default DashView;
