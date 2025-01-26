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
          Swal.fire({
            icon: "info",
            title: "Nenhum Pedido Encontrado",
            text: `Não foram encontrados pedidos no intervalo de ${startDate} a ${endDate}.`,
            confirmButtonText: "Ok",
          });

          setPedidosFiltrados([]);
          return;
        }

        // Agrupar pedidos por mesa
        const pedidosAgrupados = pedidos.reduce(async (accPromise, pedido) => {
          const acc = await accPromise;

          // Buscar itens do pedido
          const itensPedido = await RelatorioModel.fetchItemPedidos(pedido.id);

          const produtosAgrupados = itensPedido.reduce((accProdutos, item) => {
            const produtoId = item.produto.id;

            if (!accProdutos[produtoId]) {
              accProdutos[produtoId] = {
                descricao: item.produto.descricao,
                quantidade: 0,
              };
            }

            accProdutos[produtoId].quantidade += item.qtdProduto;

            return accProdutos;
          }, {});

          // Verificar se a mesa já está no agrupamento
          const mesaExistente = acc.find((mesa) => mesa.mesaId === pedido.cliente.mesa.id);

          if (mesaExistente) {
            mesaExistente.totalPedidos += 1;
            mesaExistente.totalProdutos += itensPedido.reduce((sum, item) => sum + item.qtdProduto, 0);
            mesaExistente.pedidos.push({
              pedido,
              produtosAgrupados: Object.values(produtosAgrupados),
              totalProdutos: itensPedido.reduce((sum, item) => sum + item.qtdProduto, 0),
            });
          } else {
            acc.push({
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

          return acc;
        }, Promise.resolve([]));

        setPedidosFiltrados(await pedidosAgrupados);
      } catch (err) {
        setError(err);

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
