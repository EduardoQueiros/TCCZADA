import React, { useState } from "react";
import BotaoDashPedidos from "../Components/BotaoDashPedido";
import MaisPedidoBox from "../Components/MaisPedidoBox";
import ReturnButton from "../../../Components/ReturnButton";
import MaisPedidoController from "../Controller/MaisPedidoController";

function MaisPedidoView() {
  const [totalPedidos, setTotalPedidos] = useState(0); // Estado para o total de pedidos

  const handleTotalChange = (total) => {
    setTotalPedidos(total); // Atualiza o estado com o total recebido
  };

  // Chamar o controlador para gerenciar a lógica
  const { produtosMaisVendidos, isLoading, error } = MaisPedidoController(handleTotalChange);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between p-4 bg-blue-600 shadow-lg">
        <ReturnButton linkPage={"/admin/home"} />
        <h1 className="font-bold text-3xl text-white text-center flex-grow">Mais Pedidos</h1>
      </header>

      {/* Botões Dash */}
      <section className="mt-6 px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <BotaoDashPedidos
            name={"Pedido"}
            linkPage={"/admin/home/pedido"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          />
          <BotaoDashPedidos
            name={"Mais Pedidos"}
            linkPage={"#"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          />
        </div>
      </section>

      {/* Lista de Pedidos */}
      <section className="flex-grow px-4 py-6">
        <div className="mt-6">
          <MaisPedidoBox
            produtosMaisVendidos={produtosMaisVendidos}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </section>

      {/* Total de Pedidos */}
      <section className="flex justify-center items-center mt-6">
        <div className="bg-blue-100 w-80 text-center rounded-lg h-12 flex items-center justify-center shadow-md">
          <p className="text-lg font-semibold text-blue-700">Total de Pedidos: {totalPedidos}</p>
        </div>
      </section>

      {/* Rodapé fixo */}
      <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
        <p>© 2024 - Sistema de Gerenciamento de Pedidos</p>
      </footer>
    </div>
  );
}

export default MaisPedidoView;
