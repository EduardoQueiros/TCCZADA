import { useState, useEffect } from "react";
import axios from "axios";
import ItemBoxModelProduto from "../../Home/Model/ItemBoxModelProduto";
import { useNavigate } from "react-router-dom";

function SaborBoxController(searchTerm) {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Recupera o ID do cliente armazenado no localStorage
  const getClienteId = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    return userLogin?.clienteId || null;
  };

  // Busca os produtos já adicionados com status "RECEBIDO"
  const fetchProdutosJaAdicionados = async (clienteId) => {
    try {
      const response = await axios.post(
        "http://localhost:9091/api/v1/cliente-preferencia/criteria",
        {
          status: "RECEBIDO",
          cliente: { id: clienteId },
        }
      );
      return response.data.map((item) => item.produto.id);
    } catch (err) {
      console.error("Erro ao buscar produtos adicionados:", err);
      return [];
    }
  };

  // Adiciona o produto ao modelo e realiza o POST
  const adicionarProduto = async (produto) => {
    try {
      const clienteId = getClienteId();

      if (!clienteId) {
        throw new Error("ID do cliente não encontrado. Realize o login novamente.");
      }

      const postData = [
        {
          status: 1, // Definindo como 'ativo'
          cliente: {
            id: clienteId, // ID do cliente do localStorage
          },
          produto: {
            id: produto.id, // ID do produto selecionado
          },
        },
      ];

      // Realiza o POST na API
      await axios.post("http://localhost:9091/api/v1/cliente-preferencia", postData);

      console.log("Produto adicionado com sucesso!");

      // Remove o produto da lista de filtrados
      setFilteredProdutos((prevFiltrados) =>
        prevFiltrados.filter((filtrado) => filtrado.id !== produto.id)
      );

      // Navega para a tela de Preferências
      navigate("/Preferencias");
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      alert("Erro ao adicionar o produto. Tente novamente.");
    }
  };

  // Busca produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      setIsLoading(true);
      try {
        const clienteId = getClienteId();

        if (!clienteId) {
          throw new Error("ID do cliente não encontrado. Realize o login novamente.");
        }

        // Busca produtos já adicionados
        const produtosJaAdicionadosIds = await fetchProdutosJaAdicionados(clienteId);

        // Busca todos os produtos
        const response = await axios.get("http://localhost:9091/api/v1/produto");

        const produtosFiltrados = response.data.filter(
          (produto) =>
            produto.tipoProduto.descricao.toLowerCase() !== "adicionais" &&
            !produtosJaAdicionadosIds.includes(produto.id)
        );

        setProdutos(produtosFiltrados);
        setFilteredProdutos(produtosFiltrados);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Filtra produtos com base no termo de busca
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
