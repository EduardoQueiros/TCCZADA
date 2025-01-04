import React from "react";

const MaisPedidoBox = ({ produtosMaisVendidos, isLoading, error }) => {
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar pedidos</div>;

  return (
    <div>
      {produtosMaisVendidos.map((produto) => (
        <div
          key={produto.id}
          className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
          <div className="flex items-center">
            <img
              src={produto.imagem || "https://via.placeholder.com/150"}
              alt={produto.descricao}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{produto.descricao}</span>
                <span className="text-sm text-green-500">
                  {produto.quantidade} pedidos
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaisPedidoBox;
