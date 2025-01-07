import React, { useEffect, useState } from "react";
import ItemBoxAdicional from "../View/ItemBoxAdicional";
import ItemBoxProduto from "../View/ItemBoxProduto";
import PreferenciasControllerAdicionais from "../Controller/PreferenciasControllerAdicionais";
import PreferenciasControllerProduto from "../Controller/PreferenciasControllerProduto";
import { toast } from "react-toastify";
import EstouSatisfeitoButton from "../Components/EstouSatisfeitoButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Preferencias() {
  const [clienteId, setClienteId] = useState(null);
  const navigate = useNavigate();

  // ADICIONAL
  const {
    adicionais,
    loading: loadingAdicionais,
    error: errorAdicionais,
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

  // Carregar clienteId do localStorage
  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (!userLogin?.clienteId) {
      Swal.fire({
        title: "Erro",
        text: "Cliente não encontrado. Faça login novamente.",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } else {
      setClienteId(userLogin.clienteId);
    }
  }, [navigate]);

  // Carregar adicionais e produtos
  useEffect(() => {
    fetchClientePreferencia();
    fetchClientePreferenciaProduto();
  }, [fetchClientePreferencia, fetchClientePreferenciaProduto]);

  // Lógica para clique em adicional
  const handleClickAdicional = async (index) => {
    if (isAdicionalValido(index)) {
      const result = await Swal.fire({
        title: "Confirmar",
        text: "Deseja remover esse adicional!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (result.isConfirmed) {
        const adicional = adicionais[index];
        await updateProdutoStatus(adicional);
        Swal.fire("Sucesso!", "Adicional removido com sucesso!", "success");
      }
    } else {
      Swal.fire("Atenção", "Este espaço está vazio. Não há item para atualizar.", "info");
    }
  };

  // Lógica para clique em produto
  const handleClickProduto = async (index) => {
    if (isProdutoValido(index)) {
      const result = await Swal.fire({
        title: "Confirmar",
        text: "Deseja remover esse produto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (result.isConfirmed) {
        const produto = produtos[index];
        await updateProdutoStatusProduto(produto);
        Swal.fire("Sucesso!", "Produto removido com sucesso!", "success");
      }
    } else {
      Swal.fire("Atenção", "Este espaço está vazio. Não há item para atualizar.", "info");
    }
  };

  // Placeholders para produtos
  const totalSlotsGrid1 = 3; // Primeiro grid com 3 itens
  const totalSlotsGrid2 = 2; // Segundo grid com 2 itens
  const produtosGrid1 = produtos.slice(0, totalSlotsGrid1);
  const produtosGrid2 = produtos.slice(totalSlotsGrid1, totalSlotsGrid1 + totalSlotsGrid2);

  const placeholdersGrid1 = Array.from({
    length: Math.max(totalSlotsGrid1 - produtosGrid1.length, 0),
  });
  const placeholdersGrid2 = Array.from({
    length: Math.max(totalSlotsGrid2 - produtosGrid2.length, 0),
  });

  // Placeholders para adicionais
  const totalSlotsAdicional = 3; // Total de slots para adicionais
  const placeholdersAdicional = Array.from({
    length: Math.max(totalSlotsAdicional - adicionais.length, 0),
  });

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      <header className="py-3 bg-indigo-600 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold">Preferências</h1>
      </header>

      {/* Produtos Preferidos */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Produtos Preferidos
        </h2>
        {loadingProdutos && <p>Carregando produtos...</p>}
        {errorProdutos && <p className="text-red-500">Erro ao carregar produtos.</p>}

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
        {loadingAdicionais && <p>Carregando adicionais...</p>}
        {errorAdicionais && <p className="text-red-500">Erro ao carregar adicionais.</p>}

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

      {/* Estou Satisfeito */}
      <section className="mt-16 px-6 flex justify-center">
        <EstouSatisfeitoButton
          clienteId={clienteId}
          itens={[...adicionais, ...produtos]}
          navigate={navigate} // Passando navigate para o botão
        />
      </section>

      <footer className="mt-16 bg-indigo-600 text-white py-4 text-center">
        <p>© 2024 - Sistema de Preferências</p>
      </footer>
    </div>
  );
}

export default Preferencias;
