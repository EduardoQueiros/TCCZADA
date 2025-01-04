import PedidoModel from "../Model/PedidoModel";
import { formatDateTime } from "../../../Components/DateUtils";

const PreferenciasControllerPedido = {
  handleEstouSatisfeito: async (clienteId, itens) => {
    try {
      console.log("Início do fluxo 'Estou Satisfeito'");
      if (!clienteId) throw new Error("ID do cliente não encontrado.");

      const dataHoraAtual = formatDateTime(new Date());

      const pedidoPayload = [
        {
          dataHoraFechamento: dataHoraAtual,
          totalPedido: 0,
          status: "FECHADO",
          cliente: { id: clienteId },
        },
      ];

      console.log("Payload do pedido preparado:", JSON.stringify(pedidoPayload, null, 2));

      // Cria o pedido
      await PedidoModel.criarPedido(pedidoPayload);

      // Busca o ID do pedido recém-criado
      const pedidos = await PedidoModel.buscarPedidoPorCliente(clienteId);

      if (!pedidos || pedidos.length === 0) {
        throw new Error("Nenhum pedido encontrado para o cliente.");
      }

      const pedido = pedidos[0]; // Considera o primeiro pedido retornado
      console.log(`Pedido recuperado com ID: ${pedido.id}`);

      const itensPayload = itens.map((item) => ({
        qtdProduto: 1,
        cliente: { id: clienteId },
        mesa: { id: item.cliente.mesa.id },
        produto: { id: item.produto.id },
        pedido: { id: pedido.id },
      }));

      console.log("Payload dos itens preparado como array:", JSON.stringify(itensPayload, null, 2));

      // Adiciona os itens ao pedido
      await PedidoModel.adicionarItensAoPedido(itensPayload);
      console.log("Itens adicionados ao pedido com sucesso!");

      return { success: true, message: "Pedido finalizado com sucesso!" };
    } catch (err) {
      console.error("Erro no fluxo 'Estou Satisfeito':", err.response?.data || err.message || err);
      throw new Error(err.response?.data?.mensagem || "Erro ao finalizar o pedido.");
    }
  },
};

export default PreferenciasControllerPedido;
