import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SaborBoxController(searchTerm) {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getClienteId = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    return userLogin?.clienteId || null;
  };

  const fetchProdutosJaAdicionados = async (clienteId) => {
    try {
      const response = await axios.post(
        "https://nova-api-l5ht.onrender.com/api/v1/cliente-preferencia/criteria",
        {
          status: "RECEBIDO",
          cliente: { id: clienteId },
        }
      );
      return response.data.map((item) => item.produto.id);
    } catch (err) {
      return [];
    }
  };

  const adicionarProduto = async (produto) => {
    try {
      const clienteId = getClienteId();

      if (!clienteId) {
        throw new Error("ID do cliente não encontrado. Realize o login novamente.");
      }

      const postData = [
        {
          status: 1,
          cliente: { id: clienteId },
          produto: { id: produto.id },
        },
      ];

      await axios.post("https://nova-api-l5ht.onrender.com/api/v1/cliente-preferencia", postData);

      Swal.fire({
        title: "Sucesso!",
        text: "Produto adicionado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFilteredProdutos((prevFiltrados) =>
        prevFiltrados.filter((filtrado) => filtrado.id !== produto.id)
      );

      navigate("/Preferencias");
    } catch (err) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao adicionar o produto. Tente novamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      setIsLoading(true);
      try {
        const clienteId = getClienteId();

        if (!clienteId) {
          throw new Error("ID do cliente não encontrado. Realize o login novamente.");
        }

        const produtosJaAdicionadosIds = await fetchProdutosJaAdicionados(clienteId);

        const response = await axios.get("https://nova-api-l5ht.onrender.com/api/v1/produto");

        const produtosFiltrados = response.data.filter(
          (produto) =>
            produto.tipoProduto.descricao.toLowerCase() !== "adicionais" &&
            !produtosJaAdicionadosIds.includes(produto.id)
        );

        setProdutos(produtosFiltrados);
        setFilteredProdutos(produtosFiltrados);
      } catch (err) {
        setError(err);
        Swal.fire({
          title: "Erro",
          text: "Erro ao carregar os produtos. Tente novamente mais tarde.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const filtrados = produtos.filter(
      (produto) =>
        !searchTerm ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProdutos(filtrados);
  }, [searchTerm, produtos]);

  return { produtos: filteredProdutos, isLoading, error, adicionarProduto };
}

export default SaborBoxController;
