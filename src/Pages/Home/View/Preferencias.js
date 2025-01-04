import React, { useEffect } from "react";
import ItemBoxAdicional from "../View/ItemBoxAdicional";
import ItemBoxProduto from "../View/ItemBoxProduto";
import PreferenciasControllerAdicionais from "../Controller/PreferenciasControllerAdicionais";
import PreferenciasControllerProduto from "../Controller/PreferenciasControllerProduto";
import { toast } from "react-toastify";
import EstouSatisfeitoButton from "../Components/EstouSatisfeitoButton";


function Preferencias() {
  // ADICIONAL
  const {
    adicionais,
    loading,
    error,
    fetchClientePreferencia,
    updateProdutoStatus,
    isAdicionalValido,
  } = PreferenciasControllerAdicionais();

  // PRODUTO
  const {
    produtos,
    loading: loadingProdutos,
    error: errorProdutos,
    fetchClientePreferenciaProduto,
    updateProdutoStatusProduto,
    isProdutoValido,
  } = PreferenciasControllerProduto();

  // Efeito para carregar adicionais
  useEffect(() => {
    fetchClientePreferencia();
  }, [fetchClientePreferencia]);

  // Efeito para carregar produtos
  useEffect(() => {
    fetchClientePreferenciaProduto();
  }, [fetchClientePreferenciaProduto]);

  // Lógica para clique em adicional
  const handleClickAdicional = async (index) => {
    if (isAdicionalValido(index)) {
      const confirmacao = window.confirm("Deseja atualizar o status deste adicional?");
      if (confirmacao) {
        const adicional = adicionais[index];
        await updateProdutoStatus(adicional);
        toast.success("Status do adicional atualizado com sucesso!");
      }
    } else {
      toast.info("Este espaço está vazio. Não há item para atualizar.");
    }
  };

  // Lógica para clique em produto
  const handleClickProduto = async (index) => {
    if (isProdutoValido(index)) {
      const confirmacao = window.confirm("Deseja atualizar o status deste produto?");
      if (confirmacao) {
        const produto = produtos[index];
        await updateProdutoStatusProduto(produto);
        toast.success("Status do produto atualizado com sucesso!");
      }
    } else {
      toast.info("Este espaço está vazio. Não há item para atualizar.");
    }
  };

  // Placeholder para produtos
  const totalSlotsGrid1 = 3; // Primeiro grid com 3 itens
  const totalSlotsGrid2 = 2; // Segundo grid com 2 itens
  const produtosGrid1 = produtos.slice(0, totalSlotsGrid1);
  const produtosGrid2 = produtos.slice(totalSlotsGrid1, totalSlotsGrid1 + totalSlotsGrid2);

  const placeholdersGrid1 = Array.from({ length: Math.max(totalSlotsGrid1 - produtosGrid1.length, 0) });
  const placeholdersGrid2 = Array.from({ length: Math.max(totalSlotsGrid2 - produtosGrid2.length, 0) });

  // Placeholder para adicionais
  const totalSlotsAdicional = 3; // Exemplo: um grid com 12 slots
  const placeholdersAdicional = Array.from({ length: Math.max(totalSlotsAdicional - adicionais.length, 0) });

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      <header className="py-3 bg-indigo-600 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold">Preferências</h1>
      </header>

      {/* Produtos Preferidos */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Produtos Preferidos</h2>
        {loadingProdutos && <p>Carregando produtos...</p>}
        {errorProdutos && <p className="text-red-500">Erro ao carregar produtos.</p>}

        {/* Grid 1: 3 Itens */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {produtosGrid1.map((produto, index) => (
            <ItemBoxProduto
              key={index}
              produto={produto}
              onClick={() => handleClickProduto(index)}
              url={"/preferencias/Sabores"}
              imagem={produto.produto?.imagem}
              descricao={produto.produto?.descricao}
            />
          ))}
          {placeholdersGrid1.map((_, index) => (
            <ItemBoxProduto key={`placeholder-produto1-${index}`} url={"/preferencias/Sabores"} />
          ))}
        </div>

        {/* Grid 2: 2 Itens */}
        <div className="grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
          {produtosGrid2.map((produto, index) => (
            <ItemBoxProduto
              key={index + totalSlotsGrid1}
              produto={produto}
              onClick={() => handleClickProduto(index + totalSlotsGrid1)}
              url={"/preferencias/Sabores"}
              imagem={produto.produto?.imagem}
              descricao={produto.produto?.descricao}
            />
          ))}
          {placeholdersGrid2.map((_, index) => (
            <ItemBoxProduto key={`placeholder-produto2-${index}`} url={"/preferencias/Sabores"} />
          ))}
        </div>
      </section>

      {/* Adicionais */}
      <section className="mt-16 px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Adicionais</h2>
        {loading && <p>Carregando adicionais...</p>}
        {error && <p className="text-red-500">Erro ao carregar adicionais.</p>}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {adicionais.map((adicional, index) => (
            <ItemBoxAdicional
              key={index}
              adicional={adicional}
              onClick={() => handleClickAdicional(index)}
              url={"/preferencias/Adicionais"}
              imagem={adicional.produto?.imagem}
              descricao={adicional.produto?.descricao}
            />
          ))}
          {placeholdersAdicional.map((_, index) => (
            <ItemBoxAdicional key={`placeholder-adicional-${index}`} url={"/preferencias/Adicionais"} />
          ))}
        </div>
      </section>


      
      <section className="mt-16 px-6 flex justify-center">
        <EstouSatisfeitoButton />
      </section>

      <footer className="mt-16 bg-indigo-600 text-white py-4 text-center">

        <p>© 2024 - Sistema de Preferências</p>
      </footer>
    </div >
  );
}

export default Preferencias;
