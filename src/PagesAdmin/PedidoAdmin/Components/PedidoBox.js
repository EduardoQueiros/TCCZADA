import React, { useState } from "react";

function PedidoBox({ mesa, cliente, produtos = [], adicionais = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg border border-gray-200 p-4 mb-2 transition-all duration-300 m-2 ${
        isExpanded ? "bg-gray-100" : ""
      } hover:shadow-lg cursor-pointer`}
      onClick={toggleExpand}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-500">Mesa</span>
          <span className="text-xl font-bold text-gray-800">{mesa}</span>
        </div>

        <div className="flex flex-col space-y-1 text-right">
          <span className="text-sm font-medium text-gray-500">Cliente</span>
          <span className="text-lg font-semibold text-gray-700">{cliente}</span>
        </div>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Produtos</h2>
          <ul className="space-y-2">
            {produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-md p-2 shadow-sm"
                >
                  <span className="text-gray-700">{produto.nome}</span>
                  <span className="text-gray-500">Qtd: {produto.quantidade}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum produto no pedido.</p>
            )}
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Adicionais</h2>
          <ul className="space-y-2">
            {adicionais.length > 0 ? (
              adicionais.map((adicional, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-md p-2 shadow-sm"
                >
                  <span className="text-gray-700">{adicional.nome}</span>
                  <span className="text-gray-500">Qtd: {adicional.quantidade}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum adicional no pedido.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PedidoBox;
