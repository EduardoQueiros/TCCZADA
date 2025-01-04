import { useState, useEffect } from "react";
import axios from "axios";

function PedidoPageAdminController(searchTerm) {
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:9091/api/v1/cliente-preferencia");

        // Filtra os pedidos pelo status "RECEBIDO"
        const pedidosFiltrados = response.data.filter((pedido) => pedido.status === "RECEBIDO");

        // Agrupa os pedidos pelo ID do cliente e separa produtos/adicionais
        const pedidosAgrupados = pedidosFiltrados.reduce((acc, pedido) => {
          const clienteId = pedido.cliente?.id || "desconhecido";
          const clienteNome = pedido.cliente?.nome || "Cliente não informado";
          const mesaId = pedido.cliente?.mesa.id || "Não informado";

          if (!acc[clienteId]) {
            acc[clienteId] = {
              id: clienteId,
              cliente: clienteNome,
              mesa: mesaId,
              adicionais: [], // Produtos tipoProdutoId === 6
              produtos: [], // Produtos tipoProdutoId !== 6
            };
          }

          const produto = {
            nome: pedido.produto?.descricao || "Produto não informado",
            quantidade: 1, // Ajuste para lógica de quantidade
          };

          // Adiciona ao grupo correto (adicionais ou produtos)
          if (pedido.produto?.tipoProduto.id === 6) {
            acc[clienteId].adicionais.push(produto);
          } else {
            acc[clienteId].produtos.push(produto);
          }

          return acc;
        }, {});

        // Converte o objeto agrupado em um array
        const pedidosFormatados = Object.values(pedidosAgrupados);

        setPedidos(pedidosFormatados);
        setFilteredPedidos(pedidosFormatados); // Inicializa os filtrados com todos os pedidos
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  // Filtra os pedidos pelo termo de busca
  useEffect(() => {
    const filtrados = pedidos.filter(
      (pedido) =>
        !searchTerm || // Mostra todos se o `searchTerm` estiver vazio
        pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra pelo nome do cliente
        pedido.mesa.toString().includes(searchTerm) || // Filtra pelo número da mesa
        pedido.produtos.some((produto) =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ) || // Verifica se algum produto corresponde
        pedido.adicionais.some((adicional) =>
          adicional.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ) // Verifica se algum adicional corresponde
    );

    setFilteredPedidos(filtrados);
  }, [searchTerm, pedidos]);

  return { pedidos: filteredPedidos, loading, error };
}

export default PedidoPageAdminController;
