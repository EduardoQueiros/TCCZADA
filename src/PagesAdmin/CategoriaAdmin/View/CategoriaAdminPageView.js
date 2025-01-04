import { useState, useEffect } from "react";
import CategoriaAdminPageController from "../Controller/CategoriaAdminPageController";
import ReturnButton from "../../../Components/ReturnButton";
import CheckBox from "../Components/CheckBox";
import Search from "../../../Components/Search";

function CategoriaAdminPageView() {
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (term) => setSearchTerm(term);

  const handleDelete = (id) => {
    // Remove a categoria excluída da lista
    setCategorias((prevCategorias) =>
      prevCategorias.filter((categoria) => categoria.id !== id)
    );
  };

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-orange-100 to-orange-300 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-orange-600 shadow-lg">
        <ReturnButton linkPage="/admin/home" />
        <h1 className="font-bold text-3xl text-white">Gestão de Categorias</h1>
        <div className="invisible w-12" />
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mt-6 px-4">
        <Search nome="Pesquise sua Categoria!" onSearch={handleSearch} />
      </div>

      {/* Categorias List */}
      <main className="flex-grow mt-10 px-4">
        <CheckBox categorias={categoriasFiltradas} onDelete={handleDelete} />
      </main>

      {/* Footer Actions */}
      <footer className="bg-orange-600 py-4">
        <div className="flex justify-center gap-4">
          <a href="/admin/home/categoria/cadastro">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all">
              Nova Categoria
            </button>
          </a>
          
        </div>
      </footer>
    </div>
  );
}

export default CategoriaAdminPageView;
