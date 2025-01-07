import { useState, useEffect } from "react";
import RelatorioModel from "../Model/RelatorioModel";
import Swal from "sweetalert2"; // Importa o SweetAlert2

function ControllerRelPedidoPorMesa(startDate, endDate, filtroAtivado) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    const fetchAndProcessPedidos = async () => {
      if (!filtroAtivado || !startDate || !endDate) return;

      setIsLoading(true);

      try {
        const pedidos = await RelatorioModel.fetchPedidosByDateRange(startDate, endDate);

        if (pedidos.length === 0) {
          // Alerta informando que nenhum pedido foi encontrado no intervalo
          Swal.fire({
            icon: "info",
            title: "Nenhum Pedido Encontrado",
            text: `Não foram encontrados pedidos no intervalo de ${startDate} a ${endDate}.`,
            confirmButtonText: "Ok",
          });

          setPedidosFiltrados([]); // Define a lista de pedidos filtrados como vazia
          return; // Sai da função para evitar processamento desnecessário
        }

        const pedidosAgrupados = [];
        for (const pedido of pedidos) {
          const itensPedido = await RelatorioModel.fetchItemPedidos(pedido.id);

          const produtosAgrupados = itensPedido.reduce((acc, item) => {
            const produtoId = item.produto.id;

            if (!acc[produtoId]) {
              acc[produtoId] = {
                descricao: item.produto.descricao,
                quantidade: 0,
              };
            }

            acc[produtoId].quantidade += item.qtdProduto;

            return acc;
          }, {});

          pedidosAgrupados.push({
            mesaId: pedido.cliente.mesa.id,
            codigoMesa: pedido.cliente.mesa.codigoMesa,
            totalProdutos: itensPedido.reduce((sum, item) => sum + item.qtdProduto, 0),
            totalPedidos: 1,
            pedidos: [
              {
                pedido,
                produtosAgrupados: Object.values(produtosAgrupados),
                totalProdutos: itensPedido.reduce((sum, item) => sum + item.qtdProduto, 0),
              },
            ],
          });
        }

        setPedidosFiltrados(pedidosAgrupados);

        // Exibe um alerta de sucesso ao carregar os pedidos
        Swal.fire({
          icon: "success",
          title: "Pedidos Carregados com Sucesso!",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } catch (err) {
        setError(err);

        // Exibe alerta de erro com detalhes
        Swal.fire({
          icon: "error",
          title: "Erro ao Carregar Pedidos",
          text: err.message,
          confirmButtonText: "Ok",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPedidos();
  }, [startDate, endDate, filtroAtivado]);

  return { pedidosFiltrados, isLoading, error };
}

export default ControllerRelPedidoPorMesa;
