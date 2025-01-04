import React, { useState, useEffect } from "react";
import CadastrarMesaController from "../Controller/CadastrarMesaController";
import MesaModel from "../Model/MesaModel";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";



function CadastrarMesaView() {
  const [codigo, setCodigo] = useState("");
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState(null);

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
      alert("Mesa salva com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-300 to-orange-500">
      {/* Header */}
      <header className="w-full py-6 bg-orange-600 text-white shadow-md">
        <h1 className="text-3xl font-bold text-center">Cadastro de Mesa</h1>
      </header>

      {/* Input Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Digite o código da mesa"
            className="w-full text-center border border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-400"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <a href="/admin/home/mesa">
            <button
              className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={handleSalvar}
            >
              <AiOutlineSave className="mr-2 text-xl" />
              Salvar

            </button>
          </a>
          <a href="/admin/home/mesa">
            <button className="flex items-center justify-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition">
              <AiOutlineClose className="mr-2 text-xl" />
              Cancelar
            </button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-orange-600 text-center text-white text-sm">
        © 2024 - Sistema de Cadastro de Mesas
      </footer>
    </div>
  );
}

export default CadastrarMesaView;
