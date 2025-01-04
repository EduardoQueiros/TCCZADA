import { useState, useEffect } from "react";
import axios from "axios";
import ItemBoxModelAdicional from "../../Home/Model/ItemBoxModelAdicional";
import { useNavigate } from "react-router-dom";

function AdicionalController(searchTerm) {
  const [adicionais, setAdicionais] = useState([]); // Todos os adicionais
  const [filteredAdicionais, setFilteredAdicionais] = useState([]); // Filtrados por searchTerm
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Recupera o ID do cliente armazenado no localStorage
  const getClienteId = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    return userLogin?.clienteId || null;
  };

  // Adiciona o adicional ao modelo e realiza o POST
  const adicionarAdicional = async (adicional) => {
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
            id: adicional.id, // ID do produto selecionado
          },
        },
      ];

      // Realiza o POST na API
      const response = await axios.post(
        "http://localhost:9091/api/v1/cliente-preferencia",
        postData
      );

      console.log("Resposta da API:", response.data);

      // Adiciona o adicional ao modelo
      ItemBoxModelAdicional.addAdicional(adicional);

      // Navega para a tela de Preferências
      navigate("/Preferencias");

      alert("Adicional adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar adicional:", err);
      alert("Erro ao adicionar o adicional. Tente novamente.");
    }
  };

  // Busca adicionais da API
  useEffect(() => {
    const fetchAdicionais = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:9091/api/v1/produto");
        const adicionaisFiltrados = response.data.filter(
          (produto) =>
            produto.tipoProduto.descricao.toLowerCase() === "adicionais"
        );
        setAdicionais(adicionaisFiltrados);
        setFilteredAdicionais(adicionaisFiltrados);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdicionais();
  }, []);

  // Filtra adicionais com base no termo de busca
  useEffect(() => {
    const filtrados = adicionais.filter(
      (adicional) =>
        !searchTerm ||
        adicional.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdicionais(filtrados);
  }, [searchTerm, adicionais]);

  return { adicionais: filteredAdicionais, isLoading, error, adicionarAdicional };
}

export default AdicionalController;
