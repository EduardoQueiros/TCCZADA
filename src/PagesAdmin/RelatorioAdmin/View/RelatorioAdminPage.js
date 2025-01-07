import React, { useState } from "react";
import ControllerRelatorioAdminPage from "../Controller/ControllerRelatorioAdminPage";
import ControllerRelPedidoPorMesa from "../Controller/ControllerRelPedidoPorMesa";
import FiltrosRelatorio from "../Components/FiltrosRelatorio";
import RelPedidoPorMesa from "../Components/RelPedidoPorMesa";
import ReturnButton from "../../../Components/ReturnButton";

function RelatorioAdminPage() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategory,
    setSelectedCategory,
  } = ControllerRelatorioAdminPage();

  const [filtroAtivado, setFiltroAtivado] = useState(false);

  const { pedidosFiltrados, isLoading, error } = ControllerRelPedidoPorMesa(
    startDate,
    endDate,
    filtroAtivado
  );

  const handleFilter = () => {
    setFiltroAtivado(true); // Ativa o filtro
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho fixo */}
      <header className="flex items-center justify-between px-4 py-4 bg-blue-600 shadow-lg">
        <ReturnButton linkPage="/admin/home" />
        <h1 className="font-bold text-3xl text-white text-center flex-grow">
          Relatórios
        </h1>
      </header>

      {/* Filtros fixos */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <section className="px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <FiltrosRelatorio
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setSelectedCategory={setSelectedCategory}
              onFilter={handleFilter} // Passa a função handleFilter
            />
          </div>
        </section>
      </div>

      {/* Relatório */}
      <main className="flex-grow px-4 pb-6">
        {selectedCategory === "PedidosPorMesa" && (
          <section>
            <div className="bg-white rounded-lg shadow-md p-4">
              <RelPedidoPorMesa
                pedidosFiltrados={pedidosFiltrados}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </section>
        )}
      </main>

      {/* Rodapé fixo */}
      <footer className="bg-blue-600 text-white py-4 text-center shadow-md mt-auto">
        <p>© 2024 - Sistema de Gerenciamento de Pedidos</p>
      </footer>
    </div>
  );
}

export default RelatorioAdminPage;
