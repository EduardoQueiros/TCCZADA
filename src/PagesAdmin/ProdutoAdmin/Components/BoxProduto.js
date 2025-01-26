import React from "react";
import Swal from "sweetalert2";

function BoxProduto({ produtos, onProductClick, onRemoveClick }) {
  const handleRemoveClick = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá desfazer essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onRemoveClick(id); // Chama a função de exclusão passada como prop
          Swal.fire("Removido!", "O produto foi removido com sucesso.", "success");
        } catch (error) {
          Swal.fire("Erro", `Erro ao remover o produto: ${error.message}`, "error");
        }
      }
    });
  };

  if (!produtos || produtos.length === 0) {
    return (
      <div className="text-center text-blue-500 mt-4">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-blue-500"
        >
          <div className="relative">
            {produto.imagem ? (
              <img
                src={`data:image/jpeg;base64,${produto.imagem}`}
                alt={produto.descricao}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-64 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500">Sem imagem</span>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-blue-700 text-center truncate">
              {produto.descricao}
            </h2>
            <p className="text-sm text-blue-400 text-center mt-1 truncate">
              {produto.tipoProduto?.descricao || "Sem categoria"}
            </p>
            <p className="text-xl font-bold text-green-500 text-center mt-2">
              R$ {produto.valor ? produto.valor.toFixed(2) : "0.00"}
            </p>
          </div>

          <div className="flex justify-around items-center p-4 border-t border-blue-200 bg-blue-50 ">
            <button
              onClick={() => onProductClick(produto.id)}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg transition-all mr-2"
            >
              <img
                src="https://img.icons8.com/?size=100&id=56304&format=png&color=ffffff"
                alt="Editar"
                className="w-5 h-5 mr-2"
              />
              Editar
            </button>
            <button
              onClick={() => handleRemoveClick(produto.id)}
              className="flex items-center text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <img
                src="https://img.icons8.com/?size=100&id=102550&format=png&color=ffffff"
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
