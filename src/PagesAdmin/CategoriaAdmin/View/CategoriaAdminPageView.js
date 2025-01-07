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
    setCategorias((prevCategorias) =>
      prevCategorias.filter((categoria) => categoria.id !== id)
    );
  };

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Header fixo */}
      <div className="sticky top-0 z-20 bg-blue-600 shadow-lg">
        <div className="flex flex-col items-center w-full px-4 py-4">
          {/* Retorno e título */}
          <div className="flex items-center justify-between w-full max-w-5xl">
            <ReturnButton linkPage="/admin/home" />
            <h1 className="text-white font-bold text-2xl text-center flex-grow">
              Gestão de Categorias
            </h1>
            <div className="w-10"></div> {/* Placeholder para alinhamento */}
          </div>

          {/* Campo de Pesquisa */}
          <div className="w-full max-w-5xl mt-4">
            <Search nome="Pesquise sua Categoria!" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <main className="flex-grow px-4 pb-16 mt-4">
        <section>
          <CheckBox categorias={categoriasFiltradas} onDelete={handleDelete} />
        </section>
      </main>

      {/* Botão fixo de Nova Categoria */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-blue-600 shadow-inner">
        <div className="flex justify-center py-4">
          <a href="/admin/home/categoria/cadastro">
            <button className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Nova Categoria
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoriaAdminPageView;
