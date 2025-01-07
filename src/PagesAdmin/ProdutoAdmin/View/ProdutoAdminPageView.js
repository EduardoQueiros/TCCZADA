import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ProdutoAdminPageController from "../Controller/ProdutoAdminPageController";
import BoxProduto from "../Components/BoxProduto";
import Search from "../../../Components/Search";
import ReturnButton from "../../../Components/ReturnButton";

function ProdutoAdminPageView() {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRemoveClick = async (id) => {
    try {
      await ProdutoAdminPageController.removerProduto(id, setProdutos, setError);
      Swal.fire("Removido!", "O produto foi removido com sucesso.", "success");
    } catch (err) {
      Swal.fire("Erro", `Erro ao remover o produto: ${err.message}`, "error");
    }
  };

  useEffect(() => {
    const loadProdutos = async () => {
      await ProdutoAdminPageController.fetchProdutos(setProdutos, setError, setIsLoading);
    };
    loadProdutos();
  }, []);

  useEffect(() => {
    ProdutoAdminPageController.handleSearch(searchTerm, produtos, setFilteredProdutos);
  }, [searchTerm, produtos]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-20 bg-blue-600 shadow-lg w-full">
        <header className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto">
          <ReturnButton linkPage="/admin/home" />
          <h1 className="font-bold text-3xl text-white text-center flex-grow">
            Produtos
          </h1>
        </header>
        <div className="bg-white shadow-md">
          <div className="px-4 py-4 max-w-4xl mx-auto">
            <Search nome="Pesquise seu Produto!" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <main className="flex-grow px-4 pb-16 w-full max-w-4xl mt-4">
        <section>
          <div className="bg-white rounded-lg shadow-md p-4">
            {isLoading ? (
              <div className="text-center text-blue-600 text-lg mt-10">
                Carregando produtos...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 mt-10">Erro: {error}</div>
            ) : (
              <BoxProduto
                produtos={filteredProdutos}
                onProductClick={(id) => (window.location.href = `/admin/home/produto/editar/${id}`)}
                onRemoveClick={handleRemoveClick}
              />
            )}
          </div>
        </section>
      </main>

      {/* Botão fixo de Adicionar Produto */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-blue-600 shadow-inner">
        <div className="flex justify-center py-4">
          <button
            className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => (window.location.href = "/admin/home/produto/cadastrar")}
          >
            + Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoAdminPageView;
