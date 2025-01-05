import { useState, useEffect } from "react";
import RelatorioModel from "../Model/RelatorioModel";

function ControllerRelPedidoPorMesa(startDate, endDate, filtroAtivado) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    const fetchAndProcessPedidos = async () => {
      if (!filtroAtivado) return; // Evita buscar dados sem ativar o filtro

      setIsLoading(true);
      try {
        const mesas = await RelatorioModel.fetchMesas(); // Busca todas as mesas cadastradas
        const groupedPedidos = [];

        for (const mesa of mesas) {
          const itemPedidos = await RelatorioModel.fetchItemPedidos(
            mesa.id,
            startDate,
            endDate
          );

          if (itemPedidos.length > 0) {
            const pedidosAgrupados = itemPedidos.reduce((acc, item) => {
              const pedidoId = item.pedido.id;

              if (!acc[pedidoId]) {
                acc[pedidoId] = {
                  pedido: item.pedido,
                  produtos: {},
                  totalProdutos: 0,
                };
              }

              // Filtra apenas produtos no intervalo de datas
              const fechamentoTimestamp = new Date(item.pedido.dataHoraFechamento).getTime();
              const start = startDate ? new Date(startDate).getTime() : null;
              const end = endDate ? new Date(endDate).getTime() : null;

              const withinStartDate = !start || fechamentoTimestamp >= start;
              const withinEndDate = !end || fechamentoTimestamp <= end;

              if (withinStartDate && withinEndDate) {
                const produtoId = item.produto.id;

                if (!acc[pedidoId].produtos[produtoId]) {
                  acc[pedidoId].produtos[produtoId] = {
                    descricao: item.produto.descricao,
                    quantidade: 0,
                  };
                }

                acc[pedidoId].produtos[produtoId].quantidade += item.qtdProduto;
                acc[pedidoId].totalProdutos += item.qtdProduto;
              }

              return acc;
            }, {});

            if (Object.keys(pedidosAgrupados).length > 0) {
              groupedPedidos.push({
                mesaId: mesa.id,
                totalPedidos: Object.keys(pedidosAgrupados).length,
                totalProdutos: itemPedidos.reduce(
                  (sum, item) => sum + item.qtdProduto,
                  0
                ),
                pedidos: Object.values(pedidosAgrupados).map((pedido) => ({
                  ...pedido,
                  produtosAgrupados: Object.values(pedido.produtos),
                })),
              });
            }
          }
        }

        setPedidosFiltrados(groupedPedidos);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPedidos();
  }, [startDate, endDate, filtroAtivado]);

  return { pedidosFiltrados, isLoading, error };
}

export default ControllerRelPedidoPorMesa;
