import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import CadastrarMesaController from "../Controller/CadastrarMesaController";
import MesaModel from "../Model/MesaModel";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";

function CadastrarMesaView() {
  const [codigo, setCodigo] = useState("");
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const mesas = await MesaModel.fetchMesas();
        setMesas(mesas);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMesas();
  }, []);

  const handleSalvar = async () => {
    try {
      const novaMesa = await CadastrarMesaController.handleSalvar(codigo, mesas);
      setMesas([...mesas, novaMesa]);
      setCodigo("");

      // Exibir mensagem de sucesso e redirecionar após confirmação
      Swal.fire({
        title: "Sucesso!",
        text: "Mesa cadastrada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/admin/home/mesa"); // Redireciona para MesaAdminPageView
      });
    } catch (err) {
      Swal.fire("Erro", err.message, "error");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="w-full py-6 bg-blue-600 text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">Cadastro de Mesa</h1>
      </header>

      {/* Input Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Digite o código da mesa"
            className="w-full text-center border border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={handleSalvar}
          >
            <AiOutlineSave className="mr-2 text-xl" />
            Salvar
          </button>
          <a href="/admin/home/mesa">
            <button className="flex items-center justify-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition">
              <AiOutlineClose className="mr-2 text-xl" />
              Cancelar
            </button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-blue-600 text-center text-white text-sm">
        © 2024 - Sistema de Cadastro de Mesas
      </footer>
    </div>
  );
}

export default CadastrarMesaView;
