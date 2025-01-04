import React, { useState } from "react";
import PedidoPageAdminController from "../Controller/PedidoPageAdminController";
import PedidoBox from "../Components/PedidoBox";
import ReturnButton from "../../../Components/ReturnButton";
import BotaoDashPedidos from "../Components/BotaoDashPedido";
import Search from "../../../Components/Search";

function PedidoPageAdminView() {
  const [searchTerm, setSearchTerm] = useState("");
  const { pedidos, loading, error } = PedidoPageAdminController(searchTerm);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between p-4 bg-blue-600 shadow-lg">
        <ReturnButton linkPage={"/admin/home"} />
        <h1 className="font-bold text-3xl text-white text-center flex-grow">
          Pedidos
        </h1>
      </header>

      {/* Botões Dash */}
      <section className="mt-6 px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <BotaoDashPedidos
            name={"Pedido"}
            linkPage={"#"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          />
          <BotaoDashPedidos
            name={"Mais Pedidos"}
            linkPage={"/admin/home/pedido/maispedido"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          />
        </div>
      </section>

      {/* Barra de Pesquisa */}
      <section className="flex justify-center mt-6 mb-6">
        <Search
          nome={"Pesquise pedidos"}
          onSearch={handleSearch}
          className="w-full max-w-lg"
        />
      </section>

      {/* Lista de Pedidos */}
      <section className="flex-grow px-4 py-6">
        {loading && <p className="text-center text-gray-700">Carregando pedidos...</p>}
        {error && <p className="text-center text-red-500">Erro ao carregar pedidos.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pedidos.map((pedido) => (
            <PedidoBox
              key={pedido.id}
              mesa={pedido.mesa}
              cliente={pedido.cliente}
              produtos={pedido.produtos}
              adicionais={pedido.adicionais}
            />
          ))}
        </div>
      </section>

      {/* Rodapé fixo */}
      <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
        <p>© 2024 - Sistema de Gerenciamento de Pedidos</p>
      </footer>
    </div>
  );
}

export default PedidoPageAdminView;
