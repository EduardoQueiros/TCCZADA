import React, { useState, useEffect } from "react";
import BotaoDashPedidos from "../Components/BotaoDashPedido";
import MaisPedidoBox from "../Components/MaisPedidoBox";
import ReturnButton from "../../../Components/ReturnButton";
import fetchMaisPedidos from "../Controller/MaisPedidoController";

function MaisPedidoView() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { produtos, total } = await fetchMaisPedidos();
      setProdutosMaisVendidos(produtos);
      setTotalPedidos(total);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(err.message || "Erro ao buscar dados.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Carrega os dados inicialmente

    const interval = setInterval(() => {
      fetchData(); // Atualiza os dados a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho fixo */}
      <header className="sticky top-0 z-50 bg-blue-600 shadow-lg p-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          <ReturnButton linkPage={"/admin/home"} />
          <h1 className="font-bold text-2xl text-white text-center flex-grow">Mais Pedidos</h1>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <BotaoDashPedidos
            name={"Pedido"}
            linkPage={"/admin/home/pedido"}
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          />
          <BotaoDashPedidos
            name={"Mais Pedidos"}
            linkPage={"#"}
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          />
        </div>
      </header>

      {/* Lista de Pedidos */}
      <section className="flex-grow px-4 py-6">
        <div className="mt-6">
          {isLoading ? (
            <p className="text-center text-gray-600">Carregando...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <MaisPedidoBox produtosMaisVendidos={produtosMaisVendidos} />
          )}
        </div>
      </section>

      {/* Total de Pedidos fixo */}
      <section className="sticky bottom-0 z-50 bg-blue-600 shadow-md p-4 flex justify-center items-center">
        <div className="bg-white w-80 text-center rounded-lg h-12 flex items-center justify-center shadow-md">
          <p className="text-lg font-semibold text-blue-700">Total de Pedidos: {totalPedidos}</p>
        </div>
      </section>
    </div>
  );
}

export default MaisPedidoView;
