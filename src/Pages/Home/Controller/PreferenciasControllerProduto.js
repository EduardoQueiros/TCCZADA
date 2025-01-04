import { useEffect, useState, useRef } from "react";

function PreferenciasControllerProduto() {
  const [produtos, setProdutos] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [errorProdutos, setErrorProdutos] = useState(null);
  const hasFetched = useRef(false);

  const clienteId = useRef(null);

  // Obtém o clienteId do localStorage na inicialização
  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    clienteId.current = userLogin?.clienteId || null;
  }, []);

  // Função para buscar preferências do cliente usando a nova rota
  const fetchClientePreferenciaProduto = async () => {
    if (hasFetched.current || !clienteId.current) return;

    setLoadingProdutos(true);

    try {
      // Faz a requisição GET para a nova API
      const response = await fetch(
        `http://localhost:9091/api/v1/cliente-preferencia/custom/sem-adicionais/${clienteId.current}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();

      // Mapeia os dados retornados para adicionar a imagem base64, se existir
      const produtoFiltrado = data
        .slice(0, 5) // Limita a exibição a 5 itens
        .map((item) => ({
          ...item,
          produto: {
            ...item.produto,
            imagem: item.produto?.imagem
              ? `data:image/jpeg;base64,${item.produto.imagem}`
              : null,
          },
        }));

      setProdutos(produtoFiltrado);
      hasFetched.current = true;
    } catch (err) {
      setErrorProdutos(err.message);
    } finally {
      setLoadingProdutos(false);
    }
  };

  // Método para forçar a atualização da página
  const refreshPage = async () => {
    hasFetched.current = false; // Reseta o controle de requisição
    await fetchClientePreferenciaProduto(); // Refaz a busca dos dados
  };

  // Atualiza o status do produto na API
  const updateProdutoStatusProduto = async (produto) => {
    try {
      // Verifica se o objeto produto é válido
      if (!produto || !produto.id || !produto.cliente?.id || !produto.produto?.id) {
        throw new Error("O objeto produto está incompleto ou inválido.");
      }

      // Monta o corpo da requisição conforme o formato esperado
      const body = {
        id: produto.id,
        status: "EM_ABERTO", // Atualiza o status para "EM_ABERTO"
        cliente: {
          id: produto.cliente.id, // Apenas o ID do cliente
        },
        produto: {
          id: produto.produto.id, // Apenas o ID do produto
        },
      };

      console.log("Corpo da requisição enviado para o PUT:", JSON.stringify(body, null, 2));

      // Faz a requisição PUT
      const response = await fetch("http://localhost:9091/api/v1/cliente-preferencia", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Envia o corpo como JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar produto: ${errorData.erros?.[0]?.mensagem || response.status}`);
      }

      console.log("Produto atualizado com sucesso.");

      // Atualiza a lista de produtos manualmente após o PUT
      await refreshPage();
    } catch (err) {
      console.error("Erro ao atualizar status do produto:", err);
    }
  };

  // Verifica se um produto em um índice específico é válido
  const isProdutoValido = (index) => {
    return produtos[index] !== undefined;
  };

  return {
    produtos,
    loadingProdutos,
    errorProdutos,
    fetchClientePreferenciaProduto,
    updateProdutoStatusProduto,
    isProdutoValido,
    refreshPage, // Expondo a função de atualização manual
  };
}

export default PreferenciasControllerProduto;
