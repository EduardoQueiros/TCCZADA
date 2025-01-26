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
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-600 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <ReturnButton linkPage="/admin/home" />
          <h1 className="font-bold text-3xl text-white text-center flex-grow">
            Dashboard de Pedidos
          </h1>
        </div>
      </header>

      {/* Filtros */}
      <div className="mt-24 px-4 max-w-3xl mx-auto">
        <DashFiltros
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedType={setSelectedType}
          onFilter={fetchDashboardData}
        />
      </div>

      {/* Gráficos */}
      {selectedType === "PedidosPorMesa" && (
        <main className="pt-12 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Dashboard de Pedidos por Mesa
            </h2>
            <Grafico graficoPedidosPorMesa={graficoPedidosPorMesa} />
          </div>
        </main>
      )}
    </div>
  );
}

export default DashView;
