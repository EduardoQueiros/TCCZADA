import React, { useState } from "react";

function RelPedidoPorMesa({ pedidosFiltrados, isLoading, error }) {
  const [expandedMesa, setExpandedMesa] = useState(null);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados.</div>;

  const toggleExpand = (mesaId) => {
    setExpandedMesa((prev) => (prev === mesaId ? null : mesaId));
  };

  return (
    <div className="p-4">
      {pedidosFiltrados.map((pedido, index) => (
        <div
          key={index}
          className="bg-gray-100 mt-4 mx-4 rounded-lg shadow-md p-4 transition duration-300 hover:shadow-lg"
        >
          {/* Cabeçalho da Mesa */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(pedido.mesaId)}
          >
            <h1 className="text-xl font-semibold text-blue-600">
              Mesa {pedido.mesaId}
            </h1>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <p className="text-gray-700">
                Total de Pedidos:{" "}
                <strong className="text-blue-600">{pedido.totalPedidos}</strong>
              </p>
              <p className="text-gray-700">
                Total de Produtos:{" "}
                <strong className="text-blue-600">{pedido.totalProdutos}</strong>
              </p>
            </div>
          </div>

          {/* Detalhes Expansíveis */}
          {expandedMesa === pedido.mesaId && (
            <div className="mt-4 bg-white p-4 rounded-md shadow-inner">
              {pedido.pedidos.map((detalhe, pedidoIndex) => (
                <div
                  key={pedidoIndex}
                  className="border-t border-gray-300 pt-2 mt-2 text-sm"
                >
                  <p>
                    <strong>ID do Pedido:</strong> {detalhe.pedido.id}
                  </p>
                  <p>
                    <strong>Total de Produtos:</strong>{" "}
                    {detalhe.totalProdutos}
                  </p>
                  <p>
                    <strong>Valor Total:</strong> R${" "}
                    {detalhe.pedido.totalPedido.toFixed(2)}
                  </p>
                  <p>
                    <strong>Data de Fechamento:</strong>{" "}
                    {detalhe.pedido.dataHoraFechamento}
                  </p>

                  {/* Agrupamento de Produtos */}
                  <div className="mt-2">
                    <strong>Produtos:</strong>
                    <ul className="list-disc ml-6">
                      {detalhe.produtosAgrupados.map((produto, pIndex) => (
                        <li key={pIndex} className="text-gray-700">
                          {produto.descricao} -{" "}
                          <strong>{produto.quantidade}</strong> unidades
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RelPedidoPorMesa;
