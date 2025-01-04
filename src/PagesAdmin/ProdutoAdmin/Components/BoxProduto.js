import React from "react";

function BoxProduto({ produtos, onProductClick, onRemoveClick }) {
  if (!produtos || produtos.length === 0) {
    return <div className="text-center text-gray-500 mt-4">Nenhum produto encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          {/* Imagem do Produto */}
          <div className="relative">
            {produto.imagem ? (
              <img
                src={`data:image/jpeg;base64,${produto.imagem}`}
                alt={produto.descricao}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800 text-center truncate">{produto.descricao}</h2>
            <p className="text-sm text-gray-500 text-center mt-1 truncate">
              {produto.tipoProduto?.descricao || "Sem categoria"}
            </p>
            <p className="text-xl font-bold text-green-600 text-center mt-2">
              R$ {produto.valor ? produto.valor.toFixed(2) : "0.00"}
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-around items-center p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => onProductClick(produto.id)}
              className="flex items-center text-blue-600 hover:text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <img
                src="https://img.icons8.com/?size=100&id=56304&format=png&color=000000"
                alt="Editar"
                className="w-5 h-5 mr-2"
              />
              Editar
            </button>
            <button
              onClick={() => onRemoveClick(produto.id)}
              className="flex items-center text-red-600 hover:text-white hover:bg-red-600 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <img
                src="https://img.icons8.com/?size=100&id=102550&format=png&color=000000"
                alt="Remover"
                className="w-5 h-5 mr-2"
              />
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxProduto;
