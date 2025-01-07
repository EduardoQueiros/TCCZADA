import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importa animações

function RelPedidoPorMesa({ pedidosFiltrados, isLoading, error }) {
  const [expandedMesa, setExpandedMesa] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-600 animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
        <p className="ml-4 text-lg text-blue-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-lg">Erro ao carregar dados.</p>
      </div>
    );
  }

  const toggleExpand = (mesaId) => {
    setExpandedMesa((prev) => (prev === mesaId ? null : mesaId));
  };

  return (
    <div className="p-4">
      {pedidosFiltrados.map((pedido, index) => (
        <motion.div
          key={index}
          className="bg-gray-100 mt-4 mx-4 rounded-lg shadow-md p-4 transition duration-300 hover:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Cabeçalho da Mesa */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(pedido.mesaId)}
          >
            <h1 className="text-xl font-semibold text-blue-600 flex items-center">
              Mesa {pedido.mesaId}
              {expandedMesa === pedido.mesaId ? (
                <motion.span
                  className="ml-2 text-lg text-blue-400"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                >
                  ▼
                </motion.span>
              ) : (
                <motion.span
                  className="ml-2 text-lg text-blue-400"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                >
                  ►
                </motion.span>
              )}
            </h1>
            <div className="flex flex-col sm:flex-row sm:gap-4 text-right">
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
          <AnimatePresence>
            {expandedMesa === pedido.mesaId && (
              <motion.div
                className="mt-4 bg-white p-4 rounded-md shadow-inner"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {pedido.pedidos.map((detalhe, pedidoIndex) => (
                  <div
                    key={pedidoIndex}
                    className="border-t border-gray-300 pt-4 mt-4 text-sm"
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default RelPedidoPorMesa;
