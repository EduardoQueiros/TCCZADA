import { useEffect, useState, useRef } from "react";

function PreferenciasControllerAdicionais() {
  const [adicionais, setAdicionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Controle para evitar múltiplas chamadas
  const [clienteId, setClienteId] = useState(null); // Estado para clienteId

  // Obtém o clienteId do localStorage na inicialização
  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    setClienteId(userLogin?.clienteId || null);
  }, []);

  // Função para buscar preferências do cliente usando a nova rota
  const fetchClientePreferencia = async () => {
    if (hasFetched.current || !clienteId) return;

    setLoading(true);

    try {
      // Substitui {id} pelo clienteId
      const response = await fetch(
        `http://52.202.23.63:9091/api/v1/cliente-preferencia/custom/com-adicionais/${clienteId}`,
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
      const adicionalFiltrado = data
        .slice(0, 3) // Limita a exibição a 3 itens
        .map((item) => ({
          ...item,
          produto: {
            ...item.produto,
            imagem: item.produto?.imagem
              ? `data:image/jpeg;base64,${item.produto.imagem}`
              : null,
          },
        }));

      setAdicionais(adicionalFiltrado);
      hasFetched.current = true; // Marca como já buscado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função de fetch apenas quando clienteId é atualizado
  useEffect(() => {
    if (clienteId) {
      fetchClientePreferencia();
    }
  }, [clienteId]); // Dependência no clienteId

  // Método para forçar a atualização da página
  const refreshPage = async () => {
    hasFetched.current = false; // Reseta o controle de requisição
    await fetchClientePreferencia(); // Refaz a busca dos dados
  };

  const updateProdutoStatus = async (adicional) => {
    try {
      // Verifica se o objeto adicional é válido
      if (!adicional || !adicional.id || !adicional.cliente?.id || !adicional.produto?.id) {
        throw new Error("O objeto adicional está incompleto ou inválido.");
      }

      // Monta o corpo da requisição conforme o formato esperado
      const body = {
        id: adicional.id,
        status: "EM_ABERTO", // Atualiza o status para "EM_ABERTO"
        cliente: {
          id: adicional.cliente.id, // Apenas o ID do cliente
        },
        produto: {
          id: adicional.produto.id, // Apenas o ID do produto
        },
      };

      console.log("Corpo da requisição enviado para o PUT:", JSON.stringify(body, null, 2));

      // Faz a requisição PUT
      const response = await fetch("http://52.202.23.63:9091/api/v1/cliente-preferencia", {
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

      // Atualiza a página manualmente após o PUT
      await refreshPage();
    } catch (err) {
      console.error("Erro ao atualizar status do produto:", err);
    }
  };

  // Verifica se um adicional em um índice específico é válido
  const isAdicionalValido = (index) => {
    return adicionais[index] !== undefined;
  };

  return {
    adicionais,
    loading,
    error,
    fetchClientePreferencia,
    updateProdutoStatus,
    isAdicionalValido,
    refreshPage, // Expondo a função de atualização manual
  };
}

export default PreferenciasControllerAdicionais;
