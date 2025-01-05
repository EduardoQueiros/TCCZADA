import PedidoModel from "../Model/PedidoModel";
import axios from "axios";
import { formatDateTime } from "../../../Components/DateUtils";

const PreferenciasControllerPedido = {
  handleEstouSatisfeito: async (clienteId) => {
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

      // **Busca todos os itens do cliente em cliente-preferencia**
      const clientePreferenciaPayload = { cliente: { id: clienteId } };
      console.log("Buscando itens do cliente em cliente-preferencia...");
      const clientePreferencias = await axios.post(
        "http://localhost:9091/api/v1/cliente-preferencia/criteria",
        clientePreferenciaPayload
      );

      const itens = clientePreferencias.data;
      if (!itens || itens.length === 0) {
        throw new Error("Nenhum item encontrado em cliente-preferencia para o cliente.");
      }

      // Prepara o payload para adicionar todos os itens à tabela item-pedido
      const itensPayload = itens.map((item) => ({
        qtdProduto: 1, // Ajuste conforme necessário
        cliente: { id: clienteId },
        mesa: { id: item.cliente.mesa.id },
        produto: { id: item.produto.id },
        pedido: { id: pedido.id },
      }));

      console.log("Payload dos itens preparado como array:", JSON.stringify(itensPayload, null, 2));

      // Adiciona os itens ao pedido
      await PedidoModel.adicionarItensAoPedido(itensPayload);
      console.log("Itens adicionados ao pedido com sucesso!");

      // Atualizar status dos itens em cliente-preferencia
      console.log("Atualizando status dos itens em cliente-preferencia...");
      const updatePromises = itens.map((item) => {
        const updatePayload = {
          id: item.id, // ID do registro de cliente-preferencia
          status: "EM_ABERTO",
          cliente: { id: clienteId },
          produto: { id: item.produto.id },
        };

        console.log("Payload do PUT para cliente-preferencia:", JSON.stringify(updatePayload, null, 2));
        return axios.put("http://localhost:9091/api/v1/cliente-preferencia", updatePayload);
      });

      await Promise.all(updatePromises);
      console.log("Status dos itens atualizado com sucesso!");

      return { success: true, message: "Pedido finalizado e status atualizado com sucesso!" };
    } catch (err) {
      console.error("Erro no fluxo 'Estou Satisfeito':", err.response?.data || err.message || err);
      throw new Error(err.response?.data?.mensagem || "Erro ao finalizar o pedido e atualizar os itens.");
    }
  },
};

export default PreferenciasControllerPedido;
