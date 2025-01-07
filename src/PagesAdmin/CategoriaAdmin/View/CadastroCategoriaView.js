import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CadastrarCategoriaController from "../Controller/CadastroCategoriaController";
import CategoriaAdminPageController from "../Controller/CategoriaAdminPageController";
import { useNavigate } from "react-router-dom";

function CadastroCategoriaView() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const categoriasData = await CategoriaAdminPageController.fetchCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCategorias();
  }, []);

  const handleSalvar = async () => {
    try {
      const nova = await CadastrarCategoriaController.handleSalvar(novaCategoria, categorias);
      setCategorias([...categorias, nova]);
      setNovaCategoria("");

      Swal.fire({
        title: "Sucesso!",
        text: "Categoria cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin/home/categoria")); // Redireciona para a tela de categorias
    } catch (err) {
      Swal.fire("Erro", err.message, "error");
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg mt-6">
        Erro ao carregar categorias: {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Header fixo */}
      <header className="sticky top-0 w-full bg-blue-600 text-white shadow-lg z-10 py-4">
        <h1 className="text-3xl font-bold text-center">Cadastro de Categoria</h1>
      </header>

      {/* Formulário */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Adicionar Nova Categoria
          </h2>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            className="w-full text-center border border-gray-300 rounded-lg p-3 mb-6 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
          />
          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={handleSalvar}
            >
              Salvar
            </button>
            <button
              className="flex items-center justify-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
              onClick={() => navigate("/admin/home/categoria")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-blue-600 text-center text-white text-sm">
        © 2024 - Sistema de Cadastro de Categorias
      </footer>
    </div>
  );
}

export default CadastroCategoriaView;
