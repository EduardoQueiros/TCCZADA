import React from "react";

function ItemBoxAdicional({ url, imagem, descricao, onClick, adicional }) {
  const isPlaceholder = !adicional || !adicional.produto; // Verifica se é um placeholder

  const handleClick = () => {
    if (isPlaceholder) {
      // Redireciona apenas se for um placeholder
      if (url) {
        window.location.href = url; // Redireciona para a URL fornecida
      } else {
        console.warn("URL não definida para o placeholder.");
      }
    } else if (onClick) {
      // Executa a ação fornecida no clique
      onClick();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 cursor-pointer"
      onClick={handleClick} // Define o comportamento do clique
    >
      <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all">
        {imagem ? (
          <img
            src={imagem}
            alt={descricao || "Imagem do adicional"}
            className="w-20 h-20 object-contain rounded-full"
          />
        ) : (
          <div className="text-gray-400 font-semibold text-sm text-center">
            Adicionar Produto
          </div>
        )}
      </div>
      {descricao && (
        <p className="text-center text-gray-700 font-medium mt-3">{descricao}</p>
      )}
    </div>
  );
}

export default ItemBoxAdicional;
