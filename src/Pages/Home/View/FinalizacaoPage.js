import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FinalizacaoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Invalida a sessão ao carregar a página
    localStorage.removeItem("userLogin");
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Obrigado!</h1>
      <p className="text-lg text-gray-600 mb-6 m-2">
        Seu pedido foi finalizado. Um garçom está a caminho!
      </p>
      <img
        src="https://1.bp.blogspot.com/-OmCIexMltOc/YDBKmgY7S0I/AAAAAAAGsuQ/9kmTjUDminYwhU1RTNthXzKCYllnJhgPQCLcBGAsYHQ/s1102/1599055659115.gif" // Substitua pelo caminho do seu GIF
        alt="Garçom está a caminho"
        className="w-64 h-64"
      />
      <p className="text-sm text-gray-400 mt-4">
        Para fazer um novo pedido, faça login novamente.
      </p>

      <button
        onClick={() => navigate("/")} // Corrige a lógica do navigate
        className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Voltar ao Início
      </button>
    </div>
  );
}

export default FinalizacaoPage;
