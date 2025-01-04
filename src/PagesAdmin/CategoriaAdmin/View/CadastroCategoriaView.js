import { useEffect, useState } from "react";
import CadastrarCategoriaController from "../Controller/CadastroCategoriaController";
import CategoriaAdminPageController from "../Controller/CategoriaAdminPageController";

function CadastroCategoriaView() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const categoriasData = await CategoriaAdminPageController.fetchCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err.message);
      }
    };

    loadCategorias();
  }, []);

  const handleSalvar = async () => {
    try {
      const nova = await CadastrarCategoriaController.handleSalvar(novaCategoria, categorias);
      setCategorias([...categorias, nova]);
      setNovaCategoria("");
      alert("Categoria salva com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-100 to-orange-300 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-6 bg-orange-600 text-white shadow-md">
        <h1 className="text-3xl font-bold text-center">Cadastro de Categoria</h1>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Adicionar Nova Categoria
          </h2>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            className="w-full text-center border border-gray-300 rounded-lg p-3 mb-6 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-400"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
          />
          <div className="flex justify-center space-x-4">
           <a href="/admin/home/categoria" >
            <button
              className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={handleSalvar}
            >
              Salvar
            </button>
            </a>
            <button
              className="flex items-center justify-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
              onClick={() => (window.location.href = "/admin/home/categoria")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-orange-600 text-center text-white text-sm">
        © 2024 - Sistema de Cadastro de Categorias
      </footer>
    </div>
  );
}

export default CadastroCategoriaView;
