import React, { useState, useEffect } from "react";
import ProdutoAdminPageController from "../Controller/ProdutoAdminPageController";
import BoxProduto from "../Components/BoxProduto";
import Search from "../../../Components/Search";
import ReturnButton from "../../../Components/ReturnButton";
import { useNavigate } from "react-router-dom";

function ProdutoAdminPageView() {
  const [produtos, setProdutos] = useState([]); // Lista completa de produtos
  const [filteredProdutos, setFilteredProdutos] = useState([]); // Lista filtrada
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const [isLoading, setIsLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Controle de erros
  const navigate = useNavigate();

  // Função para atualizar o termo de busca
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Função para remover um produto pelo ID
  const handleRemoveClick = async (id) => {
    await ProdutoAdminPageController.removerProdutos([id], setProdutos, setError);
  };

  // Carregar todos os produtos ao montar o componente
  useEffect(() => {
    const loadProdutos = async () => {
      await ProdutoAdminPageController.fetchProdutos(setProdutos, setError, setIsLoading);
    };
    loadProdutos();
  }, []);

  // Atualizar produtos filtrados ao alterar o termo de busca ou a lista de produtos
  useEffect(() => {
    ProdutoAdminPageController.handleSearch(searchTerm, produtos, setFilteredProdutos);
  }, [searchTerm, produtos]);

  // Função para redirecionar para a tela de edição de produto
  const handleProductClick = (id) => {
    navigate(`/admin/home/produto/editar/${id}`);
  };

  // Exibição durante o carregamento
  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg mt-10">Carregando produtos...</div>;
  }

  // Exibição caso ocorra um erro
  if (error) {
    return <div className="text-center text-red-500 mt-10">Erro: {error}</div>;
  }

  // Exibição da página principal
  return (
    <div className="bg-gradient-to-b from-orange-200 to-orange-300 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-300 p-4 shadow-md flex items-center">
        <ReturnButton linkPage="/admin/home" />
        <h1 className="flex-grow text-center text-white font-bold text-3xl">Produtos</h1>
      </header>

      {/* Barra de Pesquisa */}
      <section className="flex justify-center px-4 mt-5">
        <Search nome="Pesquise seu Produto!" onSearch={handleSearch} />
      </section>

      {/* Lista de Produtos */}
      <section className="flex-grow px-4 mt-5 overflow-auto">
        <BoxProduto
          produtos={filteredProdutos}
          onProductClick={handleProductClick}
          onRemoveClick={handleRemoveClick} // Passa a função de remoção
        />
      </section>

      {/* Botão de Adicionar Produto */}
      <footer className="p-4 bg-orange-300 shadow-inner">
        <div className="flex justify-center">
          <a href="/admin/home/produto/cadastrar">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              + Adicionar Produto
            </button>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ProdutoAdminPageView;
